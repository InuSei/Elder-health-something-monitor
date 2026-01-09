#include <Wire.h>
#include "MAX30105.h"
#include "spo2_algorithm.h"
#include <WiFi.h>
#include <HTTPClient.h>
#include <Preferences.h>
#include <WebServer.h>
#include <LittleFS.h>

// --- Permanent memory for the flag ---
Preferences preferences;
WebServer server(80);

String ssid = "";
String password = "";

MAX30105 particleSensor;



// --- Settings ---
#define BUFFER_SIZE 100
uint32_t irBuffer[BUFFER_SIZE];
uint32_t redBuffer[BUFFER_SIZE];
int32_t spo2;
int8_t valid_spo2;
int32_t heartRate;
int8_t valid_heartRate;

// ======= Serve static frontend files =======
bool handleFileRead(String path) {
  if (path.endsWith("/")) path += "index.html";

  String contentType = "text/plain";
  if      (path.endsWith(".html")) contentType = "text/html";
  else if (path.endsWith(".css"))  contentType = "text/css";
  else if (path.endsWith(".js"))   contentType = "application/javascript";
  else if (path.endsWith(".png"))  contentType = "image/png";
  else if (path.endsWith(".jpg"))  contentType = "image/jpeg";
  else if (path.endsWith(".ico"))  contentType = "image/x-icon";

  if (LittleFS.exists(path)) {
    File file = LittleFS.open(path, "r");
    server.streamFile(file, contentType);
    file.close();
    return true;
  }
  return false;
}

// ======= API: Scan Networks =======
void handleApiNetworks() {
  Serial.println("📡 Scanning Wi-Fi networks...");
  int n = WiFi.scanNetworks();
  String json = "[";

  for (int i = 0; i < n; ++i) {
    if (i > 0) json += ",";
    json += "{";
    json += "\"ssid\":\"" + WiFi.SSID(i) + "\",";
    json += "\"rssi\":" + String(WiFi.RSSI(i)) + ",";
    json += "\"secure\":" + String(WiFi.encryptionType(i) != WIFI_AUTH_OPEN ? "true" : "false");
    json += "}";
  }

  json += "]";
  WiFi.scanDelete();
  server.send(200, "application/json", json);
  Serial.println("✅ Networks sent to frontend");
}

// ======= API: Wi-Fi Status =======
void handleApiStatus() {
  String json = "{";
  json += "\"connected\":";
  json += (WiFi.isConnected() ? "true" : "false");
  json += ",";
  json += "\"ssid\":\"" + WiFi.SSID() + "\",";
  json += "\"ip\":\"" + WiFi.localIP().toString() + "\",";
  json += "\"rssi\":\"" + String(WiFi.RSSI()) + "\"";
  json += "}";
  server.send(200, "application/json", json);
}

// ======= API: Disconnect =======
void handleApiDisconnect() {
  Serial.println("🔌 Disconnecting Wi-Fi...");
  WiFi.disconnect(true);
  preferences.begin("wifi-creds", false);
  preferences.clear();
  preferences.end();
  server.send(200, "application/json", "{\"ok\":true}");
  delay(2000);
  ESP.restart();
}

// ======= API: Save Wi-Fi credentials =======
void handleApiSave() {
  if (!server.hasArg("plain")) {
    server.send(400, "application/json", "{\"error\":\"No data\"}");
    return;
  }

  // Parse JSON manually
  String body = server.arg("plain");
  int ssidStart = body.indexOf("\"ssid\":\"") + 8;
  int ssidEnd = body.indexOf("\"", ssidStart);
  int passStart = body.indexOf("\"password\":\"") + 12;
  int passEnd = body.indexOf("\"", passStart);

  ssid = body.substring(ssidStart, ssidEnd);
  password = body.substring(passStart, passEnd);

  Serial.println("📝 Received Wi-Fi credentials:");
  Serial.println("SSID: " + ssid);
  Serial.println("Password: " + password);

  preferences.begin("wifi-creds", false);
  preferences.clear();
  preferences.putString("ssid", ssid);
  preferences.putString("password", password);
  preferences.end();

  server.send(200, "application/json", "{\"ok\":true}");
  delay(2000);
  ESP.restart();
}

// ======= Start AP + Web server =======
void startWiFiManager() {
  WiFi.mode(WIFI_AP_STA);
  WiFi.softAP("ESP32_Config", "12345678");

  Serial.println("📶 Access Point: ESP32_Config (12345678)");
  Serial.print("🌐 AP IP: ");
  Serial.println(WiFi.softAPIP());

  // Serve website
  server.onNotFound([]() {
    if (!handleFileRead(server.uri()))
      server.send(404, "text/plain", "404 Not Found");
  });

  // API endpoints
  server.on("/api/networks", HTTP_GET, handleApiNetworks);
  server.on("/api/status", HTTP_GET, handleApiStatus);
  server.on("/api/disconnect", HTTP_GET, handleApiDisconnect);
  server.on("/api/save", HTTP_POST, handleApiSave);

  server.begin();
  Serial.println("🌐 Web server started (LittleFS + API)");
}

// ======= Connect to saved Wi-Fi =======
void connectToSavedWiFi() {
  preferences.begin("wifi-creds", false);
  ssid = preferences.getString("ssid", "");
  password = preferences.getString("password", "");
  preferences.end();

  if (ssid == "" || password == "") {
    Serial.println("⚠️ No saved credentials, starting AP...");
    startWiFiManager();
    return;
  }

  Serial.println("📡 Connecting to: " + ssid);
  WiFi.mode(WIFI_AP_STA);
  WiFi.begin(ssid.c_str(), password.c_str());

  unsigned long startAttemptTime = millis();
  while (WiFi.status() != WL_CONNECTED && millis() - startAttemptTime < 15000) {
    Serial.print(".");
    delay(500);
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\n✅ Connected successfully!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\n❌ Connection failed.");
  }

  startWiFiManager();
}

// --- FastAPI server  ---
const char* serverName = "https://beneficial-determination-production-2c43.up.railway.app";

// device ID
const char* device_id = "ESP32_001";

// --- Permanent memory for the flag ---
Preferences preferences;

// This function runc once to register the device with our API
void registerDevice(){
  Serial.println(
    "Checking device registration..."
  );

  // Start the prefrences library.
  preferences.begin("device-info", false);

  // Check if we've already registered this device
  // We're checking for a key named "registered". If it's not there, it defaults to 'false'.
  bool registered = preferences.getBool("registered", false);

  if (registered) {
    Serial.println("This device is already registered. Skipping.");
    preferences.end();
    return;
  }

  // --- If we are NOT registered, do it now ---
  Serial.println("New device. Attempting to register...");

  HTTPClient http;
  String registerUrl = String(serverName) + "/devices/register";
  http.begin(registerUrl);
  http.addHeader("Content-Type", "application/json");

  // Build the JSON payload: {"device_id": "AA:BB:CC..."}
  String payload = "{\"device_id\":\"" + String(device_id) + "\"}";

  int httpResponseCode = http.POST(payload);

  if (httpResponseCode == 200) {
    Serial.println("Device successfully registered!");
    // Save the flag to permanent memory so we don't do this again
    preferences.putBool("registered", true);
  } else {
    Serial.print("Device registration failed, error code: ");
    Serial.println(httpResponseCode);
    String response = http.getString();
    Serial.println("Server response: " + response);
  }

  http.end();
  preferences.end(); // Close the preferences

}

void setup() {
  Serial.begin(115200);
  delay(500);

  if (!LittleFS.begin(true)) {
    Serial.println("❌ LittleFS mount failed!");
  } else {
    Serial.println("✅ LittleFS mounted successfully!");
  }

  connectToSavedWiFi();

  Wire.begin(21, 22);  // SDA, SCL for ESP32

  // Run our new registration function AFTER we connect to WiFi
  registerDevice();

  // Initialize MAX30102 sensor
  if (!particleSensor.begin(Wire)) {
    Serial.println("MAX30102 not found. Check wiring/power.");
    while (1);
  }

  Serial.println(" MAX30102 Ready. Place your finger on the sensor.");

  // Configure sensor
  particleSensor.setup();
  particleSensor.setPulseAmplitudeRed(0x1F);
  particleSensor.setPulseAmplitudeIR(0x1F);
  particleSensor.setPulseAmplitudeGreen(0);  // Green off
}

void loop() {
  server.handleClient();
  
  // Collect samples
  for (int i = 0; i < BUFFER_SIZE; i++) {
    while (!particleSensor.check());
    redBuffer[i] = particleSensor.getRed();
    irBuffer[i] = particleSensor.getIR();
  }

  maxim_heart_rate_and_oxygen_saturation(
    irBuffer, BUFFER_SIZE, redBuffer,
    &spo2, &valid_spo2,
    &heartRate, &valid_heartRate
  );

  Serial.print("Heart Rate: ");
  if (valid_heartRate) Serial.print(heartRate); else Serial.print("N/A");
  Serial.print(" bpm | SpO2: ");
  if (valid_spo2) Serial.print(spo2); else Serial.print("N/A");
  Serial.println(" %");

  // --- Send to FastAPI Server ---
  if (WiFi.status() == WL_CONNECTED) {
    HTTPClient http;
    String dataUrl = String(serverName) + "/sensor/data";
    http.begin(dataUrl);
    http.addHeader("Content-Type", "application/json");

    String payload = "{\"device_id\":\"" + String(device_id) + "\",\"heart_rate\":" + String(heartRate) + ",\"spo2\":" + String(spo2) + "}";
    
    // Serial.println("Sending payload: " + payload); 

    int httpResponseCode = http.POST(payload);
    Serial.print("Response code: ");
    Serial.println(httpResponseCode);

    // ==========================================================
    // === CRITICAL FIX: CHECK FOR 404 (DEVICE DELETED) HERE ===
    // ==========================================================
    if (httpResponseCode == 404 || httpResponseCode == 401) {
       Serial.println("❌ Server says Device Deleted! Factory Resetting...");
       
       // Open the exact same Namespace used in registerDevice
       preferences.begin("device-info", false);
       preferences.clear(); // Wipe the registration flag
       preferences.end();
       
       Serial.println("Rebooting to Register as New Device...");
       delay(2000);
       ESP.restart(); // This restarts the board -> Runs setup() -> Runs registerDevice()
    }
    // ==========================================================

    http.end();
  } else {
    Serial.println("WiFi Disconnected!");
  }

  delay(3000);
}
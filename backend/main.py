from fastapi import FastAPI, HTTPException, Depends, Header, status, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from datetime import datetime, timedelta
import mysql.connector
from mysql.connector import Error
from fastapi.responses import HTMLResponse
from jose import JWTError, jwt

# start node: npm run dev
# to start the api: .\venv\Scripts\uvicorn.exe backend.main:app --reload
# to start the ngrok: & "C:\Users\kelly\AppData\Roaming\Python\Python313\Scripts\ngrok.exe" http 8000
#SECRET_KEY = "nAuVMKY6DvHjSn40" 

# Secret key & algorithm for JWT
SECRET_KEY = "nAuVMKY6DvHjSn40"  # change this to something random & private
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60  # 1 hour

def create_access_token(data: dict, expires_delta: timedelta = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

def verify_token(authorization: str = Header(...)):
    try:
        scheme, token = authorization.split()
        if scheme.lower() != "bearer":
            raise HTTPException(status_code=401, detail="Invalid token scheme")
        
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])

        user_id: int = payload.get("user_id")

        if user_id is None:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid token payload")

        return user_id
    
    except (JWTError, ValueError):
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid or expired token")



# ---------- DATABASE CONNECTION SETUP ---------- 

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host = "localhost",
            user = "root",
            password = "@120302#091703!!123Anton",
            database = "elderly_health_db"
        )
        return connection
    
    except Error as e:
        print ("Database connection failed:", e)
        return None


# -------------- FASTAPI SETUP ---------------

app = FastAPI(title="Elderly Health Monitoring API")

app.add_middleware(
    CORSMiddleware,
    allow_origins = ["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ------------------ For the "/" interface --------------

latest_data = {"heart_rate": None, "spo2": None, "last_update": None}

# ------------------ API ROUTES ----------------

class VitalData(BaseModel):
    device_id: str
    heart_rate: int = Field(..., ge=40, le=180) # beats per min
    spo2: int = Field(..., ge=70, le=100)       # percentage (%)
    timestamp: str = datetime.now().isoformat()

class UserSignUp(BaseModel):
    first_name: str
    last_name: str
    age: int
    birthday: str # format: YYYY-MM-DD
    phone_number: str
    
class UserLogin(BaseModel):
    first_name: str
    last_name: str
    birthday: str  # format: YYYY-MM-DD

class DeviceClaim(BaseModel):
    device_id: str



# ------------------ HTML UI for better visualize incoming vitals ----------------
@app.get("/", response_class=HTMLResponse)
def dashboard():
    html_content = f"""
    <html>
        <head>
            <meta http-equiv="refresh" content="2"> <!-- auto-refresh every 2 sec -->
            <title>Health Monitor Dashboard</title>
            <style>
                body {{
                    font-family: Arial;
                    text-align: center;
                    padding: 50px;
                    background-color: #f9f9f9;
                }}
                h1 {{ color: #0078D7; }}
                .card {{
                    display: inline-block;
                    background: white;
                    padding: 20px;
                    margin: 20px;
                    border-radius: 10px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                }}
                .value {{
                    font-size: 3em;
                    color: #222;
                }}
            </style>
        </head>
        <body>
            <h1>💓 Real-Time Health Monitor</h1>
            <div class="card">
                <h2>Heart Rate (BPM)</h2>
                <div class="value">{latest_data['heart_rate'] or '---'}</div>
            </div>
            <div class="card">
                <h2>SpO₂ (%)</h2>
                <div class="value">{latest_data['spo2'] or '---'}</div>
            </div>
        </body>
    </html>
    """
    return HTMLResponse(content=html_content)

# ------------------ Vitals DATA ----------------

# ----------------------------RAW SENSOR DATA-------------------------------
@app.post("/sensor/data")
def sensor_data(data: VitalData, background_tasks: BackgroundTasks):

    """Receive data from ESP32 (includes device ID)."""
    # Save data to database
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    global latest_data
    latest_data["heart_rate"] = data.heart_rate
    latest_data["spo2"] = data.spo2
    latest_data["last_update"] = datetime.now().strftime("%Y-%m-%d %H:%M:%S")

    try:
        cursor = connection.cursor()
        insert_query = """
            INSERT INTO sensor_buffer (heart_rate, spo2, device_id, timestamp)
            VALUES (%s, %s, %s, NOW())
        """
        cursor.execute(insert_query, (data.heart_rate, data.spo2, data.device_id))
        connection.commit()
        print("Raw data saved to database!")

        # Call /user/save_data in the background
        background_tasks.add_task(save_data, data)

    except Error as e:
        print("Failed to insert data:", e)
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()

    return {"status": "success", "device_id": data.device_id}

# ----------------------------RAW SENSOR DATA SAVING BASE ON USER-------------------------------
@app.post("/user/save_data")
def save_data(data: VitalData):
    """Assign the latest sensor reading to a user."""
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="DB connection failed")

    try:
        cursor = connection.cursor(dictionary=True)

       # Find which user owns this device
        cursor.execute("SELECT user_id FROM devices WHERE device_id = %s", (data.device_id,))
        owner = cursor.fetchone()
        if not owner:
            raise HTTPException(status_code=404, detail=f"Device '{data.device_id}' not registered")

        user_id = owner["user_id"]


         #Insert that reading into vitals for this user
        cursor.execute("""
            INSERT INTO vitals (user_id, heart_rate, spo2, timestamp)
            VALUES (%s, %s, %s, NOW())
        """, (user_id, data.heart_rate, data.spo2))
        connection.commit()
        print(f"Saved latest sensor data to user {user_id}")

        return {"status": "success",
                "user_id": user_id,
                "device_id": data.device_id,
                "heart_rate": data.heart_rate,
                "spo2": data.spo2
                }

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        connection.close()


# ------------------ API ROUTE: Signup and save to database ----------------
@app.post("/signup")
def signup(user: UserSignUp):
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = connection.cursor()
        
        # Check if username already exists
        cursor.execute("SELECT * FROM users WHERE phone_number = %s", (user.phone_number,))
        existing_user = cursor.fetchone()
        if existing_user:
            raise HTTPException(status_code=400, detail="Phone_number already exists")


        insert_query = """
            INSERT INTO users (first_name, last_name, age, birthday, phone_number)
            VALUES (%s, %s, %s, %s, %s)
        """
        cursor.execute(insert_query, (user.first_name, user.last_name, user.age, user.birthday, user.phone_number))
        connection.commit()
        user_id = cursor.lastrowid # Get the auto-generated user_id

        return {"status": "success", "user_id": user_id, "message": "User registered successfully!"}

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()


# ------------------ API ROUTE: Login and get data from database ----------------
@app.post("/login")
def login(user: UserLogin):
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
            SELECT * FROM users 
            WHERE first_name = %s AND last_name = %s AND birthday = %s
        """
        cursor.execute(query, (user.first_name, user.last_name, user.birthday))
        db_user = cursor.fetchone()

        if not db_user:
            raise HTTPException(status_code=404, detail="User not found")

         # Generate JWT token
        access_token = create_access_token(data={"user_id": db_user["user_id"]})

        return {
            "status": "success",
            "access_token": access_token,
            "token_type": "bearer",
            "message": f"Welcome back {user.first_name} {user.last_name}!",
            "user_id": db_user["user_id"],

        }

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        cursor.close()
        connection.close()


# ----------------------------------------- NEXT TWO ROUTE WILL BE THE ONE HANDLING THE DEVICE REGISTRATION TO THE USER -----------------------------------

# ------------------ API ROUTE: Device Auto-Registration ----------------
@app.post("/devices/register")
def register_device(device: DeviceClaim):
    """
    Public endpoint for a new device to register itself as "unclaimed".
    The ESP32 will call this on its first boot.
    """

    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = connection.cursor()

        # check if device is already registered
        cursor.execute ("SELECT device_id FROM devices WHERE device_id = %s", (device.device_id,))
        if cursor.fetchone():
            return {"status": "success", "message": "Device already registered."}
        
        # Adding new device if its not in the db
        query = """
                INSERT INTO devices (device_id, user_id, device_name)
                VALUES (%s, NULL, 'Unclaimed Device')
            """
        cursor.execute(query, (device.device_id,))
        connection.commit()

        return {"status": "success", "message": "Device registered as unclaimed."}
    
    except Error as e:
        print("Device registration failed: ", e)
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        connection.close()

# ------------------ API ROUTE: User Claims a Device ----------------
@app.post("/device/claim")
def claim_device(device: DeviceClaim, user_id: int = Depends(verify_token)):
    """
    Secure endpoint for a logged-in user to "claim" an unclaimed device.
    Your React app will call this.
    """
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # 1. check if the device already exists in our registry
        cursor.execute ("SELECT * FROM devices WHERE device_id = %s ", (device.device_id,))
        db_device = cursor.fetchone()

        if not db_device:
            #device hasn't auto-registered yet.
            raise HTTPException(status_code=404, detail="Device not found. Make sure it is powered on and connected to WiFi.")

        # 2. Check if it's already claimed by someone else
        if db_device["user_id"] is not None:
            if db_device["user_id"] == user_id:
                return {"status": "success", "message": "Device is already linked to your account."}
            else:
                raise HTTPException(status_code=400, detail="Device is already claimed by another user.")

        # 3. If it's unclaimed (user_id is NULL), claim it!
        update_query = "UPDATE devices SET user_id = %s WHERE device_id = %s"
        cursor.execute(update_query, (user_id, device.device_id))
        connection.commit()

        return {"status": "success", "message": f"Device {device.device_id} successfully linked to your account."}
    
    except Error as e:
        print("Device claim failed:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        connection.close()

# ------------------ API ROUTE: get data from database by user people and use by the dashboard in the website----------------
@app.get("/vitals/me")
def get_my_vitals(user_id: int = Depends(verify_token)):

    """Get vitals for the currently logged-in user (based on their token)."""

    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = connection.cursor(dictionary=True)
        query = """
                SELECT heart_rate, spo2, timestamp
                FROM vitals
                WHERE user_id = %s
                ORDER BY timestamp DESC
        """
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        connection.close()
    
    if not results:
        raise HTTPException(status_code=404, detail="No vitals found for this user")
    
    return {"user_id": user_id, "vitals": results}





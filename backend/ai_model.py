import joblib as pickle
import pandas as pd
import os

model = None

def load_risk_model():
    """Loads the ML model once when server starts."""
    global model
    
    # 1. Get the folder where THIS file (ai_model.py) lives
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # 2. Build the full path to the model file
    path = os.path.join(current_dir, "health_risk_model.pkl")
    
    try:
        if os.path.exists(path):
            with open(path, 'rb') as f:
                model = pickle.load(f)
            print(f"✅ AI Model loaded successfully from: {path}")
        else:
            print(f"⚠️ Warning: Model file not found at: {path}")
            print("   (Make sure 'health_risk_model.pkl' is in the same folder as this script)")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

def predict_risk(bpm, spo2):
    """Returns: 'High Risk', 'Normal', etc."""
    global model
    
    # If model failed to load, return a safe default instead of crashing
    if model is None:
        print("⚠️ Prediction skipped: Model is not loaded.")
        return "Normal"
    
    try:
        # The model expects exactly these column names
        input_data = pd.DataFrame(
            [[bpm, spo2]], 
            columns=['bpm', 'spo2_value']
        )
        prediction = model.predict(input_data)[0]

        print("-" * 30)
        print(f"🧠 AI BRAIN REPORT:")
        print(f"   Input: BPM={bpm}, SpO2={spo2}")
        print(f"   Raw Code: {prediction} (0=Normal, 1=Abnormal, 2=High Risk)")
        print("-" * 30)

        risk_map = {
            0: "Normal",
            1: "Abnormal",
            2: "High Risk",
            "0": "Normal",     # Just in case it returns strings
            "1": "Abnormal",
            "2": "High Risk"
        }
        result = risk_map.get(prediction, "Normal")
        return result
        
    except Exception as e:
        print(f"Prediction Error: {e}")
        return "Error"

# --- CRITICAL FIX: CALL THE FUNCTION HERE ---
# This line actually runs the loader when the server starts!
load_risk_model()

if model is None:
    print("❌ CRITICAL FAILURE: Model is still None after loading!")
else:
    print("✅ SUCCESS: Model object is ready!")
    
print("-" * 50)
print("-" * 50)
print(f"🔍 DEBUG: Current Working Directory is: {os.getcwd()}")
print(f"🔍 DEBUG: Script Location is: {os.path.dirname(os.path.abspath(__file__))}")
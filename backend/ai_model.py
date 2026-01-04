import pickle
import pandas as pd
import os

model = None

def load_risk_model():
    """Loads the ML model once when server starts."""
    global model
    path = "health_risk_model.pkl"
    try:
        if os.path.exists(path):
            with open(path, 'rb') as f:
                model = pickle.load(f)
            print("✅ AI Model loaded successfully!")
        else:
            print(f"⚠️ Warning: {path} not found. AI predictions will fail.")
    except Exception as e:
        print(f"❌ Error loading model: {e}")

def predict_risk(bpm, spo2):
    """Returns: 'High Risk', 'Normal', etc."""
    global model
    if model is None:
        return "Model Not Loaded"
    
    try:
        # The model expects exactly these column names based on your file metadata
        input_data = pd.DataFrame(
            [[bpm, spo2]], 
            columns=['Heart Rate (bpm)', 'Oxygen Level (%)']
        )
        prediction = model.predict(input_data)[0]
        return str(prediction)
    except Exception as e:
        print(f"Prediction Error: {e}")
        return "Error"
from fastapi import APIRouter, HTTPException, Depends
from database import get_db_connection
from schemas import VitalData
from ai_model import predict_risk
from mysql.connector import Error

router = APIRouter()

# --- 1. RECEIVE DATA FROM ESP32 ---
@router.post("/sensor/data")
def record_sensor_data(data: VitalData):
    # Calculate Risk using the AI model
    risk_result = predict_risk(data.heart_rate, data.spo2)

    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = connection.cursor()
        
        # NOTE: Ensure you ran the SQL command to add 'risk_level' column!
        sql = """
        INSERT INTO vitals (device_id, heart_rate, spo2, risk_level, timestamp)
        VALUES (%s, %s, %s, %s, %s)
        """
        # Note: I changed table name to 'vitals' to match your 'get_my_vitals' query. 
        # If your table is named 'patient_vitals', change it here.
        val = (data.device_id, data.heart_rate, data.spo2, risk_result, data.timestamp)
        
        cursor.execute(sql, val)
        connection.commit()
        
        print(f"✅ Saved: BPM={data.heart_rate}, SpO2={data.spo2}, Risk={risk_result}")
        
        return {
            "status": "success",
            "risk_level": risk_result
        }
        
    except Error as e:
        print(f"SQL Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# --- 2. SEND DATA TO FRONTEND (REACT) ---
@router.get("/vitals/latest")
def get_latest_vital():
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = connection.cursor(dictionary=True)
        # Get the single most recent record
        query = "SELECT heart_rate, spo2, risk_level, timestamp FROM vitals ORDER BY timestamp DESC LIMIT 1"
        cursor.execute(query)
        result = cursor.fetchone()
        
        if result:
            return result
        else:
            return {"heart_rate": 0, "spo2": 0, "risk_level": "Waiting..."}

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        cursor.close()
        connection.close()

# --- 3. EXISTING ENDPOINT (Keep this) ---
@router.get("/vitals/me")
def get_my_vitals(user_id: int): 
    # (... keep your existing logic here if needed ...)
    pass
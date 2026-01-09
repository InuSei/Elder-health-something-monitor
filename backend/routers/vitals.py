from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.schemas import VitalData
from backend.dependencies import verify_token
from backend.ai_model import predict_risk
from mysql.connector import Error
from datetime import datetime

router = APIRouter()

# --- 1. RECEIVE DATA FROM ESP32 ---
@router.post("/sensor/data")
def record_sensor_data(data: VitalData):
    # 1. Run AI Model
    risk_result = predict_risk(data.heart_rate, data.spo2)

    # 2. Prepare Timestamp
    current_time = data.timestamp if data.timestamp else datetime.now()

    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")
    
    try:
        cursor = connection.cursor(dictionary=True)
        
        # 3. Find Owner
        cursor.execute("SELECT user_id FROM devices WHERE device_id = %s", (data.device_id,))
        owner = cursor.fetchone()
        owner_id = owner['user_id'] if owner else None

        if owner_id is None:
            print(f"⚠️ Ignored data from unclaimed device: {data.device_id}")
            raise HTTPException(status_code=404, detail="Device not claimed")

        # 4. Save Vital Reading (Standard)
        sql = """
        INSERT INTO vitals (user_id, device_id, heart_rate, spo2, risk_level, timestamp)
        VALUES (%s, %s, %s, %s, %s, %s)
        """
        val = (owner_id, data.device_id, data.heart_rate, data.spo2, risk_result, current_time)
        cursor.execute(sql, val)

        # 5. === NEW: Create Notification if Risk is Bad ===
        if owner_id and risk_result in ["High Risk", "Abnormal"]:
            
            # Decide message based on risk
            if risk_result == "High Risk":
                title = "High Health Risk Detected"
                msg = f"CRITICAL: Heart Rate {data.heart_rate} bpm, SpO2 {data.spo2}%"
                notif_type = "critical"
            else:
                title = "Abnormal Vitals"
                msg = f"WARNING: Vitals are outside normal range. BPM: {data.heart_rate}"
                notif_type = "warning"

            # Insert into notifications table
            notif_sql = """
            INSERT INTO notifications (user_id, title, message, type)
            VALUES (%s, %s, %s, %s)
            """
            cursor.execute(notif_sql, (owner_id, title, msg, notif_type))
            print(f"🔔 Notification saved for User {owner_id}: {risk_result}")
        # ==================================================

        connection.commit()
        return {"status": "success", "risk_level": risk_result}
        
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
@router.get("/vitals/history")
def get_vitals_history(user_id: int = Depends(verify_token)):
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)

        # Look how simple this query is now!
        # We just ask for vitals belonging to this user_id.
        query = """
        SELECT heart_rate, spo2, risk_level, timestamp 
        FROM vitals 
        WHERE user_id = %s 
        ORDER BY timestamp DESC 
        LIMIT 50
        """
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        
        return results

    except Error as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
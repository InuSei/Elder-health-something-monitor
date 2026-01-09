from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.schemas import DeviceClaim
from backend.dependencies import verify_token
from mysql.connector import Error

router = APIRouter() # use this instead of app = FastAPI()

@router.post("/devices/register")
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
                INSERT INTO devices (device_id, user_id, device_status)
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
@router.post("/device/claim")
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
        update_query = """UPDATE devices 
            SET user_id = %s, device_status = 'Claimed Device' 
            WHERE device_id = %s"""
        cursor.execute(update_query, (user_id, device.device_id))
        connection.commit()

        return {"status": "success", "message": f"Device {device.device_id} successfully linked to your account."}
    
    except Error as e:
        print("Device claim failed:", e)
        raise HTTPException(status_code=500, detail=str(e))
    
    finally:
        cursor.close()
        connection.close()
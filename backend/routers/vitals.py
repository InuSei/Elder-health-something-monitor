from fastapi import APIRouter, HTTPException, Depends
from database import get_db_connection
from dependencies import verify_token
from mysql.connector import Error

router = APIRouter()

@router.get("/vitals/me")
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
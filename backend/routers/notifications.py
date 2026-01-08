from fastapi import APIRouter, Depends, HTTPException
from mysql.connector import Error
from backend.database import get_db_connection
from backend.dependencies import verify_token

router = APIRouter()

# --- 1. GET ALL NOTIFICATIONS (For the Frontend) ---
@router.get("/notifications")
def get_notifications(user_id: int = Depends(verify_token)):
    """
    Fetches the last 20 notifications for the logged-in user.
    """
    connection = get_db_connection()
    if not connection:
        raise HTTPException(status_code=500, detail="Database connection failed")

    try:
        cursor = connection.cursor(dictionary=True)
        
        # Query: Get messages, newest first
        query = """
        SELECT * FROM notifications 
        WHERE user_id = %s 
        ORDER BY timestamp DESC 
        LIMIT 20
        """
        
        cursor.execute(query, (user_id,))
        results = cursor.fetchall()
        
        return results

    except Error as e:
        print(f"SQL Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

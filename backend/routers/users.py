from fastapi import APIRouter, HTTPException, Depends
from backend.database import get_db_connection
from backend.schemas import UserProfileUpdate
from backend.dependencies import verify_token
from mysql.connector import Error

router = APIRouter()

@router.get("/users/me")
def read_user_me(user_id: int = Depends(verify_token)): # Changed to user_id: int
    connection = get_db_connection()
    try:
        cursor = connection.cursor(dictionary=True)
        
        query = """
        SELECT u.user_id, u.first_name, u.last_name, u.phone_number, u.birthday, d.device_id 
        FROM users u
        LEFT JOIN devices d ON u.user_id = d.user_id 
        WHERE u.user_id = %s
        LIMIT 1
        """
        # FIXED: Use 'user_id' directly, not 'current_user['id']'
        cursor.execute(query, (user_id,)) 
        user = cursor.fetchone()
        
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
            
        return user
        
    except Error as e:
        print(f"Error: {e}")
        raise HTTPException(status_code=500, detail="Database error")
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()

# --- 5. UPDATE USER PROFILE ---
@router.put("/users/me")
def update_user_me(user_data: UserProfileUpdate, user_id: int = Depends(verify_token)):
    connection = get_db_connection()
    try:
        cursor = connection.cursor()
        
        sql = """
        UPDATE users 
        SET first_name = %s, last_name = %s, phone_number = %s, birthday = %s
        WHERE id = %s
        """
        # FIXED: Use 'user_id' directly
        val = (user_data.first_name, user_data.last_name, user_data.phone_number, user_data.birthday, user_id)
        
        cursor.execute(sql, val)
        connection.commit()
        
        return {"status": "success", "message": "Profile updated"}
        
    except Error as e:
        print(f"SQL Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
# routers/auth.py
from fastapi import APIRouter, HTTPException
from database import get_db_connection
from schemas import UserSignUp, UserLogin
from dependencies import create_access_token
from mysql.connector import Error

router = APIRouter() # use this instead of app = FastAPI()

@router.post("/signup")
def signup(user: UserSignUp):
    
    connection = get_db_connection()

    if not connection:
         raise HTTPException(status_code=500, detail = "Database connection failed")
    
    try:
        cursor= connection.cursor()

        #Check if username already exists
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
    pass 

@router.post("/login")
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

    pass
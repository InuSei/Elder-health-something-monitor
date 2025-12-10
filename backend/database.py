
import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password="@120302#091703!!123Anton", # Consider using environment variables for safety!
            database="elderly_health_db"
        )
        return connection
    except Error as e:
        print("Database connection failed:", e)
        return None
import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

def get_db_connection():
    try:
        # We use os.getenv to keep secrets out of GitHub
        connection = mysql.connector.connect(
            host=os.getenv("DB_HOST", "elderly-health-db-lspu-8527.f.aivencloud.com"),
            port=int(os.getenv("DB_PORT", 27003)),
            user=os.getenv("DB_USER", "avnadmin"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME", "defaultdb")
        )
        return connection
    except Error as e:
        print("Database connection failed:", e)
        return None
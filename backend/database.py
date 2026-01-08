import mysql.connector
from mysql.connector import Error

def get_db_connection():
    try:
        # REPLACE THESE with your actual Aiven details
        connection = mysql.connector.connect(
            host="elderly-health-db-lspu-8527.f.aivencloud.com", # From Aiven
            user="avnadmin",                           # From Aiven
            password="AVNS_UzvSw11mmPQ4ZKOjDYf",       # From Aiven
            database="defaultdb",                      # Usually 'defaultdb' on Aiven
            port=27003                                 # From Aiven
        )
        return connection
    except Error as e:
        print("Database connection failed:", e)
        return None
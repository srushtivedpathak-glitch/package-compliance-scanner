import mysql.connector
print("database.py is running")


def get_connection():

    connection = mysql.connector.connect(
        host="localhost",
        port=3306,
        user="root",
        password="27062007",
        database="packcheck"
    )

    return connection


if __name__ == "__main__":

    try:

        connection = get_connection()

        if connection.is_connected():
            print("MySQL connection successful!")

        connection.close()

    except mysql.connector.Error as error:

        print("Database connection failed.")
        print(error)
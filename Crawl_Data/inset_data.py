import csv
import mysql.connector as mysql
import pandas as pd

def insert_sql():
    try:
        connection = mysql.connect(host='localhost',
                                         database='test',
                                         user='root',
                                         password='')

        mySql_insert_query = """INSERT INTO bo (idBo, Ten_KH, Ten_TV, Mo_ta) 
                            VALUES 
                            (%s, %s, %s, %s) """

        data = pd.read_csv (r'D:\Code\python\Crawl_Data\bo.csv')   
        df = pd.DataFrame(data)
        df = df.astype(object).where(pd.notnull(df), None)

        cursor = connection.cursor()
        # cursor.executemany(mySql_insert_query, DATA)
        for row in df.itertuples():
                cursor.execute(mySql_insert_query, (row.idBo, row.Ten_KH, row.Ten_TV, row.Mo_ta))
        connection.commit()
        print(cursor.rowcount, "Record inserted successfully into table")
        cursor.close()
    except mysql.Error as error:
        print("Failed to insert record into table {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")


insert_sql()
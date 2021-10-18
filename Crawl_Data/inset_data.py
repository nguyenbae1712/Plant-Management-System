import csv
import mysql.connector as mysql
import pandas as pd
from pandas.core.dtypes.missing import isnull, notnull

def insert_sql():
    try:
        connection = mysql.connect(host='localhost',
                                         database='db_plantsystem',
                                         user='root',
                                         password='123qwe!@#QWE')

        mySql_insert_query = """INSERT INTO chi (idChi, Ten_KH, Ten_TV, Mo_ta, idHo) 
                            VALUES 
                            (%s, %s, %s, %s, %s) """

        data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\chi.csv')   
        df = pd.DataFrame(data)
        df = df.astype(object).where(pd.notnull(df), None)

        cursor = connection.cursor()
        # cursor.executemany(mySql_insert_query, DATA)
        for row in df.itertuples():
                cursor.execute(mySql_insert_query, (row.idChi, row.Ten_KH, row.Ten_TV, row.Mo_ta, row.idHo))
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


def insert_sql_loai():
    try:
        connection = mysql.connect(host='localhost',
                                         database='db_plantsystem',
                                         user='root',
                                         password='123qwe!@#QWE')

        mySql_insert_query = """INSERT INTO loai (idLoai, Ten_KH, Ten_TV, Dac_Diem_Nhan_Dang, Sinh_Hoc_Sinh_Thai, Phan_Bo, Gia_Tri, Tinh_Trang, Bien_Phap_BV, Dang_Song, idChi, Hinh_anh) 
                            VALUES 
                            (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """

        data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\loai.csv')   
        df = pd.DataFrame(data)
        df = df.astype(object).where(pd.notnull(df), None)

        cursor = connection.cursor()
        # cursor.executemany(mySql_insert_query, DATA)
        count = 0
        for row in df.itertuples():
                if row.idChi != 0 and row.idChi != '':
                    cursor.execute(mySql_insert_query, (row.idLoai, row.Ten_KH, row.Ten_TV, row.Dac_Diem_Nhan_Dang, row.Sinh_Hoc_Sinh_Thai, row.Phan_Bo, row.Gia_Tri, row.Tinh_Trang, row.Bien_Phap_BV, row.Dang_Song, row.idChi, row.Hinh_anh))
                
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

def check_foreign_key():
    count = 0
    countt = 0
    data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\chi.csv')   
    df = pd.DataFrame(data)
    for row in df.itertuples():
        connection = mysql.connect(host='localhost',
                                        database='db_plantsystem',
                                        user='root',
                                        password='123qwe!@#QWE')

        query = """SELECT * FROM ho WHERE idHo={}""".format(row.idHo)
        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        if records:
            for record in records:
            # print(record['idHo'], row.idHo)
                count += 1
        else:
            print(row.idChi)
        countt += 1
    print(count)
    print(countt)

# check_foreign_key()
# insert_sql()
insert_sql_loai()

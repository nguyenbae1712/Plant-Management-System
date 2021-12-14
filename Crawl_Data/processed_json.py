import json
import csv
import mysql.connector as mysql
import pandas as pd


tmp = []
heard = ['id', 'Ten_KH', 'Ten_TV', 'Mo_ta']
filename = 'loai_json.csv'



connection = mysql.connect(host='localhost',
                                         database='db_plantsystem',
                                         user='root',
                                         password='123qwe!@#QWE')

cursor = connection.cursor(dictionary=True)

def write_csv_loai():

    with open(r'D:\ERP_Project\Plant-Management-System\Crawl_Data\response.json', encoding="utf8") as json_file:
        data = json.load(json_file)
        for p in data['results']:
            t = []
            t.append(p['id'])
            t.append(p["Ten_KH"])
            t.append(p["Ten_TV"])
            try:
                t.append(p["Mo_ta"])
            except:
                t.append('')

            tmp.append(tuple(t))
    
    with open(filename, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(heard) 
        csvwriter.writerows(tmp)


def insert_sql():
    try:
        # connection = mysql.connect(host='localhost',
        #                                  database='db_plantsystem',
        #                                  user='root',
        #                                  password='123qwe!@#QWE')

        mySql_insert_query = """INSERT INTO chi_json (id, Ten_KH, Ten_TV, Mo_ta, idHo) 
                            VALUES 
                            (%s, %s, %s, %s, %s) """

        data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\chi_json_ful.csv')   
        df = pd.DataFrame(data)
        df = df.astype(object).where(pd.notnull(df), None)

        # cursor = connection.cursor()
        # cursor.executemany(mySql_insert_query, DATA)
        for row in df.itertuples():
                cursor.execute(mySql_insert_query, (row.id, row.Ten_KH, row.Ten_TV, row.Mo_ta, row.idHo))
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


def insert_lop():
    data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\loai.csv')   
    df = pd.DataFrame(data)
    df = df.astype(object).where(pd.notnull(df), None)
    for row in df.itertuples():
        t = []
        t.append(row.Ten_KH)
        t.append(row.Ten_TV)
        t.append(row.Dac_Diem_Nhan_Dang)
        t.append(row.Sinh_Hoc_Sinh_Thai)
        t.append(row.Phan_Bo)
        t.append(row.Gia_Tri)
        t.append(row.Tinh_Trang)
        t.append(row.Bien_Phap_BV)
        t.append(row.Dang_Song)
        t.append(replace_id_nganh(row.idChi))
        tmp.append(tuple(t))
    
    h = ['Ten_KH', 'Ten_TV', 'Dac_Diem_Nhan_Dang', 'Sinh_Hoc_Sinh_Thai', 'Phan_Bo', 'Gia_Tri', 'Tinh_Trang', 'Bien_Phap_BV', 'Dang_Song', 'idChi']
    f = 'loai_json.csv'
    with open(f, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(h) 
        csvwriter.writerows(tmp)


def replace_id_nganh(idNganh):
    try:
        select_tenKH = """SELECT Ten_KH FROM chi WHERE idChi LIKE '%{}%'""".format(idNganh)
        cursor.execute(select_tenKH)
        record = cursor.fetchall()
        ten_KH = ''
        for row in record:
            ten_KH = row['Ten_KH']

        query = """SELECT id FROM chi_json WHERE Ten_KH LIKE '%{}%'""".format(ten_KH)
        cursor.execute(query)
        records = cursor.fetchall()
        idChi = 0
        for row in records:
            idNganh = row['id']
            return idNganh
    except mysql.Error as error:
        print("Failed to insert record into table {}".format(error))



def write_csv_lop():

    with open(r'D:\ERP_Project\Plant-Management-System\Crawl_Data\response_chi.json', encoding="utf8") as json_file:
        data = json.load(json_file)
        count = 0
        for p in data['results']:
            print(count)
            t = []
            t.append(p['id'])
            t.append(p["Ten_KH"])
            print(p["Ten_KH"])
            try:
                t.append(p["Ten_TV"])
            except:
                t.append('')
    

            try:
                t.append(p["Mo_ta"])
            except:
                t.append('')

            t.append(p['idHo'])

            tmp.append(tuple(t))
            count += 1
    
    h = ['id','Ten_KH', 'Ten_TV', 'Mo_ta', 'idHo']
    f = 'chi_json_ful.csv'
    with open(f, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(h) 
        csvwriter.writerows(tmp)



def processed_img():
    with open(r'D:\ERP_Project\Plant-Management-System\Crawl_Data\response_loai.json', encoding="utf8") as json_file:
        data = json.load(json_file)
        for p in data['results']:
            t = []
            Ten_KH = p['Ten_KH']
            idLoai = p['id']
            select_url = """SELECT Hinh_anh FROM loai WHERE Ten_KH LIKE '%{}%'""".format(Ten_KH)
            cursor.execute(select_url)
            record = cursor.fetchall()
            URL = ''
            for row in record:
                URL = row['Hinh_anh']
            
            t.append(URL)
            t.append(idLoai)
            tmp.append(tuple(t))
        
        h = ['URL','idLoai']
        f = 'hinhanh.csv'
        with open(f, 'w', newline="", encoding="utf-8") as file:
            csvwriter = csv.writer(file) 
            csvwriter.writerow(h) 
            csvwriter.writerows(tmp)
            
            

            



#write_csv_loai()

# insert_lop()
# write_csv_lop()
# insert_sql()

processed_img()



if connection.is_connected():
            cursor.close()
            connection.close()

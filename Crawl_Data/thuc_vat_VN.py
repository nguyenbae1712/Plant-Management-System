import csv
from os import truncate
import time

import mysql.connector as mysql
from numpy import e
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains

PATH = r"D:\ERP_Project\Plant-Management-System\Crawl_Data\chromedriver.exe"
BRAVE_PATH = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
COUNT = 0
SOURCE_URLs = []
DATA = []
DATA_foreign_key = []

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.binary_location = BRAVE_PATH


driver = webdriver.Chrome(executable_path=PATH, chrome_options=options)
action = ActionChains(driver)


def write_csv():
    heard = ['idNghanh', 'Ten_KH', 'Ten_TV', 'Mo_ta']
    filename = 'nghanh.csv'
    with open(filename, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(heard) 
        csvwriter.writerows(DATA)


def get_all_source():
    count = 0
    for i in range(1, 128):
        driver.get('http://www.botanyvn.com/cnt.asp?param=edir&list=genus&fl=&pg={}'.format(i))
        print(driver.title)
        all_url = driver.find_element_by_tag_name('ol')
        url_sources = all_url.find_elements_by_tag_name('li')
        for url in url_sources:
                source = url.find_elements_by_tag_name('a')[0]
                SOURCE_URLs.append(source.get_attribute('href'))
                lop = url.find_elements_by_tag_name('a')[1]
                DATA_foreign_key.append(lop.text)
                count += 1
    driver.refresh()
    print(count)


def get_source_nghanh():
    count = 0
    driver.get('http://www.botanyvn.com/cnt.asp?param=edir&list=divisio')
    print(driver.title)
    all_url = driver.find_element_by_tag_name('ol')
    url_sources = all_url.find_elements_by_tag_name('li')
    for url in url_sources:
            source = url.find_elements_by_tag_name('a')[0]
            SOURCE_URLs.append(source.get_attribute('href'))
            count += 1
    driver.refresh()
    print(count)


# def get_source_lop():
#     count = 0
#     for i in range(1, 3):
#         driver.get('http://www.botanyvn.com/cnt.asp?param=edir&list=classis&fl=&pg={}'.format(i))
#         print(driver.title)
#         all_url = driver.find_element_by_tag_name('ol')
#         url_sources = all_url.find_elements_by_tag_name('li')
#         for url in url_sources:
#                 source = url.find_elements_by_tag_name('a')[0]
#                 SOURCE_URLs.append(source.get_attribute('href'))
#                 nganh = url.find_elements_by_tag_name('a')[1]
#                 DATA_foreign_key.append(nganh.text)
#                 count += 1
#     driver.refresh()
#     print(count)



def write_csv_lop():
    heard = ['idChi', 'Ten_KH', 'Ten_TV', 'Mo_ta', 'idHo']
    filename = 'chi.csv'
    with open(filename, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(heard) 
        csvwriter.writerows(DATA)



def create_data():
    for i in range(len(DATA)):
        tmp = DATA[i]
        tmp = list(tmp)
        tmp.append(get_foreign_key(DATA_foreign_key[i]))
        DATA[i] = tuple(tmp)



def get_foreign_key(nganh):
    try:
        connection = mysql.connect(host='localhost',
                                         database='db_plantsystem',
                                         user='root',
                                         password='123qwe!@#QWE')

        query = """SELECT idHo FROM ho WHERE Ten_KH LIKE '%{}%'""".format(nganh)

        cursor = connection.cursor(dictionary=True)
        cursor.execute(query)
        records = cursor.fetchall()
        idNganh = 0
        for row in records:
            idNganh = row['idHo']
        print(idNganh)
        return idNganh
    except mysql.Error as error:
        print("Failed to insert record into table {}".format(error))
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("MySQL connection is closed")



def get_detail():
    id_bo = 0
    for soucre in SOURCE_URLs:
        try:
            data = []
            id_bo += 1
            data.append(id_bo)
            driver.get(soucre)
            names_box = driver.find_elements_by_class_name('roundBox')[0]
            all_name = names_box.find_elements_by_tag_name('b')
            ten_KH = all_name[0].text
            data.append(ten_KH)
            ten_TV = all_name[2].text
            data.append(ten_TV)
            # print(ten_KH)
            # print(ten_TV)
            detail_all = driver.find_elements_by_class_name('roundBox')[1]
            details = detail_all.find_elements_by_tag_name('p')
            mo_ta = ''
            for p in details:
                mo_ta += p.text
            data.append(mo_ta)
            data = tuple(data)
            # print(mo_ta)
            DATA.append(data)
        except:
            print('lỗi')
        



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


        cursor = connection.cursor()
        # cursor.executemany(mySql_insert_query, DATA)
        for row in df.itertuples():
                cursor.execute(mySql_insert_query, row.idBo, row.Ten_KH, row.Ten_TV, row.Mo_ta)
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



get_all_source()
# get_source_nghanh()
get_detail()
create_data()
write_csv_lop()
# write_csv()
# insert_sql()
time.sleep(2)
driver.close()

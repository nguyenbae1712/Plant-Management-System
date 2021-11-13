from requests.api import get
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox import options
from selenium.webdriver.remote.webelement import WebElement
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.action_chains import ActionChains
import time
from urllib.request import urlretrieve
import csv
import mysql.connector as mysql
import pandas as pd

PATH = r"D:\Code\python\Crawl_Data\chromedriver.exe"
BRAVE_PATH = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
COUNT = 0
SOURCCE_URLs = []
DATA = []


options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.binary_location = BRAVE_PATH


driver = webdriver.Chrome(executable_path=PATH, chrome_options=options)
action = ActionChains(driver)


def write_csv():
    heard = ['idBo', 'Ten_KH', 'Ten_TV', 'Mo_ta']
    filename = 'bo.csv'
    with open(filename, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(heard) 
        csvwriter.writerows(DATA)


def get_all_source():
    count = 0
    for i in range(1,6):
        driver.get('http://www.botanyvn.com/cnt.asp?param=edir&list=ordines&fl=&pg={}'.format(i))
        print(driver.title)
        all_url = driver.find_element_by_tag_name('ol')
        url_sources = all_url.find_elements_by_tag_name('li')
        for url in url_sources:
                source = url.find_elements_by_tag_name('a')[0]
                SOURCCE_URLs.append(source.get_attribute('href'))
                count += 1
    driver.refresh()
    print(count)
    

def get_detail():
    id_bo = 0
    for soucre in SOURCCE_URLs:
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
                cursor.execute("""INSERT INTO bo (idBo, Ten_KH, Ten_TV, Mo_ta) 
                            VALUES 
                            (%s, %s, %s, %s) """, row.idBo, row.Ten_KH, row.Ten_TV, row.Mo_ta)
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
get_detail()
write_csv()
insert_sql()
time.sleep(2)
driver.close()
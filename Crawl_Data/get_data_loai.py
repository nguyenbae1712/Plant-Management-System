import csv
from os import truncate
import time
from selenium.webdriver.common.keys import Keys
import mysql.connector as mysql
from numpy import e, product
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains


PATH = r"D:\ERP_Project\Plant-Management-System\Crawl_Data\chromedriver.exe"
BRAVE_PATH = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"
COUNT = 0
SOURCE_URLs = []
DATA = []
DATA_foreign_key = []
DANG_SONG = []
DEAD_LIST = ['Chua co ten', 'Chua', 'no latin 9', 'No latin 8', 'Chua latin 2']

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
options.headless = True
options.binary_location = BRAVE_PATH


driver = webdriver.Chrome(executable_path=PATH, chrome_options=options)
action = ActionChains(driver)


connection = mysql.connect(host='localhost',
                                         database='db_plantsystem',
                                         user='root',
                                         password='123qwe!@#QWE')

cursor = connection.cursor(dictionary=True)


def get_all_link():
    for i in range(1,37):
        driver.get('http://www.vncreatures.net/kqtracuu.php?page={}&type=bo&loai=2&'.format(i))

        links = driver.find_elements_by_class_name('aLink09')
        for link in links:
            if link.get_attribute('href') != 'mailto:pmytrung@gmail.com':
                # print(link.get_attribute('href'))
                if link.text not in DEAD_LIST:
                    SOURCE_URLs.append(link.get_attribute('href'))
    # driver.close()



def get_detail_info():
    id = 0
    for url in SOURCE_URLs:
        data = []
        id += 1
        Dac_Diem_ND = ''
        Sinh_Hoc_ST = ''
        Phan_bo = ''
        Gia_tri = ''
        Tinh_trang = ''
        Bien_phap_BV = ''
       
        driver.get(url)
        main_table = driver.find_elements_by_tag_name('table')[2]
        image = main_table.find_element_by_id('cels')
        image_url = image.find_element_by_tag_name('img').get_attribute('src')
        # print(image_url.get_attribute('src'))

        Ten_TV = main_table.find_element_by_class_name('Upper').text
        print(Ten_TV)

        Ten_KH = main_table.find_element_by_xpath('//*[@id="Bdy"]/table[3]/tbody/tr[1]/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table[1]/tbody/tr[2]/td[2]/table[1]/tbody/tr[2]/td[2]').text
        # print(Ten_KH)

        Dang_song = main_table.find_elements_by_tag_name('strong')[2].text
        # print('Dang song: ', Dang_song)

        detail_table = main_table.find_element_by_xpath('//*[@id="Bdy"]/table[3]/tbody/tr[1]/td[2]/table/tbody/tr[2]/td/table/tbody/tr[2]/td/table[1]/tbody/tr[5]')

        
        infos = detail_table.find_elements_by_tag_name('p')
        if len(infos) > 0:
            for i in range(1, len(infos) - 1):
                label = infos[i].text
                detail = infos[i + 1].text
                if label == 'Mô tả:' or label == 'Đặc điểm nhận dạng:':
                    Dac_Diem_ND += detail
                    # print(Dac_Diem_ND)
                if 'Sinh học' in label:
                    Sinh_Hoc_ST += detail
                    # print(Sinh_Hoc_ST)
                if 'Phân bố' in label or 'Nơi sống' in label:
                    Phan_bo += detail
                    # print('Phân bố: ', Phan_bo)
                if 'Giá trị' in label or 'Công dụng' in label:
                    Gia_tri += detail
                    # print('Giá trị: ', Gia_tri)
                if 'Tình trạng' in label:
                    Tinh_trang += detail
                    # print(Tinh_trang)
                if 'biện pháp bảo vệ' in label:
                    Bien_phap_BV += detail
                    # print(Bien_phap_BV)
        # driver.close()            
        id_Chi = get_chi(Ten_KH)
        # print(id_Chi)
        data = [id, Ten_KH, Ten_TV, Dac_Diem_ND, Sinh_Hoc_ST, Phan_bo, Gia_tri, Tinh_trang, Bien_phap_BV, Dang_song, id_Chi, image_url]
        DATA.append(tuple(data))
    

def write_csv_loai():
    heard = ['idLoai', 'Ten_KH', 'Ten_TV', 'Dac_Diem_Nhan_Dang', 'Sinh_Hoc_Sinh_Thai', 'Phan_Bo', 'Gia_Tri', 'Tinh_Trang', 'Bien_Phap_BV', 'Dang_Song', 'idChi', 'Hinh_anh']
    filename = 'loai.csv'
    with open(filename, 'w', newline="", encoding="utf-8") as file:
        csvwriter = csv.writer(file) 
        csvwriter.writerow(heard) 
        csvwriter.writerows(DATA)

        
def get_chi(loai):
    try:
        driver.get('https://vi.wikipedia.org/wiki/C%E1%BA%A7u_di%E1%BB%87p_l%C3%B4ng')
       
        input_search = driver.find_element_by_class_name('vector-search-box-input')
        vnkey = driver.find_element_by_id('avim_off')
        vnkey.click()
        input_search.send_keys(loai)
        input_search.send_keys(Keys.ENTER)
        
        driver.find_element_by_class_name('searchmatch').click()

        # time.sleep(1)
        infobox = driver.find_element_by_tag_name('table')
        row_info = infobox.find_elements_by_tag_name('tr')
        chi = ''
        for row in row_info:
            if 'Chi' in row.text:
                # print(row.text)
                chi = row.find_element_by_tag_name('td').text
        # chi = row_info[9].find_element_by_tag_name('td').find_element_by_tag_name('a').text

        # print('Chi: ',chi)
        return get_foreign_key(chi)
    except:
        print('miss: {}'.format(loai))


def get_foreign_key(chi):
    try:
        query = """SELECT idChi FROM chi WHERE Ten_KH LIKE '%{}%'""".format(chi)
        cursor.execute(query)
        records = cursor.fetchall()
        idChi = 0
        for row in records:
            idChi = row['idChi']
        print('idChi: ',idChi)
        return idChi
    except mysql.Error as error:
        print("Failed to insert record into table {}".format(error))





# key_search = "Porpax elwesii"
# get_chi('Podocarpus fleuryi')

get_all_link()
get_detail_info()
write_csv_loai()

if connection.is_connected():
            cursor.close()
            connection.close()

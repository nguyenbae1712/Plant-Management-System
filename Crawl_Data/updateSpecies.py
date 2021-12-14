import csv
import json
import pymongo
from os import truncate
import pandas as pd
import time
from selenium.webdriver.common.keys import Keys
import mysql.connector as mysql
from numpy import e, product
import pandas as pd
from selenium import webdriver
from selenium.webdriver.common.action_chains import ActionChains


PATH = r"D:\ERP_Project\Plant-Management-System\Crawl_Data\chromedriver.exe"
BRAVE_PATH = r"C:\Program Files\BraveSoftware\Brave-Browser\Application\brave.exe"

options = webdriver.ChromeOptions()
options.add_argument('--no-sandbox')
# options.headless = True
options.binary_location = BRAVE_PATH


driver = webdriver.Chrome(executable_path=PATH, chrome_options=options)
# action = ActionChains(driver)

myclient = pymongo.MongoClient("mongodb+srv://admin:admin@plantsmanagementsystem.i3grx.mongodb.net/test?authSource=admin&replicaSet=atlas-oxkh4v-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true")
mydb = myclient["myFirstDatabase"]
myspecies = mydb["species"]
mygenus = mydb["genus"]


def get_chi(loai):
    chi = ''
    try:
        driver.get('https://en.wikipedia.org/wiki/Paphiopedilum_malipoense')
        
        input_search = driver.find_element_by_class_name('vector-search-box-input')
        input_search.send_keys(loai)
        time.sleep(1)
        input_search.send_keys(Keys.ENTER)
        time.sleep(1)
        # driver.refresh()
        content = driver.find_element_by_id('content')
        bodyContent = content.find_element_by_class_name('vector-body')
        mw_content_text = bodyContent.find_element_by_id('mw-content-text')
        mw_parser_ouput = mw_content_text.find_element_by_class_name('mw-parser-output')
        infobox = mw_parser_ouput.find_element_by_tag_name('table')
        body = infobox.find_element_by_tag_name('tbody')
        row_info = body.find_elements_by_tag_name('tr')
        for row in row_info:
            if 'Genus' in row.text:
                chi =  row.find_elements_by_tag_name('td')[1].text
                print('chi of loai {} is: {}'.format(loai, chi))
        # driver.close()
        return chi
    except:
        chi = 'Unknown'
        print('genus of: {} not found'.format(loai))
        return chi


def update_idChi():
    data = pd.read_csv (r'D:\ERP_Project\Plant-Management-System\Crawl_Data\loai_json.csv')   
    df = pd.DataFrame(data)
    df = df.astype(object).where(pd.notnull(df), None)
    for row in df.itertuples():
        chi =  get_chi(row.Ten_KH)
        idChi = 0
        print('chi : {}'.format(chi))
        if chi != 'Unknown':
            try:
                select_id_chi = { 'Ten_KH': chi }
                myChi = mygenus.find_one(select_id_chi)
                idChi = myChi['_id']
            except:
                idChi = 403
        else:
            idChi = 404

        select_loai_update = { 'Ten_KH': row.Ten_KH}
        new_value = { '$set': {'idChi' : idChi} }
        myspecies.update_one(select_loai_update, new_value)
        print('update: {}, chi: {}, idChi: {}'.format(row.Ten_KH, chi, idChi))



def get_chi_404(loai):
    chi = ''
    try:
        driver.get('https://botanyvn.com/cnt.asp?param=edir&q=&t=sciname')
        
        input_search = driver.find_element_by_class_name('reginput')
        input_search.send_keys(loai)
        time.sleep(1)
        input_search.send_keys(Keys.ENTER)
        time.sleep(1)
        all_result = driver.find_element_by_xpath('//*[@id="tblContent"]/tbody/tr[2]/td[3]')
        results = all_result.find_element_by_xpath('//*[@id="divMinHeight"]').find_element_by_xpath('//*[@id="divPresent"]')
        result = results.find_element_by_xpath('//*[@id="divPresent"]/fieldset[2]')
        row = result.find_element_by_xpath('//*[@id="divPresent"]/fieldset[2]/table[1]/tbody/tr[1]/td[2]/a')
        if row.text == loai:
            print(row.text)
            row.click()
            chi = driver.find_element_by_xpath('//*[@id="tblContent"]/tbody/tr[2]/td[3]/table[1]/tbody/tr[2]/td[2]/table/tbody/tr[6]/td[2]/a').text
            print(chi)
        return chi
    except:
        chi = 'Unknown'
        print('genus of: {} not found'.format(loai))
        return chi

def processe_404():
    select_species = { 'idChi': 403}
    species_404 = myspecies.find(select_species)
    for species in species_404:
        loai = species['Ten_KH']
        print(loai)
        # chi = get_chi_404(loai)
        # idChi = 0
        # print('chi : {}'.format(chi))

        # if chi != 'Unknown':
        #     try:
        #         select_id_chi = { 'Ten_KH': chi }
        #         myChi = mygenus.find_one(select_id_chi)
        #         idChi = myChi['_id']
        #     except:
        #         idChi = 403
        # else:
        #     idChi = 404

        # select_loai_update = { 'Ten_KH': species['Ten_KH']}
        # new_value = { '$set': {'idChi' : idChi} }
        # myspecies.update_one(select_loai_update, new_value)
        # print('update: {}, chi: {}, idChi: {}'.format(species['Ten_KH'], chi, idChi))



# def test_connect():
#     myquery = { 'Ten_KH': 'Abies' }
#     species = mygenus.find_one(myquery)
#     print(species['_id'])

# test_connect()
# update_idChi()
# print(get_chi('Kingidium deliciosum'))
processe_404()
# get_chi_404('Kingidium deliciosum')
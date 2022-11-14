from selenium import webdriver
from selenium.webdriver.common.keys import Keys
from selenium.webdriver.common.by import By
import json
PATH = "C:\Program Files\chromedriver.exe"

driver = webdriver.Chrome(PATH)
driver.maximize_window() # For maximizing window
driver.implicitly_wait(20) # gives an implicit wait for 20 seconds

url = ['https://calpolydining.com/restaurants/balance-cafe/',
'https://calpolydining.com/restaurants/brunch/',
'https://calpolydining.com/restaurants/hearth/',
'https://calpolydining.com/restaurants/jamba/',
'https://calpolydining.com/restaurants/noodles/',
'https://calpolydining.com/restaurants/streats/',
'https://calpolydining.com/restaurants/scout-coffee-co/',
'https://calpolydining.com/restaurants/market-uu/',
'https://calpolydining.com/restaurants/mustang-station/',
'https://calpolydining.com/restaurants/red-radish/',
'https://calpolydining.com/restaurants/health-shack/',
'https://calpolydining.com/restaurants/julians-cafe-bistro/',
'https://calpolydining.com/restaurants/subway/',
'https://calpolydining.com/restaurants/einstein-bros-bagels/',
'https://calpolydining.com/restaurants/market-poly-canyon/',
'https://calpolydining.com/restaurants/subway-pcv/',
'https://calpolydining.com/restaurants/starbucks/',
'https://calpolydining.com/restaurants/shake-smart/',
'https://calpolydining.com/restaurants/sweet-bar/',
'https://calpolydining.com/restaurants/mustang-eats/']

data = []

for i in range(0,20):
    driver.get(url[i])
    #driver.implicitly_wait(20)
    #restaurant = driver.find_element("class name","entry-content").text 
    name = driver.find_element(By.CLASS_NAME, "entry-title").text
    hours = driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/div/div/div/main/article/div/div[4]/div/div/div").text
    temp = len(driver.find_elements(By.XPATH, "/html/body/div[1]/div[1]/div/div/div/main/article/div/div[6]/div/div/p[1]/a"))
    if temp > 0 : 
        phone = driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/div/div/div/main/article/div/div[6]/div/div/p[1]/a").text
    else:
        phone = "[]"
    temp = len(driver.find_elements(By.XPATH, "/html/body/div[1]/div[1]/div/div/div/main/article/div/div[6]/div/div/p[2]"))
    if temp > 0:
        location = driver.find_element(By.XPATH, "/html/body/div[1]/div[1]/div/div/div/main/article/div/div[6]/div/div/p[2]").text
    else:
        location = "[]"
    writer = {"name": name,
            "hours": hours, 
            "location": location,
            "phone": phone,}
    data.append(writer)
 
f = open("restaurant.json", "w")
dumpedJson = json.dumps(data, indent=4)
f.write(dumpedJson)
    #print(name,hours,phone,location) 

driver.quit()

# need to process those data manually
    #'https://calpolydining.com/restaurants/chick-fil-a-pop-up/',
    #'https://calpolydining.com/restaurants/starbucks-uu/',
    #'https://calpolydining.com/restaurants/campus-market/',
    #'https://calpolydining.com/restaurants/mingle-nosh/',
    #'https://calpolydining.com/restaurants/market-grand-ave/',
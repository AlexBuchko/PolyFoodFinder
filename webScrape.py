import requests
from bs4 import BeautifulSoup as bs
 
URL = ['https://calpolydining.com/restaurants/balance-cafe/',
'https://calpolydining.com/restaurants/brunch/',
'https://calpolydining.com/restaurants/hearth/',
'https://calpolydining.com/restaurants/jamba/',
'https://calpolydining.com/restaurants/market-grand-ave/',
'https://calpolydining.com/restaurants/mingle-nosh/',
'https://calpolydining.com/restaurants/noodles/',
'https://calpolydining.com/restaurants/streats/',
'https://calpolydining.com/restaurants/sweet-bar/',
'https://calpolydining.com/restaurants/vista-grande-express/',
'https://calpolydining.com/restaurants/scout-coffee-co/',
'https://calpolydining.com/restaurants/market-uu/',
'https://calpolydining.com/restaurants/mustang-station/',
'https://calpolydining.com/restaurants/red-radish/',
'https://calpolydining.com/restaurants/shake-smart/',
'https://calpolydining.com/restaurants/starbucks-uu/',
'https://calpolydining.com/restaurants/campus-market/',
'https://calpolydining.com/restaurants/health-shack/',
'https://calpolydining.com/restaurants/julians-cafe-bistro/',
'https://calpolydining.com/restaurants/mustang-eats/',
'https://calpolydining.com/restaurants/starbucks/',
'https://calpolydining.com/restaurants/subway/',
'https://calpolydining.com/restaurants/chick-fil-a-pop-up/',
'https://calpolydining.com/restaurants/einstein-bros-bagels/',
'https://calpolydining.com/restaurants/market-poly-canyon/',
'https://calpolydining.com/restaurants/subway-pcv/']

for url in range(0,27):
    req = requests.get(URL[url])
    soup = bs(req.text, 'html.parser')
    s = soup.find('div', class_='entry-content')
 
lines = s.find_all('p')

for line in lines:
    print(line.text)


import requests
from bs4 import BeautifulSoup
URL="https://www.brainyquote.com/authors/dwayne-johnson-quotes_{}"
QUOTE_URL="https://www.brainyquote.com{}"
headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64; rv:50.0) Gecko/20100101 Firefox/50.0'}



with open("quotes.txt", mode='w') as file:
  for i in range(1,4):
    page = requests.get(URL.format(i),headers=headers)
    soup = BeautifulSoup(page.content, 'html.parser')
    bricks = soup.find_all('div', class_="m-brick")
    if(bricks!=None):
      for brick in bricks:
        motivation_block = brick.find("a",class_="b-qt")
        motivation_source = motivation_block["href"]
        print(motivation_block.text,QUOTE_URL.format(motivation_source))
        file.write(motivation_block.text + "-source-" + QUOTE_URL.format(motivation_source) +"\n")
  file.close()

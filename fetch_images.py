import requests
import os
from dotenv import load_dotenv
session_token = os.getenv('SESSION')

baseUrl = 'https://www.instagram.com/'
topsearch = 'web/search/topsearch/?context=blended&query=/'
images = 'explore/locations/'


def get_images(city):
    url = baseUrl + topsearch
    querystring = {"context": "blended", "query": city}
    headers = {'cache-control': 'no-cache'}

    response = requests.request(
        "GET", url, headers=headers, params=querystring)

    cityId = response.json()['places'][0]['place']['location']['pk']

    url = baseUrl + images + str(cityId) + "/?__a=1"
    jar = requests.cookies.RequestsCookieJar()
    jar.set('sessionid', session_token)
    payload = ""
    headers = {
        'cache-control': "no-cache"
    }
    response = requests.request(
        "GET", url, data=payload, headers=headers, cookies=jar)

    return response.json()

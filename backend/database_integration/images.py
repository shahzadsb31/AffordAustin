from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait

from urllib.parse import quote
import validators

THUMBNAIL_SELECTOR = "img.Q4LuWd"
IMAGE_SELECTOR = "img.n3VNCb"

SERVICE = Service(ChromeDriverManager().install())


class has_src:
    def __init__(self, selector):
        self.selector = selector

    def __call__(self, driver):
        element = driver.find_element(by=By.CSS_SELECTOR, value=self.selector)
        src = element.get_attribute("src")
        return src if validators.url(src) else False


query = "HEB Austin,TX"


def images(query, include_location=True):
    if include_location:
        query += " Austin, TX"

    query = quote(str(query))
    url = f"https://www.google.com/search?safe=off&site=&tbm=isch&source=hp&gs_l=img&q={query}&oq={query}"

    driver = webdriver.Chrome(service=SERVICE)
    driver.get(url)

    thumbnail = driver.find_element(by=By.CSS_SELECTOR, value=THUMBNAIL_SELECTOR)
    thumbnail.click()

    try:
        wait = WebDriverWait(driver, 5)
        element = wait.until(has_src(IMAGE_SELECTOR))
    except:
        element = driver.find_element(by=By.CSS_SELECTOR, value=IMAGE_SELECTOR)

    driver.close()

    return element


if __name__ == "__main__":
    query = "HEB"
    print(images(query))

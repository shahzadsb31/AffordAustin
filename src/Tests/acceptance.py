from selenium.webdriver.chrome.service import Service
from selenium.webdriver.chrome.options import Options

from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

options = Options()
options.page_load_strategy = "normal"
options = webdriver.ChromeOptions()
options.add_argument("--no-sandbox")
options.add_argument("--headless")
options.add_argument("--disable-gpu")

# URL = 'https://www.affordaustin.me/'
URL = "https://development.d4sk31j15mtaj.amplifyapp.com/"
MODELS = ["#/Housing/", "#/Childcare/", "#/Jobs/"]

# 5 TESTS
def navigation():
    driver = webdriver.Remote(
        command_executor="http://gitlab-selenium-server:4545/wd/hub", options=options
    )
    driver.get(URL)
    WebDriverWait(driver, 100).until(
        EC.visibility_of_element_located((By.CSS_SELECTOR, '[class="nav-link"]'))
    )

    links = driver.find_elements(by=By.CSS_SELECTOR, value='[class="nav-link"]')
    assert len(links) >= 3

    for link in links:
        href = link.get_attribute("href")
        link_driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
        )
        link_driver.get(f"{URL}{href}")
        link_driver.close()

    driver.close()


# 10 TESTS
def housing_pages():
    for id in range(1, 11):
        driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
        )
        driver.get(f"{URL}#/Housing/{id}")
        driver.close()


# 1 Test
def test_search():
    driver = webdriver.Remote(
        command_executor="http://gitlab-selenium-server:4545/wd/hub", options=options
    )
    driver.get(f"{URL}#/Search")
    driver.close()


# 10 TESTS
def job_pages():
    for id in range(1, 11):
        driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
        )
        driver.get(f"{URL}#/Jobs/{id}")
        driver.close()


# 10 TESTS
def childcare_pages():
    for id in range(1, 11):
        driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
        )
        driver.get(f"{URL}#/Childcare/{id}")
        driver.close()

# 3 TESTS
def searching():
    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Housing/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="form-selector")
    driver.close()

    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Childcare/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="form-selector")
    driver.close()

    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Jobs/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="form-selector")
    driver.close()

# 3 TESTS
def sorting():
    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Housing/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="btn-primary")
    driver.close()

    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Childcare/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="btn-primary")
    driver.close()

    driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
    )
    driver.get(f"{URL}#/Jobs/")
    searching = driver.find_elements(By.CSS_SELECTOR, value="btn-primary")
    driver.close()


# 3 TESTS
def grids():
    for model in MODELS:
        driver = webdriver.Remote(
            command_executor="http://gitlab-selenium-server:4545/wd/hub",
            options=options,
        )
        driver.get(f"{URL}{model}")

        WebDriverWait(driver, 100).until(
            EC.visibility_of_element_located((By.CLASS_NAME, "card"))
        )

        links = driver.find_elements(by=By.CLASS_NAME, value="card")
        assert len(links) >= 9

        driver.close()


if __name__ == "__main__":
    navigation()
    print("Navigation Tests Passed")
    housing_pages()
    print("Housing Tests Passed")
    job_pages()
    print("Job Tests Passed")
    childcare_pages()
    print("Childcare Tests Passed")
    test_search()
    print("Search Page Test Passed")
    grids()
    print("Grid Pages Tests Passed")
    searching()
    print("Searching Tests Passed")
    sorting()
    print("Sorting Tests Passed")
    print("----------------------")
    print("ALL TESTS PASSED")

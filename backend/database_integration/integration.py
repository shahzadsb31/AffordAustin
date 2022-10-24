from database import Database
from sodapy import Socrata
import pandas as pd
import requests
import numpy as np
from numpy.random import default_rng
from images import images
from maps import maps

DATABASE = "affordaustin"
USER = "affordaustin"
PASSWORD = "ky7dQwWt4B5ZVhPFnbZ6"
HOST = "affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com"
PORT = "5432"


def retrieve_data(endpoint, limit=1000):
    client = Socrata("data.texas.gov", None)
    data = client.get(endpoint, limit=limit)
    print(data)
    data = pd.DataFrame.from_records(data)
    return data


def add_housing(db):
    data = retrieve_data("x5p7-qyuv", limit=3_000)
    table = db.create_table("housing", data.keys())
    table.add_data_bulk(data)


def add_childcare(db):
    DROP_LABEL = ":@computed_region_fd5q_j34z"
    COUNTIES = ["BASTROP", "CALDWELL", "HAYS", "TRAVIS", "WILLIAMSON"]

    data = retrieve_data("bc5r-88dy", limit=16_000)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data["county"].isin(COUNTIES)]

    table = db.create_table("childcare", data.keys())
    table.add_data_bulk(data)


def add_jobs(db):
    data = pd.read_pickle("l.pkl")
    table = db.create_table("jobs", data.keys())
    table.add_data_bulk(data)


def collect_misc_attributes(job_listings):
    job_listings["salary_link"] = "none"
    job_listings["rating_link"] = "none"
    job_listings["apply_link"] = "none"
    job_listings["apply_title"] = "none"
    job_listings["salary_source"] = "none"
    job_listings["rating_source"] = "none"
    job_listings["salary_from"] = -1
    job_listings["salary_to"] = -1
    job_listings["salary_currency"] = "none"
    job_listings["salary_periodicity"] = "none"
    job_listings["based_on"] = "none"
    job_listings["rating"] = -1
    job_listings["reviews"] = -1

    for i in range(210, 223):
        job_id = job_listings.iloc[i]["job_id"]
        response = requests.get(
            "https://serpapi.com/search.json?engine=google_jobs_listing&q={}&api_key={}".format(
                job_id, api_key
            )
        ).json()
        for k in response.keys():
            if k == "ratings":
                job_listings.at[i, "rating"] = response["ratings"][0]["rating"]
                job_listings.at[i, "reviews"] = response["ratings"][0]["reviews"]
                job_listings.at[i, "rating_link"] = response["ratings"][0]["link"]
                job_listings.at[i, "rating_source"] = response["ratings"][0]["source"]
            elif k == "apply_options":
                job_listings.at[i, "apply_link"] = response["apply_options"][0]["link"]
                job_listings.at[i, "apply_title"] = response["apply_options"][0][
                    "title"
                ]
            elif k == "salary":
                job_listings.at[i, "salary_link"] = response["salaries"][0]["link"]
                job_listings.at[i, "salary_source"] = response["salaries"][0]["source"]
                job_listings.at[i, "salary_from"] = response["salaries"][0][
                    "salary_from"
                ]
                job_listings.at[i, "salary_to"] = response["salaries"][0]["salary_to"]
                job_listings.at[i, "salary_currency"] = response["salaries"][0][
                    "salary_currency"
                ]
                job_listings.at[i, "salary_periodicity"] = response["salaries"][0][
                    "salary_periodicity"
                ]
                job_listings.at[i, "based_on"] = response["salaries"][0]["based_on"]


def collect_job_listings():
    job_title = "bartender"
    job_listings = pd.DataFrame()

    # ADDED:
    # data analyst, accountant, medical receptionist, content strategist, executive assistant
    # HR assistant, job, bartender

    for zip_code in uules_2:
        uule = uules_2[zip_code]
        response = requests.get(
            "https://serpapi.com/search.json?engine=google_jobs&q={}&hl=en&api_key={}{}&lrad=16".format(
                job_title, api_key, uule
            )
        )
        jobs = [
            j
            for j in response.json()["jobs_results"]
            if j["description"] not in pd.unique(job_listings["description"])
        ]
        jobs_results = pd.DataFrame.from_records(jobs)
        # jobs_results = pd.DataFrame.from_records(response.json()['jobs_results'])
        jobs_results["zip_code"] = zip_code
        job_listings = pd.concat([job_listings, jobs_results])


def collect_images_and_maps():
    data = pd.read_pickle("l.pkl")
    j = 169
    data.at[
        j, "_image"
    ] = "data:image/png;base64,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"
    data.at[j, "_map"] = maps("First Service Corporation")
    data.to_pickle("l.pkl")
    data.to_csv("l.csv")
    for i in range(2, 203):
        if data.iloc[i]["_image"] == "none":
            print(i, data.iloc[i]["company_name"])
            data.at[i, "_image"] = images(data.iloc[i]["company_name"])
            data.at[i, "_map"] = maps(data.iloc[i]["company_name"])
            data.to_pickle("l.pkl")
            data.to_csv("l.csv")


uules_1 = {
    # Central Austin
    78703: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMw==&cr=countryUS",
    78705: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwNQ==&cr=countryUS",
    78751: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1MQ==&cr=countryUS",
    78756: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1Ng==&cr=countryUS",
    78757: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1Nw==&cr=countryUS",
    # Downtown
    78701: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMQ==&cr=countryUS",
    # South Central
    78704: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwNA==&cr=countryUS",
    # East Austin
    78702: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcwMg==&cr=countryUS",
    78722: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMg==&cr=countryUS",
    # Southeast
    78741: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0MQ==&cr=countryUS",
    78744: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0NA==&cr=countryUS",
    78747: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0Nw==&cr=countryUS",
    # South Austin
    78745: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0NQ==&cr=countryUS",
    78748: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0OA==&cr=countryUS",
}

uules_2 = {
    # Southwest Austin
    78735: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczNQ==&cr=countryUS",
    78736: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczNg==&cr=countryUS",
    78738: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczOA==&cr=countryUS",
    78739: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczOQ==&cr=countryUS",
    # Westlake Hills
    78733: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczMw==&cr=countryUS",
    78746: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc0Ng==&cr=countryUS",
    # Northwest Austin
    78731: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODczMQ==&cr=countryUS",
    78727: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyNw==&cr=countryUS",
    78750: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1MA==&cr=countryUS",
    78759: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODc1OQ==&cr=countryUS",
    # Northeast Austin
    78721: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMQ==&cr=countryUS",
    78723: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyMw==&cr=countryUS",
    78724: "&uule=w+CAIQICITQXVzdGluLCBUZXhhcyA3ODcyNA==&cr=countryUS",
}

api_key = "e44d953313148da076ace99377f26f931448ba14c070febfbe39dd5a07a60730"

# -----
def append_housing(db, limit=3_000):
    data = retrieve_data("x5p7-qyuv", limit=limit)

    data = data.loc[data["address"] != "Undisclosed"]

    data = data.iloc[140:160]

    data["_map"] = data["address"].apply(lambda x: maps(x, include_location=False))
    data["_image"] = data["address"].apply(lambda x: images(x, include_location=False))

    table = db.enter_table("housing")
    table.add_data_bulk(data)


def append_childcare(db, limit=16_000):
    DROP_LABEL = ":@computed_region_fd5q_j34z"
    COUNTIES = ["BASTROP", "CALDWELL", "HAYS", "TRAVIS", "WILLIAMSON"]

    data = retrieve_data("bc5r-88dy", limit=limit)

    data = data.drop(DROP_LABEL, axis=1)
    data = data.loc[data["county"].isin(COUNTIES)]

    data = data.iloc[120:160]

    data["_map"] = data["location_address"].apply(
        lambda x: maps(x, include_location=False)
    )
    data["_image"] = data["location_address"].apply(
        lambda x: images(x, include_location=False)
    )

    table = db.enter_table("childcare")
    table.add_data_bulk(data)


# -----


if __name__ == "__main__":
    db = Database()
    db.connect(DATABASE, USER, PASSWORD, HOST, PORT)
    # add_housing(db)
    # add_childcare(db)
    # add_jobs(db)

    housing = db.enter_table("housing")
    housing.change_attribute(
        13,
        "_image",
        "https://photos.zillowstatic.com/fp/ed75ce2daed1a7789b51f686075cd499-cc_ft_1536.jpg",
    )
    housing.change_attribute(
        8,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=H5aXgjzDcLmjLL-szWXxcA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=116.80512&pitch=0&thumbfov=100",
    )
    housing.change_attribute(
        88,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=CuTie_GchUIknaTabNS46g&cb_client=search.gws-prod.gps&w=408&h=240&yaw=137.47609&pitch=0&thumbfov=100",
    )
    housing.change_attribute(
        143,
        "_image",
        "https://lh5.googleusercontent.com/p/AF1QipMzT-28dTr7_iJVsWjetf7j4TjgIb-NmyEmH28w=w408-h305-k-no",
    )

    childcare = db.enter_table("childcare")
    childcare.change_attribute(
        5,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Cu1mooiLHK8BCLIPlWt-kA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=344.48&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        7,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=wrvVuVuiYGUa9D36dEftWA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=64.543976&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        11,
        "_image",
        "data:image/jpeg;base64,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",
    )
    childcare.change_attribute(
        26,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=glP8T9kZrVrs6YHxZ0eZEw&cb_client=search.gws-prod.gps&w=408&h=240&yaw=240.78645&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        30,
        "_image",
        "https://images.squarespace-cdn.com/content/v1/5f39cf9c16dd0c294eaa70e9/1602271793330-JWB9IEOGD1WXRZVD1XEG/twin-oaks-new2.png",
    )
    childcare.change_attribute(
        62,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=0D05BegGU8PMPeLMHsYLBg&cb_client=search.gws-prod.gps&w=408&h=240&yaw=148.06392&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        82,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=9OVRobE2czV4uCQEK5peyA&cb_client=search.gws-prod.gps&w=408&h=240&yaw=188.40292&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        87,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=grmb7cGU6ZFfEbqGb5UJ3Q&cb_client=search.gws-prod.gps&w=408&h=240&yaw=48.652195&pitch=0&thumbfov=100",
    )
    childcare.change_attribute(
        108,
        "_image",
        "data:image/jpeg;base64,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",
    )
    childcare.change_attribute(
        114,
        "_image",
        "https://www.houstonisd.org/cms/lib2/TX01001591/Centricity/ModuleInstance/194042/large/New%20Mitchell.jpg",
    )
    childcare.change_attribute(
        119,
        "_image",
        "https://streetviewpixels-pa.googleapis.com/v1/thumbnail?panoid=Up7qXCTQMsc6mww8Inh-BQ&cb_client=search.gws-prod.gps&w=408&h=240&yaw=223.04536&pitch=0&thumbfov=100",
    )

    jobs = db.enter_table("jobs")
    jobs.change_attribute(
        3,
        "_image",
        "https://media.glassdoor.com/sqll/1945982/mediavine-squarelogo-1556160091082.png",
    )
    jobs.change_attribute(
        6,
        "_image",
        "http://img-prod-cms-rt-microsoft-com.akamaized.net/cms/api/am/imageFileData/RE4OAgf?ver=6a31",
    )
    jobs.change_attribute(
        10,
        "_image",
        "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAABgFBMVEX////9//////37//8AVon5//////r///z//f/7//3///n7/vr/+v8AR31Ugpijwcrr/PsATn4AWI4AUIY4aoIAU4h6nrDH2dzd7Ol9pLZpkp0AP2MAWIYHjMkARHwASnsAjNDE2uedz98AeqhWZnMAg8us1OA2krwAR4YAQYIAfLwAhsFIWGXR8O694u0Ahbq209cAjNlWoMdve4ljb30AWYACjc4Agb3///FseIZ8hpKX09oAPmoAU5Dg+/rQ09icprAAk8ikrbYwkK0ASnNEVGAAWZYAN2mIvc6Zw9hnrcbo9vuMx9QAdakAdLEAbpc5oMAqoM9PqbnU8vtvvMwAc7sAj7ZPn7Do9++p1uuTy+ePtsi85+XU0NDRzc/a3e3m5dnp6eulyLu/v8zg4/W7uMmrurRQq8fNxNDx4+aWlp62wtDBwL2X3Oyir7SbpKbR1MYAg9hQoql3tNYAMWsxZ3sATmpihZ9Yg5A/bY5qm6UvbZVYk7VId5o4bHuBqbEyezsKAAAUCklEQVR4nO2bi3/TxpbHNSONNBr5IVvxC+RXwE5IiB8Q2yKx4yQYB3DopTddyt1QqDfbxyUsvWx7SbO0m399z4zkR0JC6YWQdj/z+7RgyXrMV+fMeYyMokhJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUlJSUn9aYRUhMT/Fz2QcxLFjDFd1w3z/yuiavsiFKx50YM5DxnsbnVxsVqt3iMYqxc9mvOQbt8oFQqFZvO+bWHfhm9765/atrpdzXLA5oaFdJPvMS2ThhBR6egQbFmYMorN0Q5kgqhKLAtRxQykUoxhbyhE+JbBGKan3e/TC6+1sk2ulo2YYPB0GDwATgZIQyYhhIaOnQjByYQHQfgHA4MIQQb8Yelih2WqfxTLV1pNgbiwpDLCdxBKPc/TJ65pWSFKQx6bGJVDmIyphueBzQLBOYhSy6J8Q7cshi8C5xSVFwuCsFAhPiEbLIEGKhsdwdJ8h2mMkW2+vUN0ajJrbWmkJ0s2QciwR9u2fhE4JwVB5S7AccDStm75T/3uQqv0oGKNTWC3WovV28SfVxyz8tlCa+GeinkynV0oLbRaC6DWg7JuUcv+S4tvlxaq93ewZ10M10RQytwvACFE09J9HEDNlrL1asoaTzs7m21m51T/W0HYKmRLs5gijPRZHomFsotlbIYYuQKHFzY2stnslVk1dPp9P52QSuaaJXBTGOFDEsy030e4wOG46iWwoSCEPfV6qVRvXqlc+FxEyK4u1gsPPwdHrdqeD/W7bZitcr9sfVZjghB8ovrw0ZWNjVL2r+RiuMZihC61svXCXx/CTFzcOZuwkJ1DU4QLnBAyYkDYWl0Tsk3hpYVm9gaxK9WNUuHR4GLARkIeoast8NAvYDJmFyremV4KhIouYuk0ockJuT0ro0OFDQvZwg0F4bulwsZC5eQ9P61Uj+Bt8M/C9l0oa1rbZ89DYcPfQ4gQK7cKG6Xyp2Y6LsKQfgNmTas8y4PhffOdhCdtqFJTeQeh94cgxArb4NarwJgLzdvEJ7xXatarFWtcwvDKFbzUEDVdQNgEQmhFRCwdEULhPiFU2Spnv0BCbBhQRXr2v0Gof7BTrBZK2SvE49+wu58tLPylEhoX2qRVaNUfUmJSEMIKrizA3IVYqquIzZbqhUfbUNE82fHskIg0zWz9BgkxXixdKCFIJWjns1Kp9WBt8OX9u9uzAwvqT/oYouJgzQrZ4jiAsv7273e/2FWEhSkvrMGG9cI2IzrMttlmqb5R5WXMfRTSyR+IkA9XZ3p6e/XJkyfPvnrW/SrVffpVF/Rs+PXXg8FwSHh3Qelw+PWw+3Wq+4/u34fDEIUmGVUetEqLsx4xqAqEzXqBFzDN75SQ90ciBA2HX73Y39v85pu9vf/Yq3X39/efCcJnz4agARX9ExD+57NU8funL775dnNzfX1zc6+bWt2+f7scEC5k/ZoGCIl3gV5KqcF0DGUoOCcfdndv/fnzdT7gl6D9/e/3Xnyf+r4rNEz//fFw+DhEgzO9neEgnQZo/iU8EjhzZf1lamgxlWf8jWb9EXhp60sKRcEo0lwAoWKATxrwadh9sb6yIvA4INf+3h4YcK+2VwQ8sN5ScbWcnrSDdrbaXLgB/S3fgL4W7UTL5XLt6bcvukOINBvZ0n/xpay1kAVd8oURcoHxhnvPV7gCwIBwc+/Fi73u1+m0x8dPtq+0Wg+esHE7qFYfZQufm373aFkGgljaXFg1CHTJQJjdWKxAr0+w/li9QEIDvK27eevWzZWAcGxDcNJUapie/fHhwoMdfqi5Xa3XF5+wcdFsw8QqPFQw4fHXgjax8iCbDSINeGmzkK14IL6OM86HhH4yQhgUAuupwx+Wl2/dnAAKwh/Wv009qcymTYUXIM1qEZtg6HuFUr36hELDjoVj2lkY65yt6oyYDB6VUilBczTrmdBd6LOQ/OsVVaxjhGjQWxRu4DHh+a/WYBiH+nTl6jIYcEQobPj8+Tf/KG7fqC4+WNLxUrXezFZnsWVgUbW1njB4Lv5q1KguDemqyPhB1ab43RPUta9qPG1injoFYT17AxFO2Cx9gsqbL36+WL66vHyMELTZpQr7sfWqXm/ZmO1wwsW7CjKtgNBjRtC+csLmHDQipodVc0w47g83gAMhZBmK9XjUPSkG/hFa4NLSefOBe5Lu8nUO6BOO3PTpEFJ3yJ7baGazVZt6ZK6ezZa+IwgLwsLiF6uzq6ur5RFh9qHYXl1iY0IU9Pj1jcIXq0Jl6KEtTlj4fCl1twWzedE+bz6sDFauX716gnC9y9MHxSG7ugEP/CGhnjoHhUlpzqaKDpU3JPHFxVJpsVoNCCGatF7xfds6HlXekFgxRJpWvVlf5PmwVb1tM07YLLxqthbq0K1U73vnyYewDvHzOgecQly5+Xw4OsJYelBqbhRuQJAn3/H+qbXGbMruLXBE3jdmFwk4uV16tcjHW3i1WJjl51Wga4ZYaoNLoqmVqPocAU+2H4gNeCj15qO1812ngYe8d8cHnCLsKuOmgVXAABvNHxGl+n2Ij/WFJ9Aw6JAtxJDHhIvNDbEHmMeEzW1wUUTZhLBQf0iYynzCEjAuzg3YudqQGqh75/oxwlvLL6GnGz9Xo/Zobu72I+jWqXfv0W1QjYQsq3x7biyeFO1fbvt7bj+aqyGeLfhGOUQZMbzy5Ni5/0YEMzs4+8aPf7Mt61xXEykeAuAxwuWuMv26hBKb8HpLx4SZIqPRx0BIYa+/UA9/gQ0fq6NtYiAIUCpsq8RCUJcyMhFcKGQzhVjBts6gGTPPHN5HEFZWOOHUPFweKsfmBTgnf/8L/5HAnWBm8RCEg8OQyNemhf3EAa2h/+aN/4mRyUPN5IoYMoSJEQoW85HKX18Z5wmIB3eOE17tInyMEA2KxWKlkrJ0YqaLKdCAkT/IO7H3EMZdATghfHnyfRdKbeXz4a2fVayql3Lz8/M/1SzzT0SoTBNyRHQydBvFXF+LOwf8ZWgy1mg0ejUdWxe+EP++wkZAGBjx6rqCTwxeL+biQHgJwcxLznc6nWspbFh+McpXnaiKVGr6J2FRwqtIfAt/8fmH4S80+VLhOZj5i470VFfgh8E3UNEjP+RBT67ykyeT2TCh3oVLIMMQveg7CdXrU4RXrz596xAgdDXNucQNnnQ0TQunkGVBq8v4egAECouxUPC2mi8OWNBvUNWEIGlSiKXUIFQdz1skZDJT/NyBH2XwHRC4xqPkP9shFOu6MXqRhxATh42HhEyTn6IoRNdVaG70d4UqQ3k57aZXu2cT0mlCSAgwOsge0C7oBmLCOpg/TRgYUAO/AYQqPEIwKvGHqo6iJjcvyFQRE0FVx8b4ZbDBhHUUeGimKfKIqnvs2JB4djLgDFU1SWp9n7DjXx8XBO7lacTN9ySkw/39aHSA9dAwCh+o+A2KCp+iNcpUCp/2o6kQFLCkCJ++FUC16Fj7ggcPg83UDvFGhDobRC/9HMlUbAL3EYfpA/+o8SFdfqMBjB1Ff85kIvY7fwCD1MH1O1Ox5j0JrRpE2HaUeGaqnc9tDQ1+E/un+flchFiGYf8zH469JhbV7Zn8fPiyWAqYCfvK55222IGiW/6eXO6wyB82BjdHu+35TsIJty/Z1J96ulLbgpPCBwoNEmuyHQ5vLcHh6Ofy3Z+jbzveCQ2X70xCzQsFH481pxPi1LWG1jmEnamc5ubSwk/sdlxzIhB3qJp0Eon2ACIKabhOJyKuNJOAszt9+KPfE08dR/NxzdU68Y7rXotCvmWqZ2Tgdv1EPK61k4gFIWqX3zfxBipav1LIxFwtnFagMLpUi1yq7f/WEgFGzyel6dWh8t6E8faOcozwckCIcTSsOWHuVoO264QzY0LXcRIcnowIEzBWTQPQ9g5TsWnttOFuWt6JJ+K5lM+DlQMnDoT5AVONaUKYsSvR9NHPg98ihLO61++MMuKtE1XbOwjdfEY9ldBkOzmtk4vyuh3MlCuyEWHjcGYG/psZE/bdSDLSA0QnyaMSyjhuPHG4exiLxzvJIDmTwzi3YbiiB1lpRGigwUoyUibvijRcPBDTH/wWalkgvi9hokFOJ/RI3u3M/4+C2G444eYG3ojwtQ2RFdKBPibs1RSz2NM6boPokDMOOlqnZ7O1Gbhng/j5k3s/v3EUBz9mGRHqTFdt2/rNulaUyAp5yT1VlKYvIP6o/H90JqGZmnfhwV+uYf71SUIdq5FEIjEDseDA0eINdWzDHjEM3cC+m3DCeL7GTHSoOW7e1qkOn1znVwj/mZ96r2f8LKOmwnE3Hk90ksbESxN8HvKQwZPV+yzVQQwj5MUtsVhza3llqBijIuJsQtjdO1CKOS1xktBQwNsSWs/mI9acA9/bfEI61WjweZiv6SqUgwmtPYBqkABhwrWJMkgTNcgWBA6DmyU6hwiNvFTjhL/lnMcJhdmU4cvlq6IJ3qQ8D+F3E7owE0kqF3+LECOYfxCI0njQA4Zdv+IZEY6dKiCEgiEZg+gy0CE6JuGg/C5f+feY4Zd1ajIWj/3Si8MTY2Mv/d2EwowGrwiHL28KyM0g4rzDS8XcSOU7pxCypbYWD9cUcDAHGKYIp6rIEaGq/AoeDzZElg5T0gXPBT8npiWeDEZvYlq43Oi74R3/Z4P/OqESeOawu34TGNe7iFfJlTAY61TCjttJRJbyjjafFiFgQqgwu5FI9DKKYAgevSC8x6uToV+CB4SQUmKJhNYgBmbMngHCBIRhoNMtAWT3gGdnpq/ly0z9EMIpwYMedl+u3FzZHBK9kj+D0O00OlqvHE5o19LC3lOEOjkIxxsHSiYfj70Jfu0nMj6UNOGtGh5n/L6TjGZ4JHUgN5hQ0lfakPATWxnCdKqIw9I9N95eu9RJxI6C9ZUPJuRRlMdRjvnDiyjMkdMJ57/MubFfnP5bhLpqkN1wXGsoEU2LJdWJDUEueO/EhhBMc1Cl8ct6BgHPJNEwEPZzSaj+fEJu6UNyBKEron4kwmPCRfcsG+bKfIrCFDpJyIiJiz23k1/rwcOJ4kks1RKxWCI3ZUOo2hLxhtvP7RJGkUkMpkbbmtOP5yM2FtWucuQ4sQhwQr1AQh+RkPdt0AFSHdzmDMKttTc8KWqnERqDy0BYhlAaTgXFFieM/QqaSU0I4xqv4hJaFBOiMEaQrivFWAeKOSiYmMWXNSOOk8/gFISuy/bHJBwJF3m+jb1FmHP7bfuow81yyjyEGA+llvMLhJD2KMYHsXRK0RgAHmQgZjWSCn8tx1s+C5PBmw48Ong00CrrhE+SqL12WYvnUx+ULf4Vwh0IM2cQ8oMTDfDBQ6KrU4QUTYosIIy3U2CkvttQPZOvTViPCaL64A3UZbxSMJE+aMMdYnnIr/F89DwJ0WQVwxwT2od8z+mEMHESMINjSXLMhlM1DSfs51NKlCfNIhjQgjQPRRjR2U7PhQA6MKGu4bUDuLEL7hBLngehsZM7SaiOCc3dXOIMQiOV1zqOo8Wi+jEbKuoxG2r5msU7LCcJVZqBB0fJXy9HdZPxHgOcEhoqiOWcUIvDzd+MCEXV9pF+PW2k23033mkQj/GikTeFUPogIIyHB+BCUDJCTSN6hWOE1L7Mk0A8nx4ZTXRPiBHKRq//gZDXpeif8YTjgqkpW9pynPkMs1g534jzBlM3L8UgQV4Oh8NQYPTsESFcV0eG91HWpgnUS27cOShWIhDcod2BeUJGhASG7b5dtXFCMsPDULxHRmWa6J4UDHQoWJryCQ105PCQa1DE1mLQ8TdsrOzmIYNAYIE7QKBJptPpctjttNMjws61NExSqE0+fOWWoqOY1gDEXB58CXwlqSimT5gb6Co082/3FvyuSE0meEH7qzJN6F4SiqSmCVVw6DgkBx0uHOn047FIeTfficd7NvRFNqTUfFRhXhoI4UNAqMUiBwcHlyLJDwZUKLN7UE7AYKFFA5reQIwf8iEnNAZnEZrGfo8TZsaVNifsx+Y7sVgsHJ0mxDbEXA2KO8yXDBzXjYXz/X4Cun6otFNwAyjhVRgGzOvMmNB1Oh0n5hx+OCHyrPKWA4QQvnnP6zfa0JW60A2AD0ecGPT4IpjYl6FkiSiWCCwEPXsNo+CFdaD/bfCr8KCh+bbQo/lOB3p8QiIw5B53O6wcQKEPVTsUO68HDIqa/XCin18ykEFmXKjbhEdkRJHg8uvNfARCXbcrjXzCARM6+dc1fwGC1bbm538amIxFr3Wca2mREOyt+WvznFAs6huk3UnMb01+pj6Tn58PO6D82IZhrZOrKeIi8/l1zJeUycFWp9/vO/mZCjQbupK8pjlbA6ryWr4T7ol+PpnTYvxCH8mGmBnEjh4cuo3Dg6hNqXBIPZ3MZJK2YbFBBj4MxIsIAvsyUcX0V1cY2oXNo0kR8zIT6OjoyJ+HqaOjTCalWMzmZ74U9qGoeHA4M3NQIxTzgjaagWOAz1Br/E7cP3DtiJ/IrwQnfQxEzDyFv76FkgpTY/TbPJ0xj0INqjAd+lWxpAPmhS6Wil9JIfjGE29Og+vAk+IrvrwNVfx1T/7PgRg0SYRfhMEZ4jgqfv4CrsNf0agGfy2LPV7potG7HbG4IVpZ42PEUvGvggiYTocBUkT8YXAoFUGLauj8vbbqvxyhVDFoQKiYJjVNY+pVI4XT+b+VhsGrwasrhZhEpeCM/OW5pfvHYpNAxR/CpqoYmP9UTPSbJvZPFidi0xSf9T/Ru1opKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSkpKSmpP7n+D3OJD0PGhVGAAAAAAElFTkSuQmCC",
    )
    jobs.change_attribute(
        11,
        "_image",
        "https://i2-prod.mirror.co.uk/incoming/article676858.ece/ALTERNATES/s1200/Topic%20-%20Facebook",
    )
    jobs.change_attribute(
        12,
        "_image",
        "https://thumbs.dreamstime.com/b/not-available-stamp-seal-watermark-distress-style-designed-rectangle-circles-stars-black-vector-rubber-print-title-138796185.jpg",
    )
    jobs.change_attribute(28, "_image", "https://www.sciplay.com/sciplay.png")
    jobs.change_attribute(
        36,
        "_image",
        "https://images.squarespace-cdn.com/content/v1/5655e100e4b0f60cdb972032/1448469224255-JW5YRA7XYKPTERY0VBRX/Local+Staffing+Logo.jpg",
    )
    jobs.change_attribute(
        54, "_image", "https://www.careerstaff.com/wp-content/uploads/2021/10/share.jpg"
    )
    jobs.change_attribute(
        61,
        "_image",
        "https://pediatricassociates.com/wp-content/uploads/2016/08/Pediatric_Associates_logo-trademark-1@2x.png",
    )
    jobs.change_attribute(
        63, "_image", "https://www.nealjohnsonmd.com/views/images/logo.png"
    )
    jobs.change_attribute(
        203,
        "_image",
        "https://www.medixteam.com/wp-content/uploads/2020/10/medix-logo.png",
    )

    print(db.list_tables())
    print(len(db.enter_table("jobs").get_data_bulk()))
    print(len(db.enter_table("housing").get_data_bulk()))
    print(len(db.enter_table("childcare").get_data_bulk()))

    db.disconnect()

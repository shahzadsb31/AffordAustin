from urllib.parse import quote


def maps(query, include_location=True):
    if include_location:
        query += " Austin, TX"

    query = quote(str(query))

    return f"""<iframe
        src="https://www.google.com/maps/embed/v1/place?key=AIzaSyD_Irx5iEp-fsnOFltzlXo941xvJtESjUU&q={query}"
        width="600"
        height="450"
        style="border:0;"
        allowfullscreen
        loading="lazy" 
        referrerpolicy="no-referrer-when-downgrade"
    ></iframe>"""


if __name__ == "__main__":
    query = "Visa"
    print(maps(query))

from unittest import main, TestCase
from app import app


class UnitTests(TestCase):
    def setUp(self):
        self.ctx = app.app_context()
        self.ctx.push()
        self.client = app.test_client()
        self.headers = {
            "content-type": "application/vnd.api+json",
            "accept": "application/vnd.api+json",
        }

    def test_home(self):
        req = self.client.get("/", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing all housing data
    def test_housing(self):
        req = self.client.get("/api/housing", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing singular housing data
    def test_housing_single(self):
        req = self.client.get("/api/housing/1", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing pagination of housing data
    def test_housing_pages(self):
        req = self.client.get(
            "/api/housing?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    # testing searching of housing data
    def test_housing_search(self):
        req = self.client.get(
            "/api/housing?page[size]=1&page[number]=1&search=Chicon%20Street",
            headers=self.headers,
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(
            req.json["attributes"][0]["project_name"] == "110 Chicon Street"
        )

    # testing filtering of housing data
    def test_housing_filter(self):
        req = self.client.get(
            "/api/housing?page[number]=1&ground_lease=Yes", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["metadata"]["num_responses"] == 9)
        self.assertTrue(x["ground_lease"] == "Yes" for x in req.json["attributes"])

    def test_housing_sort(self):
        req = self.client.get(
            "/api/housing?page[number]=1&sort=total_affordable_units",
            headers=self.headers,
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["attributes"][0]["total_affordable_units"] == 0)

    def test_housing_pages_fail(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)

    # testing all childcare data
    def test_childcare(self):
        req = self.client.get("/api/childcare", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing singular childcare data
    def test_childcare_single(self):
        req = self.client.get("/api/childcare/1", headers=self.headers)
        self.assertEqual(req.status_code, 200)

    # testing pagination of childcare data
    def test_childcare_pages(self):
        req = self.client.get(
            "/api/childcare?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    # testing searching of childcare data
    def test_childcare_search(self):
        req = self.client.get(
            "/api/childcare?page[size]=1&page[number]=1&search=Cemetary%20St",
            headers=self.headers,
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["attributes"][0]["county"] == "Caldwell")

    # testing filtering of childcare data
    def test_childcare_filter(self):
        req = self.client.get(
            "/api/childcare?page[number]=1&county=Travis", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(x["county"] == "Travis" for x in req.json["attributes"])

    # testing sorting of childcare data
    def test_childcare_sort(self):
        req = self.client.get(
            "/api/childcare?page[number]=1&sort=start_hours_val", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["attributes"][0]["start_hours_val"] == 2)

    # testing pagination of childcare data fail
    def test_childcare_pages_fail(self):
        req = self.client.get(
            "/api/childcare?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)

    # testing all job data
    def test_jobs(self):
        req = self.client.get("/api/jobs")
        self.assertEqual(req.status_code, 200)

    # testing singular job data
    def test_jobs_single(self):
        req = self.client.get("/api/jobs/1")
        self.assertEqual(req.status_code, 200)

    # testing pagination of job data
    def test_jobs_pages(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=2", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)

    # testing searching of job data
    def test_jobs_search(self):
        req = self.client.get(
            "/api/jobs?page[size]=1&page[number]=1&search=FLASH", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["attributes"][0]["company_name"] == "FLASH")

    # testing filtering of job data
    def test_jobs_filter(self):
        req = self.client.get(
            "/api/jobs?page[number]=1&company_name=Texas%20Water%20Development%20Board",
            headers=self.headers,
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(
            x["company_name"] == "Texas Water Development Board"
            for x in req.json["attributes"]
        )

    # testing sorting of job data
    def test_jobs_sort(self):
        req = self.client.get(
            "/api/jobs?page[number]=1&sort=rating", headers=self.headers
        )
        self.assertEqual(req.status_code, 200)
        self.assertTrue(req.json["attributes"][0]["rating"] == -1.0)

    # testing pagination of job data fail
    def test_jobs_pages_fail(self):
        req = self.client.get(
            "/api/jobs?page[size]=3&page[number]=123123", headers=self.headers
        )
        self.assertEqual(req.status_code, 404)


if __name__ == "__main__":
    main()

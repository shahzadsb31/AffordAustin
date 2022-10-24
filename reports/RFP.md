# AffordAustin

**Canvas/Discord Group Number:** 11am Group 11

**Team Member Names:**
* Sabeer Shahzad
* Dinesh Balakrishnan
* Jay Park
* Presley Heikkila
* Scarlett Shires!

**Project Name:** AffordAustin

**GitLab URL:** https://gitlab.com/dinesh.k.balakrishnan/cs373-website

**Project Proposal:**
Website designated for low income residents of Austin. The website will feature job listings, child care, and housing variable to the user's location.

---

**RESTFUL API Data Sources:**
* *Housing:* https://data.austintexas.gov/Housing-and-Real-Estate/City-of-Austin-Affordable-Housing-Inventory/x5p7-qyuv
* *Daycare:* https://data.texas.gov/Social-Services/HHSC-CCL-Daycare-and-Residential-Operations-Data/bc5r-88dy
* *Jobs2Career* from https://github.com/public-apis/public-apis#events

* *Additional APIs:*
  * https://open-platform.theguardian.com/documentation/search
  * https://developer.nytimes.com/apis
  * https://rapidapi.com/veilleio-veilleio-default/api/companies-datas/

---

**Models:**
1. *Housing*
   - **Media**:
     - Image of the house
     - News articles about nearby location
     - Data about the house
     - Google Maps pin of the location
   - **Attributes:**
     - *Filter:*
       - Number of Units
       - Tenure
       - Zip Code
       - Unit Type
       - Ground Lease
     - *Search:*
       - Address
       - Property Manager Company
       - Property Manager Company name
       - Status (where in the building process)
       - Calculated Fee in Lieu
     - Address
     - Number of units
     - Affordability Period
     - Property Manager phone number and email
     - Full list of attributes here: https://data.austintexas.gov/Housing-and-Real-Estate/City-of-Austin-Affordable-Housing-Inventory/x5p7-qyuv#:~:text=Columns%20in%20this%20Dataset
   - **Number of Instances:** 1000+

2. *Child Care*
   - **Media:**
     - Image of the facility
     - News articles about nearby location
     - Data about the service
     - Google Maps pin of the location
   - **Attributes:**
     - *Filter:*
       - Days of Operation
       - Hours of Operation
       - Location Address
       - Programs provided at the Operation
       - County of the Facility / Operation
       - Subsidized Facility / Operation
     - *Search:*
       - Website Address
       - Mailing Address
       - Administrator / Director for the Operation
       - Phone Number
       - Email Address
     - Full list of attributes here: https://data.texas.gov/Social-Services/HHSC-CCL-Daycare-and-Residential-Operations-Data/bc5r-88dy#:~:text=Columns%20in%20this%20Dataset
   - **Number of Instances:** 500+

3. *Job Listings*
   - **Media:**
     - Image of the facility
     - Data about the job
     - Google Maps pin of the location
   - **Attributes:**
     - *Filter:*
       - Zip
       - Industry
       - Mobile optimized job
       - Job type (full time, part time, etc)
       - Salary
       - Company's revenue
       - Company size
     - *Search:*
       - Date
       - Job Description
       - Job type
       - Company's social networks
       - Company's monthly visitors
   - **Number of Instances:** 200

---

**Model Connection:**
Location

**Questions Answered:**
    1. Where can a family with young children affordably live in Austin?
    2. What jobs are available in low income residencial areas?
    3. What type of special care services for children is available near affordable housing?
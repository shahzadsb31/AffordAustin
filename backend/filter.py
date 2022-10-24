from tables import *
from api_helper import try_arg


# https://gitlab.com/shamirakabir/liveatx/-/tree/main used as a reference for
# filtering/searching/sorting :)
def filter_housing(query, args):
    zip_code = try_arg("zip_code", args)
    tenure = try_arg("tenure", args)
    unit_type = try_arg("unit_type", args)
    total_affordable_units = try_arg("total_affordable_units", args)
    ground_lease = try_arg("ground_lease", args)

    if zip_code:
        query = filter_housing_by(query, "zip_code", zip_code)

    if tenure:
        query = filter_housing_by(query, "tenure", tenure)

    if unit_type:
        query = filter_housing_by(query, "unit_type", unit_type)

    if total_affordable_units:
        query = filter_housing_by(
            query, "total_affordable_units", total_affordable_units
        )

    if ground_lease:
        query = filter_housing_by(query, "ground_lease", ground_lease)

    return query


def filter_housing_by(query, filter_type, value):
    if filter_type == "zip_code":
        query = query.filter(Housing.zip_code == int(value))

    elif filter_type == "tenure":
        query = query.filter(Housing.tenure == value)

    elif filter_type == "unit_type":
        query = query.filter(Housing.unit_type == value)

    elif filter_type == "total_affordable_units":
        value = value.split("-")

        if len(value) > 1:
            query = query.filter(Housing.total_affordable_units >= value[0])
            query = query.filter(Housing.total_affordable_units < value[1])
        else:
            query = query.filter(Housing.total_affordable_units >= value[0])

    elif filter_type == "ground_lease":
        query = query.filter(Housing.ground_lease == value)

    return query


def filter_childcare(query, args):
    county = try_arg("county", args)
    start_hours_val = try_arg("start_hours_val", args)
    end_hours_val = try_arg("end_hours_val", args)
    licensed_to_serve_ages = try_arg("licensed_to_serve_ages", args) 
    zip_code = try_arg("zip_code", args)

    if county:
        query = filter_childcare_by(query, "county", county)

    if start_hours_val:
        query = filter_childcare_by(query, "start_hours_val", start_hours_val)

    if end_hours_val:
        query = filter_childcare_by(query, "end_hours_val", end_hours_val)

    if licensed_to_serve_ages:
        query = filter_childcare_by(
            query, "licensed_to_serve_ages", licensed_to_serve_ages
        )

    if zip_code:
        query = filter_childcare_by(query, "zip_code", zip_code)

    return query


def filter_childcare_by(query, filter_type, value):
    if filter_type == "county":
        query = query.filter(Childcare.county == value)

    elif filter_type == "start_hours_val":
        query = query.filter(Childcare.start_hours_val == value)

    elif filter_type == "end_hours_val":
        query = query.filter(Childcare.end_hours_val == value)

    elif filter_type == "licensed_to_serve_ages":
        query = query.filter(
            Childcare.licensed_to_serve_ages.overlap([value])
        )

    elif filter_type == "zip_code":
        query = query.filter(Childcare.zip_code == value)

    return query


def filter_jobs(query, args):
    company_name = try_arg("company_name", args)
    schedule_type = try_arg("schedule_type", args)
    rating = try_arg("rating", args)
    reviews = try_arg("reviews", args)
    zip_code = try_arg("zip_code", args)

    if company_name:
        query = filter_jobs_by(query, "company_name", company_name)

    if schedule_type:
        query = filter_jobs_by(query, "schedule_type", schedule_type)

    if rating:
        query = filter_jobs_by(query, "rating", rating)

    if reviews:
        query = filter_jobs_by(query, "reviews", reviews)

    if zip_code:
        query = filter_jobs_by(query, "zip_code", zip_code)

    return query


def filter_jobs_by(query, filter_type, value):
    if filter_type == "company_name":
        query = query.filter(Job.company_name == value)

    elif filter_type == "schedule_type":
        query = query.filter(Job.detected_extensions.overlap([value.capitalize()]))

    elif filter_type == "rating":
        query = query.filter(Job.rating != -1)
        value = value.split("-")

        if len(value) > 1:
            query = query.filter(Job.rating >= value[0])
            query = query.filter(Job.rating < value[1])
        else:
            query = query.filter(Job.rating >= value[0])

    elif filter_type == "reviews":
        value = value.split("-")

        if len(value) > 1:
            query = query.filter(Job.reviews >= value[0])
            query = query.filter(Job.reviews < value[1])
        else:
            query = query.filter(Job.reviews >= value[0])

    elif filter_type == "zip_code":
        query = query.filter(Job.zip_code == value)

    return query


def filter_by_model(query, args, model):
    if model == "housing":
        return filter_housing(query, args)
    elif model == "childcare":
        return filter_childcare(query, args)
    elif model == "jobs":
        return filter_jobs(query, args)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}
from tables import *
from api_helper import try_arg


def sort_housing(query, sort_param):
    if len(sort_param) > 1:
        return sort_housing_by(query, sort_param[1], True)
    else:
        return sort_housing_by(query, sort_param[0], False)


def sort_housing_by(query, sort_param, descending):
    col = None

    if sort_param == "total_affordable_units":
        col = Housing.total_affordable_units

    elif sort_param == "unit_type":
        col = Housing.unit_type

    elif sort_param == "zip_code":
        col = Housing.zip_code

    else:
        print("no matching sortable value found")
        return query

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)


def sort_childcare(query, sort_param):
    if len(sort_param) > 1:
        return sort_childcare_by(query, sort_param[1], True)
    else:
        return sort_childcare_by(query, sort_param[0], False)


def sort_childcare_by(query, sort_param, descending):
    col = None

    if sort_param == "start_hours_val":
        col = Childcare.start_hours_val

    elif sort_param == "end_hours_val":
        col = Childcare.end_hours_val

    elif sort_param == "licensed_to_serve_ages":
        col = Childcare.licensed_to_serve_ages

    else:
        print("no matching sortable value found")
        return query

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)


def sort_jobs(query, sort_param):
    if len(sort_param) > 1:
        return sort_jobs_by(query, sort_param[1], True)
    else:
        return sort_jobs_by(query, sort_param[0], False)


def sort_jobs_by(query, sort_param, descending):
    col = None

    if sort_param == "rating":
        col = Job.rating

    elif sort_param == "reviews":
        col = Job.reviews

    elif sort_param == "zip_code":
        col = Job.zip_code

    else:
        print("no matching sortable value found")
        return query

    if descending:
        return query.order_by(col.desc())
    else:
        return query.order_by(col)


def sort_by_model(query, args, model):
    sort_param = try_arg("sort", args)

    if not sort_param:
        return query

    sort_param = sort_param.split("-")

    if model == "housing":
        return sort_housing(query, sort_param)
    elif model == "childcare":
        return sort_childcare(query, sort_param)
    elif model == "jobs":
        return sort_jobs(query, sort_param)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}
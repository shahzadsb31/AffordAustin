from tables import *
from api_helper import try_arg
from sqlalchemy import or_


def search_housing(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Housing.project_name.ilike(formatting))
        searches.append(Housing.property_management_company.ilike(formatting))
        searches.append(Housing.status.ilike(formatting))
        searches.append(Housing.developer.ilike(formatting))
        searches.append(Housing.unit_type.ilike(formatting))
        searches.append(Housing.address.ilike(formatting))
        searches.append(Housing.tenure.ilike(formatting))

    query = query.filter(or_(*tuple(searches)))
    return query


def search_childcare(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Childcare.operation_name.ilike(formatting))
        searches.append(Childcare.administrator_director_name.ilike(formatting))
        searches.append(Childcare.operation_type.ilike(formatting))
        searches.append(Childcare.type_of_issuance.ilike(formatting))
        searches.append(Childcare.location_address.ilike(formatting))

    query = query.filter(or_(*tuple(searches)))
    return query


def search_jobs(query, search):
    search_terms = search.strip().split()
    searches = []

    for term in search_terms:
        formatting = "%{}%".format(term.lower())

        searches.append(Job.title.ilike(formatting))
        searches.append(Job.company_name.ilike(formatting))
        searches.append(Job.extensions.overlap([formatting]))
        searches.append(Job.description.ilike(formatting))

    query = query.filter(or_(*tuple(searches)))
    return query


def search_by_model(query, args, model):
    search = try_arg("search", args)
    if not search:
        return query

    if model == "housing":
        return search_housing(query, search)
    elif model == "childcare":
        return search_childcare(query, search)
    elif model == "jobs":
        return search_jobs(query, search)
    else:
        print("{}er? I barely know 'er!".format(model))
        return {}
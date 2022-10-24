from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, column
from flask_marshmallow import Marshmallow

app = Flask(__name__)
# CORS(app)

app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config[
    "SQLALCHEMY_DATABASE_URI"
] = "postgresql+psycopg2://affordaustin:ky7dQwWt4B5ZVhPFnbZ6@affordaustin-db.cj68zosziuyy.us-east-2.rds.amazonaws.com:5432/affordaustin"

db = SQLAlchemy(app)
marsh = Marshmallow(app)

db.Model.metadata.reflect(db.engine)


class Housing(db.Model):
    __table__ = db.Model.metadata.tables["housing_new"]


class Childcare(db.Model):
    __table__ = db.Model.metadata.tables["childcare_new"]


class Job(db.Model):
    __table__ = db.Model.metadata.tables["jobs_new"]


class HousingSchema(marsh.Schema):
    class Meta:
        fields = (
            "id",
            "_image",
            "_map",
            "project_name",
            "tenure",
            "unit_type",
            "total_affordable_units",
            "ground_lease",
            "zip_code",
            "property_management_company",
            "status",
            "property_manager_phone_number",
            "address",
            "developer",
            "affordability_expiration_year",
            "units_30_mfi",
            "units_40_mfi",
            "units_50_mfi",
            "units_60_mfi",
            "units_65_mfi",
            "units_80_mfi",
            "units_100_mfi",
        )


class ChildcareSchema(marsh.Schema):
    class Meta:
        fields = (
            "id",
            "location_address",
            "county",
            "days_of_operation",
            "hours_of_operation",
            "licensed_to_serve_ages",
            "_image",
            "operation_name",
            "_map",
            "mailing_address",
            "accepts_child_care_subsidies",
            "programs_provided",
            "phone_number",
            "email_address",
            "website_address",
            "operation_type",
            "administrator_director_name",
            "total_capacity",
            "total_inspections",
            "total_reports",
            "total_self_reports",
            "total_assessments",
            "issuance_date",
            "type_of_issuance",
            "start_hours_val",
            "end_hours_val",
            "zip_code",
        )


class JobSchema(marsh.Schema):
    class Meta:
        fields = (
            "id",
            "_map",
            "_image",
            "detected_extensions",
            "extensions",
            "title",
            "company_name",
            "reviews",
            "description",
            "apply_link",
            "via",
            "rating_link",
            "rating",
            "zip_code",
        )


house_schema = HousingSchema()
houses_schema = HousingSchema(many=True)

childcare_schema = ChildcareSchema()
childcares_schema = ChildcareSchema(many=True)

job_schema = JobSchema()
jobs_schema = JobSchema(many=True)

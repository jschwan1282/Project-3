# import necessary libraries
import numpy as np
import datetime
import sqlalchemy
import json
from dateutil.relativedelta import relativedelta
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func

from flask import Flask, jsonify

# Database Setup
POSTGRES = {
    'user': 'postgres',
    'pw': 'postgres',
    'db': 'malria_db',
    'host': 'localhost',
    'port': '5432',
}

engine = create_engine("'postgresql://%(user)s:\
%(pw)s@%(host)s:%(port)s/%(db)s' % POSTGRES")



# reflect an existing database into a new model
Base = automap_base()

# reflect the tables
Base.prepare(engine, reflect=True)

# references to each table
malaria_db = Base.classes.malaria_db

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/home", methods=['GET'])
def index():
    return render_template("home.html")

# create route that renders index.html template
@app.route("/main", methods=['GET'])
def index():
    return render_template("main.html")

# create route that renders index.html template
@app.route("/plots", methods=['GET'])
def index():
    return render_template("plots.html")

#create a route for the data
@app.route("/api", methods=['GET'])
def api():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all results"""
    # Query all malaria
    results = session.query(
        malaria_db.country,
        malaria_db.code,
        malaria_db.year,
        malaria_db.under_5,
        malaria_db.age_5_14,
        malaria_db.age_15_49,
        malaria_db.age_50_69,
        malaria_db.over_70,
        malaria_db.total_deaths,
        malaria_db.populuation,
        malaria_db.perc_of_pop_w_malaria,
        malaria_db.gdp_per_capita).all()

    session.close()

    # Create a dictionary from the row data and append to a list
    malaria_db = []
    for country, code, year, under_5, age_5_14, age_15_49, age_50_69, over_70, total_deaths, populuation, perc_of_pop_w_malaria, gdp_per_capita    in results:
        malaria_dict = {}
        malaria_dict[country] = country
        malaria_dict[code] = code
        malaria_dict[year] = year
        malaria_dict[under_5] = under_5
        malaria_dict[age_5_14] = age_5_14
        malaria_dict[age_15_49] = age_15_49
        malaria_dict[age_50_69] = age_50_69
        malaria_dict[over_70] = over_70
        malaria_dict[total_deaths] = total_deaths
        malaria_dict[populuation] = populuation
        malaria_dict[perc_of_pop_w_malaria] = perc_of_pop_w_malaria
        malaria.append(malaria_dict)
    return jsonify(precip)



if __name__ == "__main__":
    app.run(debug=True)

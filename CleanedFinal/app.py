# import necessary libraries
import numpy as np
import datetime
import sqlalchemy
import json
from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session
from sqlalchemy import create_engine, func, Column, String
from sqlalchemy.ext.declarative import declarative_base
from flask import Flask, jsonify, request, render_template

engine = create_engine("postgresql+psycopg2://postgres:postgres@localhost:5432/malaria_db")

# reflect an existing database into a new model
Base = automap_base()

Base.prepare(engine, reflect=True)

# references to each table
Table_000817 = Base.classes.table_000817

# create instance of Flask app
app = Flask(__name__)

# create route that renders index.html template
@app.route("/index")
def index():
    return render_template("index.html")

# create route that renders index.html template
@app.route("/main")
def main():
    return render_template("main.html")

@app.route("/main2")
def main2():
    return render_template("main2.html")

# create route that renders index.html template
@app.route("/plots")
def plots():
    return render_template("plots.html")

#create a route for the data
@app.route("/api")
def api():
    # Create our session (link) from Python to the DB
    session = Session(engine)

    """Return a list of all results"""
    # Query all malaria
    results = session.query(
        Table_000817.country,
        Table_000817.code,
        Table_000817.year,
        Table_000817.under_5,
        Table_000817.age_5_14,
        Table_000817.age_15_49,
        Table_000817.age_50_69,
        Table_000817.over_70,
        Table_000817.total_deaths,
        Table_000817.population,
        Table_000817.perc_of_pop_w_malaria,
        Table_000817.gdp_per_capita).all()

    session.close()

    # Create a dictionary from the row data and append to a list
    malaria_db = []
    for country, code, year, under_5, age_5_14, age_15_49, age_50_69, over_70, total_deaths, population, perc_of_pop_w_malaria, gdp_per_capita in results:
        malaria_dict = {}
        malaria_dict["country"] = country
        malaria_dict["code"] = code
        malaria_dict["year"] = year
        malaria_dict["under_5"] = under_5
        malaria_dict["age_5_14"] = age_5_14
        malaria_dict["age_15_49"] = age_15_49
        malaria_dict["age_50_69"] = age_50_69
        malaria_dict["over_70"] = over_70
        malaria_dict["total_deaths"] = total_deaths
        malaria_dict["population"] = population
        malaria_dict["perc_of_pop_w_malaria"] = perc_of_pop_w_malaria
        malaria_dict["gdp_per_capita"] = gdp_per_capita
        malaria_db.append(malaria_dict)
    return jsonify(malaria_db)



if __name__ == "__main__":
    app.run(debug=True)

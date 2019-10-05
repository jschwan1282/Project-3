# import necessary libraries
from flask import Flask, render_template, jsonify
from flask_sqlalchemy import SQLAlchemy
import requests
import json

# create instance of Flask app
app = Flask(__name__)
app.config["SQLALCHEMY_DATABASE_URI"] = 'postgresql://postgres:postgres@localhost:5432/malaria_db'
db = SQLAlchemy(app)

# create route that renders index.html template
@app.route("/")
def index():
    return render_template("index.html")

#create a route for the data
@app.route("/api")
def api():
    results =  
    return jsonify(SOMETHING)

if __name__ == "__main__":
    app.run(debug=True)

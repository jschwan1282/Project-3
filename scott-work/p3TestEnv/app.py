from flask import Flask, jsonify, request, render_template, json, url_for
from dataGeoPython import getGeoData

app = Flask(__name__)

# @app.route("/geoData")
# def geoData():
#     """Return the geo data as json"""
#     print("hi")
#     data = open("countries.geojson")

#     return jsonify(data)

# @app.route("/")
# def welcome():
#     return (
#         f"Welcome to the Justice League API!<br/>"
#         f"Available Routes:<br/>"
#         f"/geoData"
#     )

@app.route("/data")
def data():
    return jsonify(getGeoData())

@app.route("/")
def welcome():
    return (
        f"Welcome to Hell<br/>"
        f"Available Routes:<br/>"
        f"/data"
    )



if __name__ == "__main__":
    app.run(debug=True)

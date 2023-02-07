from flask import Flask, jsonify, request, Response
import pymongo
from flask_cors import CORS
import json

app = Flask(__name__)
CORS(app)
app.secret_key = "so-secret-omg"
client = pymongo.MongoClient("mongodb://localhost:27017/")
db = client.get_database('Project')

myclient = pymongo.MongoClient(host='localhost', serverSelectionTimeoutMS=3000)
mydb = myclient["health"]

@app.route('/covid-api', methods=["GET", "POST"])
def covid_api():
    try:
        if request.is_json is not False:
            return jsonify({"success": False, "error": "Invalid form of data or not json format."})
        if request.method != "GET":
            return jsonify({"success": False, "error": "Invalid request method."})
        # Get the collection called covid from DB
        table = mydb["covid"]
        # Get all the records in the collection
        covid_data = list(table.find({}))

        # For each record change the id from type ObjectID to string
        for value in covid_data:
            value["_id"] = str(value["_id"])

        # Return the data in json format in the response
        return Response(
            response=json.dumps(covid_data),
            status=200,
            mimetype="application/json")
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/flu-api', methods=["GET", "POST"])
def flu_api():
    try:
        if request.is_json is not False:
            return jsonify({"success": False, "error": "Invalid form of data or not json format."})
        if request.method != "GET":
            return jsonify({"success": False, "error": "Invalid request method."})
        
        # Get the collection called flu from DB
        table = mydb["flu"]

        # Get all the records in the collection
        flu_data  = list(table.find({}))

        # For each record change the id from type ObjectID to string
        for value in flu_data:
            value["_id"] = str(value["_id"])

        # Return the data in json format in the response
        return Response(
            response=json.dumps(flu_data),
            status=200,
            mimetype="application/json")
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

@app.route('/cold-api', methods=["GET", "POST"])
def cold_api():
    try:
        if request.is_json is not False:
            return jsonify({"success": False, "error": "Invalid form of data or not json format."})
        if request.method != "GET":
            return jsonify({"success": False, "error": "Invalid request method."})
        
        # Get the collection called cold from DB
        table = mydb["cold"]

        # Get all the records in the collection
        cold_data = list(table.find({}))

        # For each record change the id from type ObjectID to string
        for value in cold_data:
            value["_id"] = str(value["_id"])

        # Return the data in json format in the response
        return Response(
            response=json.dumps(cold_data),
            status=200,
            mimetype="application/json")
    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

if __name__=="__main__":
    app.run(debug=True, port=2001)

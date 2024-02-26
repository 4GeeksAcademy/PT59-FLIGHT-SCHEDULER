"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
# from noaa_api_v2 import NOAAData
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User

from api.utils import generate_sitemap, APIException
from flask_cors import CORS
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db
from api.admin import setup_admin
from api.commands import setup_commands
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Reservation
from api.utils import generate_sitemap, APIException
from flask_cors import CORS

import requests
from email.message import EmailMessage
import smtplib
from datetime import datetime, timedelta
import ssl
import uuid
from urllib.parse import unquote, quote
import secrets
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, decode_token
import os
from dotenv import load_dotenv
import requests

# from api.emailManager import send_email

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200




# any other endpoint will try to serve it like a static file

#signUp
@api.route('/signup', methods=['POST'])
def createUser():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    password = request.json.get("password")
    email = request.json.get("email")

    user = user.query.filter_by(email=email).first()
    if user != None:
        return jsonify({"msg": "email exists"}), 401
    
    if user == None:
        new_user_data = User(first_name=first_name, last_name=last_name ,password=password, email = email)
        db.session.add(new_user_data)
        db.session.commit()
    
        response_body = {
            "msg": "User successfully added"
        }

        return jsonify(response_body), 200

   
# use put or post in signup



#login
@api.route('/token', methods=['POST'])
def create_token():
    email = request.json.get("email")
    password = request.json.get("password")
    
    user = user.query.filter_by(email=email, password=password).first()
    if user is None:
        
        return jsonify({"msg": "Bad email or password"}), 401
    
  
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id }) ,200


# ask shane what he thinks about that and should be handled

@api.route('/edit_user', methods=[ 'PUT'])
@jwt_required()
def edit_user():
    current_user_id = get_jwt_identity()
    user = user.query.get(current_user_id)

    if user is None:
        return jsonify({"msg":"user does not exist"}), 404

    # Update user fields based on the JSON data (assuming JSON payload)
    data = request.get_json()
    user.first_name = data.get('first_name')
    user.last_name = data.get('last_name')
    user.biography = data.get('biography')
    user.perm_location = data.get('perm_location')
    # user.places_visited = data.get('places_visited')
    # user.wishlist_places = data.get('wishlist_places')

    # Update other fields as needed
    db.session.commit()
    user = user.query.get(current_user_id)
    response_body = {
        "msg": "Success!", "user":user.serialize()
    }
    return jsonify(response_body),200




@api.route('/user/<int:id>', methods=['GET'])
def get_user(id):
   user = user.query.get(id)

   if user is None: 
    raise APIException("Person not found", status_code=404)

   return jsonify(user.serialize()), 200





@api.route('/reservation', methods=['POST'])
@jwt_required()
def create_reservation(res_id):
   user_id = get_jwt_identity()  
   request_body = request.get_json()
   name = request_body.get("name")
   date = request_body.get("date")
 
   new_reservation = Reservation(name = name, date=date, user_id=user_id)
   db.session.add(new_reservation)
   db.session.commit()
   return jsonify("User successfully created"), 200


@api.route('/reservation/<int:res_id>', methods=['PUT'])
@jwt_required()
def update_reservation(res_id):
   user_id = get_jwt_identity()  
   request_body = request.get_json()
   name = request_body.get("name")
   start_date = request_body.get("start_date")
   end_date = request_body.get("end_date")

   new_reservation = Reservation(id=res_id, name = name, start_date = start_date, end_date = end_date, user_id=user_id)
   db.session.add(new_reservation)
   db.session.commit()
   return jsonify(request_body), 200

# DELETE RES
@api.route('/reservation/<int:reservation_id>', methods=['DELETE'])
def delete_res(reservation_id):
    # Example of retrieving a reservation from a database
    reservation = db.get_reservation_by_id(reservation_id)
    if reservation is None:
     raise APIException("Reservation not found", status_code=404)
    db.session.delete(reservation)
    return jsonify(reservation.serialize(), "resevation deleted"), 200



@api.route('/reservation', methods=['GET'])
def get_all_res():
    reservations = Reservation.query.all()  # Fetch all reservation instances
    if not reservations:
        raise APIException("No reservations found", status_code=404)

    # Serialize each reservation and return as a list
    return jsonify([reservation.serialize() for reservation in reservations]), 200



# @api.route('/reservation/<int:reservation_id>', methods=['GET'])
# def get_res(reservation_id):
#     # Example of retrieving a reservation from a database
#     reservation = db.get_reservation_by_id(reservation_id)
#     if reservation is None:
#      raise APIException("Person not found", status_code=404)
#     return jsonify(reservation.serialize()), 200

# # weather 
# @api.route('/weather/<float:lat>/<float:lon>', methods=['GET'])
# def get_weather(lat, lon):
#     url = "https://api.weather.gov/points/33.667961,-84.017792"

#     # weather_token=vISIDpOjgicBbgZxruvSWdYAoIbMgMmu

#     response = requests.get(url)
#     # print(response)
#     return jsonify(response.json())

    
    # api_token = "vISIDpOjgicBbgZxruvSWdYAoIbMgMmu"

    # data = NOAAData(api_token)

    # categories = data.data_categories(locationid='FIPS:37', sortfield='name')

    # for i in categories:
    #     print(i)

    # state = "FL" 
    # respone = requests.get(f"https://api.weather.gov/alerts/active?area={state}").json()

    # for x in response['features']:
    #    print(x['properties']["areaDesc"])
    #    print(x['properties']['headline'])
    #    print(x['properties']['description'])
    #    print('\n******\n')

      #TRY TO FIGURE THIS OUT AT LATER TIME THE API BACKEND REQUEST
"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
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
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment
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


from api.emailManager import send_email

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


#signUp
@api.route('/signup', methods=['POST'])
def createUser():
    first_name = request.json.get("first_name")
    last_name = request.json.get("last_name")
    password = request.json.get("password")
    email = request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if User != None:
        return jsonify({"msg": "email exists"}), 401
    





# #login
# @api.route('/token', methods=['POST'])
# def create_token():
#     email = request.json.get("email")
#     password = request.json.get("password")
    
#     user = User.query.filter_by(email=email, password=password).first()
#     if user is None:
        
#         return jsonify({"msg": "User is not found"}), 404
    
  
#     access_token = create_access_token(identity=user.id)
#     return jsonify({ "token": access_token, "user_id": user.id }) ,200




# @api.route('/edit_user', methods=[ 'PUT'])
# @jwt_required()
# def edit_user():
#     current_user_id = get_jwt_identity()
#     user = User.query.get(current_user_id)

#     if user is None:
#         return jsonify({"msg":"user does not exist"}), 404

#     # Update user fields based on the JSON data (assuming JSON payload)
#     data = request.get_json()
#     user.first_name = data.get('first_name')
#     user.last_name = data.get('last_name')
#     user.biography = data.get('biography')
#     user.perm_location = data.get('perm_location')
   

#     # Update other fields as needed
#     db.session.commit()
#     user = User.query.get(current_user_id)
#     response_body = {
#         "msg": "Success!", "user":user.serialize()
#     }
#     return jsonify(response_body),200




# @app.route('/user', methods=['GET'])
# def get_user(user_id):
#    user = user.query.get(user_id)

#    if user is None: 
#     raise APIException("Person not found", status_code=404)

#    return jsonify(user.serialize()), 200




# this only runs if `$ python src/main.py` is executed
# if __name__ == '__main__':
#     PORT = int(os.environ.get('PORT', 3001))
#     app.run(host='0.0.0.0', port=PORT, debug=True)

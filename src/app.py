"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
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
# from models import Person

ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type=True)
db.init_app(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object


@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code

# generate sitemap with all your endpoints


@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')

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
    
    user = user(first_name=first_name, last_name=last_name ,password=password, email = email)
    db.session.add(user)
    db.session.commit()
    
    response_body = {
        "msg": "User successfully added"
    }

    return jsonify(response_body), 200





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




@app.route('/user', methods=['GET'])
def get_user(user_id):
   user = user.query.get(user_id)

   if user is None: 
    raise APIException("Person not found", status_code=404)

   return jsonify(user.serialize()), 200




# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)

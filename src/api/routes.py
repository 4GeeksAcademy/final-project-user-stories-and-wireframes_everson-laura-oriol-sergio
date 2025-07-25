"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.auth import register_user, login_user, forgot_password,reset_password
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv


load_dotenv()

api = Blueprint('api', __name__)


CORS(api)

@api.route('/register', methods=['POST'])
def register():
    return register_user()

@api.route('/login', methods=['POST'])
def login():
    return login_user()

@api.route('/forgot-password', methods=['POST'])
def forgot():
    return forgot_password()

@api.route('/reset-password', methods=['POST'])
def reset():
    return reset_password()

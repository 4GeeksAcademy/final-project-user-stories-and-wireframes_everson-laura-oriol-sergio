"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from api.auth import register_user, login_user, forgot_password, reset_password
from flask_jwt_extended import JWTManager
from dotenv import load_dotenv
from api.ai import get_recommendations
from api.cards import cards_bp

load_dotenv()

api = Blueprint('api', __name__)


CORS(api)

api.register_blueprint(cards_bp, url_prefix="/api")

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


@api.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json()
    category = data.get("category")
    preferences = data.get("preferences")

    if category not in ["libros", "peliculas", "series"]:
        return jsonify({"msg": "Categoría inválida"}), 400

    if not preferences:
        return jsonify({"msg": "Debes enviar tus preferencias"}), 400

    results = get_recommendations(category, preferences)
    return jsonify(results), 200

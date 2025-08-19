import os
from flask import request, jsonify, Blueprint
from dotenv import load_dotenv
from flask_jwt_extended import jwt_required, get_jwt_identity

from api.models import User
from api.ai import get_and_save_user_recommendations
from api.models import UserRecommendation
from api.auth import register_user, login_user, forgot_password, reset_password
from api.ai import get_recommendations
from api.cards import list_cards, create_card, update_card, delete_card
from api.decorators import admin_required

load_dotenv()

api = Blueprint('api', __name__)


# ---- Auth ----
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

# ---- IA ----
@api.route('/recommendations', methods=['POST'])
def recommendations():
    data = request.get_json() or {}
    category = data.get("category")
    preferences = data.get("preferences")
    if category not in ["libros", "peliculas", "series"]:
        return jsonify({"msg": "Categoría inválida"}), 400
    if not preferences:
        return jsonify({"msg": "Debes enviar tus preferencias"}), 400
    results = get_recommendations(category, preferences)
    return jsonify(results), 200

# ---- Cards ----
@api.route("/cards", methods=["GET"])
def http_list_cards():
    return jsonify(list_cards()), 200

@api.route("/cards", methods=["OPTIONS"])
def options_cards():
    return jsonify({"msg": "Preflight OK"}), 200

@api.route("/cards", methods=["POST"])
@admin_required
def http_create_card():
    data = request.get_json() or {}
    created, err = create_card(data)
    if err:
        return jsonify({"msg": err}), 400
    return jsonify(created), 201

@api.route("/cards/<int:card_id>", methods=["PUT"])
@admin_required
def http_update_card(card_id):
    data = request.get_json() or {}
    updated, err = update_card(card_id, data)
    if err == "Carta no encontrada":
        return jsonify({"msg": err}), 404
    if err:
        return jsonify({"msg": err}), 400
    return jsonify(updated), 200

@api.route("/cards/<int:card_id>", methods=["DELETE"])
@admin_required
def http_delete_card(card_id):
    ok, err = delete_card(card_id)
    if err == "Carta no encontrada":
        return jsonify({"msg": err}), 404
    if not ok:
        return jsonify({"msg": err or "No se pudo eliminar"}), 400
    return jsonify({"msg": "Carta eliminada"}), 200


# ---- Recommendations/History ---
@api.route('/ai/recommend', methods=['POST'])
@jwt_required()
def recommend_and_save():
    user_id = get_jwt_identity()
    user = User.query.get(user_id)
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 404

    data = request.get_json() or {}
    category = data.get("category")
    preferences = data.get("preferences")

    if category not in ["libros", "peliculas", "series"]:
        return jsonify({"msg": "Categoría inválida"}), 400
    if not preferences:
        return jsonify({"msg": "Debes enviar tus preferencias"}), 400

    try:
        result = get_and_save_user_recommendations(user_id, category, preferences)
        return jsonify(result), 201
    except Exception as e:
        return jsonify({"msg": f"Error al obtener recomendación: {str(e)}"}), 500

@api.route('/ai/history', methods=['GET'])
@jwt_required()
def get_history():
    user_id = get_jwt_identity()
    recs = UserRecommendation.query.filter_by(user_id=user_id).order_by(UserRecommendation.created_at.desc()).all()
    return jsonify([r.serialize() for r in recs]), 200
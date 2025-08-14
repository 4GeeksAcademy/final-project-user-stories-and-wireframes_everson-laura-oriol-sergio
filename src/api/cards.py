# src/api/cards.py
from flask import Blueprint, request, jsonify
from api.models import db, Card
from api.decorators import admin_required

cards_bp = Blueprint("cards", __name__)

# Obtener todas las cartas (público)
@cards_bp.route("/cards", methods=["GET"])
def get_cards():
    cards = Card.query.all()
    return jsonify([c.serialize() for c in cards]), 200

#  Crear carta (solo admin)
@cards_bp.route("/cards", methods=["POST"])
@admin_required
def create_card():
    data = request.get_json()
    if not data.get("text") or not data.get("value") or not data.get("relation"):
        return jsonify({"msg": "Faltan campos obligatorios"}), 400

    new_card = Card(
        text=data.get("text"),
        emoji=data.get("emoji"),
        value=data.get("value"),
        relation=data.get("relation"),
        img=data.get("img")
    )
    db.session.add(new_card)
    db.session.commit()
    return jsonify(new_card.serialize()), 201

#  Actualizar carta (solo admin)
@cards_bp.route("/cards/<int:card_id>", methods=["PUT"])
@admin_required
def update_card(card_id):
    card = Card.query.get_or_404(card_id)
    data = request.get_json()

    card.text = data.get("text", card.text)
    card.emoji = data.get("emoji", card.emoji)
    card.value = data.get("value", card.value)
    card.relation = data.get("relation", card.relation)
    card.img = data.get("img", card.img)

    db.session.commit()
    return jsonify(card.serialize()), 200

# Eliminar carta (solo admin)
@cards_bp.route("/cards/<int:card_id>", methods=["DELETE"])
@admin_required
def delete_card(card_id):
    card = Card.query.get_or_404(card_id)
    db.session.delete(card)
    db.session.commit()
    return jsonify({"msg": "Carta eliminada"}), 200

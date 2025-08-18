from api.models import db, Card

def list_cards():
    cards = Card.query.all()
    return [c.serialize() for c in cards]

def create_card(data: dict):
    if not data.get("text") or not data.get("value") or not data.get("relation"):
        return None, "Faltan campos obligatorios: text, value, relation"
    new_card = Card(
        text=data.get("text"),
        emoji=data.get("emoji"),
        value=data.get("value"),
        relation=data.get("relation"),
        img=data.get("img")
    )
    db.session.add(new_card)
    db.session.commit()
    return new_card.serialize(), None

def update_card(card_id: int, data: dict):
    card = Card.query.get(card_id)
    if not card:
        return None, "Carta no encontrada"
    card.text = data.get("text", card.text)
    card.emoji = data.get("emoji", card.emoji)
    card.value = data.get("value", card.value)
    card.relation = data.get("relation", card.relation)
    card.img = data.get("img", card.img)
    db.session.commit()
    return card.serialize(), None

def delete_card(card_id: int):
    card = Card.query.get(card_id)
    if not card:
        return False, "Carta no encontrada"
    db.session.delete(card)
    db.session.commit()
    return True, None

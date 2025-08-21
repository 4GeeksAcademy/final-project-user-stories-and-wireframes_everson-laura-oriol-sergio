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

def seed_default_cards():
    default_cards = [

        # ==== Libros ====
        {"text": "Harry Potter", "emoji": "🧙‍♂️", "value": 1, "relation": "books"},
        {"text": "1984", "emoji": "👁️", "value": 3, "relation": "books"},
        {"text": "Cien Años de Soledad", "emoji": "🌳", "value": 4, "relation": "books"},
        {"text": "El Hobbit", "emoji": "🐉", "value": 2, "relation": "books"},
        {"text": "Don Quijote", "emoji": "🗡️", "value": 5, "relation": "books"},
        {"text": "La Odisea", "emoji": "⛵", "value": 6, "relation": "books"},
        {"text": "Crimen y Castigo", "emoji": "⚖️", "value": 7, "relation": "books"},
        {"text": "Orgullo y Prejuicio", "emoji": "❤️", "value": 8, "relation": "books"},
        {"text": "El Principito", "emoji": "🪐", "value": 9, "relation": "books"},
        {"text": "Drácula", "emoji": "🧛", "value": 10, "relation": "books"},
        {"text": "Moby Dick", "emoji": "🐋", "value": 11, "relation": "books"},
        {"text": "Fahrenheit 451", "emoji": "🔥", "value": 12, "relation": "books"},
        {"text": "Los Juegos del Hambre", "emoji": "🏹", "value": 13, "relation": "books"},
        {"text": "La Sombra del Viento", "emoji": "📚", "value": 14, "relation": "books"},
        {"text": "It (Eso)", "emoji": "🎈", "value": 15, "relation": "books"},

        # ==== Películas ====
        {"text": "Titanic", "emoji": "🚢", "value": 1, "relation": "movies"},
        {"text": "El Padrino", "emoji": "🕴️", "value": 2, "relation": "movies"},
        {"text": "El Señor de los Anillos", "emoji": "💍", "value": 3, "relation": "movies"},
        {"text": "Matrix", "emoji": "🕶️", "value": 4, "relation": "movies"},
        {"text": "Inception", "emoji": "🧠", "value": 5, "relation": "movies"},
        {"text": "Avengers", "emoji": "🛡️", "value": 6, "relation": "movies"},
        {"text": "Avatar", "emoji": "🌌", "value": 7, "relation": "movies"},
        {"text": "Toy Story", "emoji": "🤠", "value": 8, "relation": "movies"},
        {"text": "Joker", "emoji": "🎭", "value": 9, "relation": "movies"},
        {"text": "Gladiador", "emoji": "🏛️", "value": 10, "relation": "movies"},
        {"text": "Jurassic Park", "emoji": "🦖", "value": 11, "relation": "movies"},
        {"text": "Forrest Gump", "emoji": "🏃‍♂️", "value": 12, "relation": "movies"},
        {"text": "Star Wars", "emoji": "✨", "value": 13, "relation": "movies"},
        {"text": "Batman: El Caballero de la Noche", "emoji": "🦇", "value": 14, "relation": "movies"},
        {"text": "Up", "emoji": "🎈", "value": 15, "relation": "movies"},

        # ==== Series ====
        {"text": "Breaking Bad", "emoji": "🧪", "value": 1, "relation": "series"},
        {"text": "Game of Thrones", "emoji": "🐉", "value": 2, "relation": "series"},
        {"text": "Stranger Things", "emoji": "⚡", "value": 3, "relation": "series"},
        {"text": "The Office", "emoji": "📎", "value": 4, "relation": "series"},
        {"text": "Friends", "emoji": "☕", "value": 5, "relation": "series"},
        {"text": "The Mandalorian", "emoji": "🚀", "value": 6, "relation": "series"},
        {"text": "The Crown", "emoji": "👑", "value": 7, "relation": "series"},
        {"text": "Dark", "emoji": "⏳", "value": 8, "relation": "series"},
        {"text": "The Witcher", "emoji": "⚔️", "value": 9, "relation": "series"},
        {"text": "Black Mirror", "emoji": "🖥️", "value": 10, "relation": "series"},
        {"text": "Vikingos", "emoji": "🛡️", "value": 11, "relation": "series"},
        {"text": "Sherlock", "emoji": "🔍", "value": 12, "relation": "series"},
        {"text": "Loki", "emoji": "🌀", "value": 13, "relation": "series"},
        {"text": "The Boys", "emoji": "💥", "value": 14, "relation": "series"},
        {"text": "Better Call Saul", "emoji": "📞", "value": 15, "relation": "series"}
    ]

    created = []
    for card in default_cards:
        new_card = Card(**card)
        db.session.add(new_card)
        created.append(new_card)

    db.session.commit()
    return [c.serialize() for c in created]
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

        # ==== Cartas Iniciales ====
        {"text": "¿Quieres ver una película?", "emoji": "🎬",
            "value": "Pelicula", "relation": "inicial", "img": None},
        {"text": "¿Quieres leer un libro?", "emoji": "📚",
            "value": "Libro", "relation": "inicial", "img": None},
        {"text": "¿Quieres ver una serie?", "emoji": "📺",
            "value": "Serie", "relation": "inicial", "img": None},

        # ==== Géneros de Películas ====
        {"text": "Acción", "emoji": "💥", "value": "accion_peliculas",
            "relation": "Pelicula", "img": None},
        {"text": "Drama", "emoji": "🎭", "value": "drama_peliculas",
            "relation": "Pelicula", "img": None},
        {"text": "Comedia", "emoji": "😂", "value": "comedia_peliculas",
            "relation": "Pelicula", "img": None},
        {"text": "Ciencia Ficción", "emoji": "🚀",
            "value": "scifi_peliculas", "relation": "Pelicula", "img": None},
        {"text": "Terror", "emoji": "👻", "value": "terror_peliculas",
            "relation": "Pelicula", "img": None},
        {"text": "Animación", "emoji": "🎨", "value": "animacion_peliculas",
            "relation": "Pelicula", "img": None},

        # ==== Géneros de Libros ====
        {"text": "Ficción", "emoji": "📖", "value": "ficcion_libros",
            "relation": "Libro", "img": None},
        {"text": "Ciencia Ficción", "emoji": "🛸",
            "value": "scifi_libros", "relation": "Libro", "img": None},
        {"text": "Fantasía", "emoji": "🧙‍♂️", "value": "fantasia_libros",
            "relation": "Libro", "img": None},
        {"text": "Misterio", "emoji": "🔍", "value": "misterio_libros",
            "relation": "Libro", "img": None},
        {"text": "Romance", "emoji": "💕", "value": "romance_libros",
            "relation": "Libro", "img": None},
        {"text": "No Ficción", "emoji": "📊", "value": "noficcion_libros",
            "relation": "Libro", "img": None},

        # ==== Géneros de Series ====
        {"text": "Drama", "emoji": "🎭", "value": "drama_series",
            "relation": "Serie", "img": None},
        {"text": "Comedia", "emoji": "😄", "value": "comedia_series",
            "relation": "Serie", "img": None},
        {"text": "Acción", "emoji": "⚔️", "value": "accion_series",
            "relation": "Serie", "img": None},
        {"text": "Ciencia Ficción", "emoji": "👽",
            "value": "scifi_series", "relation": "Serie", "img": None},
        {"text": "Crimen/Thriller", "emoji": "🕵️",
            "value": "crimen_series", "relation": "Serie", "img": None},
        {"text": "Documentales", "emoji": "🎥",
            "value": "documental_series", "relation": "Serie", "img": None},

        # ==== Duración de Películas de Acción ====
        {"text": "Película Corta (< 90 min)", "emoji": "⏰", "value": "accion_corta",
         "relation": "accion_peliculas", "img": None},
        {"text": "Duración Media (90-120 min)", "emoji": "🕐", "value": "accion_media",
         "relation": "accion_peliculas", "img": None},
        {"text": "Película Larga (> 120 min)", "emoji": "⏳", "value": "accion_larga",
         "relation": "accion_peliculas", "img": None},

        # ==== Actores de Películas de Acción Cortas ====
        {"text": "Con Tom Cruise", "emoji": "🎬", "value": "final",
            "relation": "accion_corta", "img": None},
        {"text": "Con Jason Statham", "emoji": "💪", "value": "final",
            "relation": "accion_corta", "img": None},
        {"text": "Con Keanu Reeves", "emoji": "🕴️", "value": "final",
            "relation": "accion_corta", "img": None},

        # ==== Actores de Películas de Acción Media ====
        {"text": "Con Will Smith", "emoji": "😎", "value": "final",
            "relation": "accion_media", "img": None},
        {"text": "Con Dwayne Johnson", "emoji": "🗿", "value": "final",
            "relation": "accion_media", "img": None},
        {"text": "Con Chris Evans", "emoji": "🛡️", "value": "final",
            "relation": "accion_media", "img": None},

        # ==== Directores de Películas de Acción Largas ====
        {"text": "Dirigida por Christopher Nolan", "emoji": "🧠", "value": "final",
            "relation": "accion_larga", "img": None},
        {"text": "Dirigida por Zack Snyder", "emoji": "🦸", "value": "final",
            "relation": "accion_larga", "img": None},
        {"text": "Dirigida por Russo Brothers", "emoji": "👥", "value": "final",
            "relation": "accion_larga", "img": None},

        # ==== Época de Dramas ====
        {"text": "Películas Clásicas (antes 1990)", "emoji": "🎞️",
         "value": "drama_clasico", "relation": "drama_peliculas", "img": None},
        {"text": "Películas Modernas (1990-2010)", "emoji": "📼",
         "value": "drama_moderno", "relation": "drama_peliculas", "img": None},
        {"text": "Películas Actuales (2010+)", "emoji": "🆕", "value": "drama_actual",
         "relation": "drama_peliculas", "img": None},

        # ==== Actores de Drama Clásico ====
        {"text": "Con Marlon Brando", "emoji": "👑", "value": "final",
            "relation": "drama_clasico", "img": None},
        {"text": "Con Al Pacino", "emoji": "🕴️", "value": "final",
            "relation": "drama_clasico", "img": None},
        {"text": "Con Robert De Niro", "emoji": "🎭", "value": "final",
            "relation": "drama_clasico", "img": None},

        # ==== Actores de Drama Moderno ====
        {"text": "Con Tom Hanks", "emoji": "🏃‍♂️", "value": "final",
            "relation": "drama_moderno", "img": None},
        {"text": "Con Leonardo DiCaprio", "emoji": "🌊", "value": "final",
            "relation": "drama_moderno", "img": None},
        {"text": "Con Russell Crowe", "emoji": "🏛️", "value": "final",
            "relation": "drama_moderno", "img": None},

        # ==== Actores de Drama Actual ====
        {"text": "Con Joaquin Phoenix", "emoji": "🃏", "value": "final",
            "relation": "drama_actual", "img": None},
        {"text": "Con Ryan Gosling", "emoji": "🌙", "value": "final",
            "relation": "drama_actual", "img": None},
        {"text": "Con Oscar Isaac", "emoji": "🎵", "value": "final",
            "relation": "drama_actual", "img": None},

        # ==== Tipo de Comedia ====
        {"text": "Comedia Romántica", "emoji": "💕", "value": "comedia_romantica",
            "relation": "comedia_peliculas", "img": None},
        {"text": "Comedia de Acción", "emoji": "💥", "value": "comedia_accion",
            "relation": "comedia_peliculas", "img": None},
        {"text": "Comedia Familiar", "emoji": "👨‍👩‍👧‍👦",
            "value": "comedia_familiar", "relation": "comedia_peliculas", "img": None},

        # ==== Actores de Comedia Romántica ====
        {"text": "Con Ryan Reynolds", "emoji": "😏", "value": "final",
            "relation": "comedia_romantica", "img": None},
        {"text": "Con Jennifer Aniston", "emoji": "💛", "value": "final",
            "relation": "comedia_romantica", "img": None},
        {"text": "Con Hugh Grant", "emoji": "🇬🇧", "value": "final",
            "relation": "comedia_romantica", "img": None},

        # ==== Escritores de Ciencia Ficción ====
        {"text": "Isaac Asimov", "emoji": "🤖", "value": "asimov_libros",
            "relation": "scifi_libros", "img": None},
        {"text": "Philip K. Dick", "emoji": "🧠", "value": "dick_libros",
            "relation": "scifi_libros", "img": None},
        {"text": "Ursula K. Le Guin", "emoji": "🌌", "value": "leguin_libros",
            "relation": "scifi_libros", "img": None},
        {"text": "Ray Bradbury", "emoji": "🔥", "value": "bradbury_libros",
            "relation": "scifi_libros", "img": None},

        # ==== Temática de Asimov ====
        {"text": "Robots y Inteligencia Artificial", "emoji": "🤖", "value": "final",
            "relation": "asimov_libros", "img": None},
        {"text": "Imperio Galáctico", "emoji": "🌟", "value": "final",
            "relation": "asimov_libros", "img": None},
        {"text": "Fundación", "emoji": "🏛️", "value": "final",
            "relation": "asimov_libros", "img": None},

        # ==== Temática de Philip K. Dick ====
        {"text": "Realidad Virtual", "emoji": "🕶️", "value": "final",
            "relation": "dick_libros", "img": None},
        {"text": "Distopías Futuristas", "emoji": "🏙️", "value": "final",
            "relation": "dick_libros", "img": None},
        {"text": "Identidad y Memoria", "emoji": "🧩", "value": "final",
            "relation": "dick_libros", "img": None},

        # ==== Longitud de Libros de Fantasía ====
        {"text": "Novela Corta (< 300 páginas)", "emoji": "📖",
         "value": "fantasia_corta", "relation": "fantasia_libros", "img": None},
        {"text": "Novela Media (300-500 páginas)", "emoji": "📚",
         "value": "fantasia_media", "relation": "fantasia_libros", "img": None},
        {"text": "Saga Épica (500+ páginas)", "emoji": "📜", "value": "fantasia_epica",
         "relation": "fantasia_libros", "img": None},

        # ==== Autores de Fantasía Épica ====
        {"text": "J.R.R. Tolkien", "emoji": "🧙‍♂️", "value": "final",
            "relation": "fantasia_epica", "img": None},
        {"text": "George R.R. Martin", "emoji": "🗡️", "value": "final",
            "relation": "fantasia_epica", "img": None},
        {"text": "Brandon Sanderson", "emoji": "⚔️", "value": "final",
            "relation": "fantasia_epica", "img": None},

        # ==== Duración de Series de Drama ====
        {"text": "Series Cortas (1-2 temporadas)", "emoji": "⏱️",
         "value": "drama_series_corta", "relation": "drama_series", "img": None},
        {"text": "Series Largas (3+ temporadas)", "emoji": "📺",
         "value": "drama_series_larga", "relation": "drama_series", "img": None},
        {"text": "Miniseries (episodios limitados)", "emoji": "🎬",
         "value": "drama_miniserie", "relation": "drama_series", "img": None},

        # ==== Protagonistas de Series de Drama Largas ====
        {"text": "Con Bryan Cranston", "emoji": "🧪", "value": "final",
            "relation": "drama_series_larga", "img":None},
        {"text": "Con Claire Foy", "emoji": "👑", "value": "final",
            "relation": "drama_series_larga", "img":None},
        {"text": "Con Kevin Spacey", "emoji": "🏛️", "value": "final",
            "relation": "drama_series_larga", "img":None},

        # ==== Estilo de Comedia en Series ====
        {"text": "Comedia de Oficina", "emoji": "💼", "value": "comedia_oficina",
            "relation": "comedia_series", "img": None},
        {"text": "Comedia Situacional", "emoji": "🏠",
            "value": "comedia_situacional", "relation": "comedia_series", "img": None},
        {"text": "Comedia Absurda", "emoji": "🤪", "value": "comedia_absurda",
            "relation": "comedia_series", "img": None},

        # ==== Protagonistas de Comedia de Oficina ====
        {"text": "Con Steve Carell", "emoji": "📎", "value": "final",
            "relation": "comedia_oficina", "img":None},
        {"text": "Con Ricky Gervais", "emoji": "😏", "value": "final",
            "relation": "comedia_oficina", "img":None},
        {"text": "Con Amy Poehler", "emoji": "🏛️", "value": "final",
            "relation": "comedia_oficina", "img":None},

        # ==== Temática de Documentales ====
        {"text": "Naturaleza", "emoji": "🌍", "value": "doc_naturaleza",
            "relation": "documental_series", "img": None},
        {"text": "Crimen Real", "emoji": "🔍", "value": "doc_crimen",
            "relation": "documental_series", "img": None},
        {"text": "Historia", "emoji": "🏛️", "value": "doc_historia",
            "relation": "documental_series", "img": None},
        {"text": "Ciencia", "emoji": "🔬", "value": "doc_ciencia",
            "relation": "documental_series", "img": None},

        # ==== Narradores de Documentales de Naturaleza ====
        {"text": "Narrado por David Attenborough", "emoji": "🎙️", "value": "final",
            "relation": "doc_naturaleza", "img": None},
        {"text": "Narrado por Morgan Freeman", "emoji": "🌟", "value": "final",
            "relation": "doc_naturaleza", "img": None},
        {"text": "Documental Nacional Geographic", "emoji": "📸", "value": "final",
            "relation": "doc_naturaleza", "img": None},
    ]

    created = []
    for card in default_cards:
        new_card = Card(**card)
        db.session.add(new_card)
        created.append(new_card)

    db.session.commit()
    return [c.serialize() for c in created]
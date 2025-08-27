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

        # ==== Géneros de Películas ====
        {"text": "Acción", "emoji": "💥", "value": "accion",
         "relation": "Peliculas", "img": None},
        {"text": "Drama", "emoji": "🎭", "value": "drama",
         "relation": "Peliculas", "img": None},
        {"text": "Comedia", "emoji": "😂", "value": "comedia",
         "relation": "Peliculas", "img": None},
        {"text": "Ciencia Ficción", "emoji": "🚀",
         "value": "scifi", "relation": "Peliculas", "img": None},
        {"text": "Terror", "emoji": "👻", "value": "terror",
         "relation": "Peliculas", "img": None},
        {"text": "Animación", "emoji": "🎨", "value": "animacion",
         "relation": "Peliculas", "img": None},

        # ==== Géneros de Libros ====
        {"text": "Ficción", "emoji": "📖", "value": "ficcion",
         "relation": "Libros", "img": None},
        {"text": "Ciencia Ficción", "emoji": "🛸",
         "value": "scifi", "relation": "Libros", "img": None},
        {"text": "Fantasía", "emoji": "🧙‍♂️", "value": "fantasia",
         "relation": "Libros", "img": None},
        {"text": "Misterio", "emoji": "🔍", "value": "misterio",
         "relation": "Libros", "img": None},
        {"text": "Romance", "emoji": "💕", "value": "romance",
         "relation": "Libros", "img": None},
        {"text": "No Ficción", "emoji": "📊", "value": "noficcion",
         "relation": "Libros", "img": None},

        # ==== Géneros de Series ====
        {"text": "Drama", "emoji": "🎭", "value": "drama",
         "relation": "Series", "img": None},
        {"text": "Comedia", "emoji": "😄", "value": "comedia",
         "relation": "Series", "img": None},
        {"text": "Acción", "emoji": "⚔️", "value": "accion",
         "relation": "Series", "img": None},
        {"text": "Ciencia Ficción", "emoji": "👽",
         "value": "scifi", "relation": "Series", "img": None},
        {"text": "Crimen/Thriller", "emoji": "🕵️",
         "value": "crimen", "relation": "Series", "img": None},
        {"text": "Documentales", "emoji": "🎥",
         "value": "documental", "relation": "Series", "img": None},

        # ==== Duración de Películas de Acción ====
        {"text": "Película Corta (< 90 min)", "emoji": "⏰", "value": "accion_corta",
         "relation": "accion", "img": None},
        {"text": "Duración Media (90-120 min)", "emoji": "🕐", "value": "accion_media",
         "relation": "accion", "img": None},
        {"text": "Película Larga (> 120 min)", "emoji": "⏳", "value": "accion_larga",
         "relation": "accion", "img": None},

        # ==== Actores de Películas de Acción Cortas ====
        {"text": "Con Tom Cruise", "emoji": "🎬", "value": "tom_cruise_accion_corta",
         "relation": "accion_corta", "img": None},
        {"text": "Con Jason Statham", "emoji": "💪", "value": "jason_statham_accion_corta",
         "relation": "accion_corta", "img": None},
        {"text": "Con Keanu Reeves", "emoji": "🕴️", "value": "keanu_reeves_accion_corta",
         "relation": "accion_corta", "img": None},

        # ==== Actores de Películas de Acción Media ====
        {"text": "Con Will Smith", "emoji": "😎", "value": "will_smith_accion_media",
         "relation": "accion_media", "img": None},
        {"text": "Con Dwayne Johnson", "emoji": "🗿", "value": "dwayne_johnson_accion_media",
         "relation": "accion_media", "img": None},
        {"text": "Con Chris Evans", "emoji": "🛡️", "value": "chris_evans_accion_media",
         "relation": "accion_media", "img": None},

        # ==== Directores de Películas de Acción Largas ====
        {"text": "Dirigida por Christopher Nolan", "emoji": "🧠", "value": "christopher_nolan_accion_larga",
         "relation": "accion_larga", "img": None},
        {"text": "Dirigida por Zack Snyder", "emoji": "🦸", "value": "zack_snyder_accion_larga",
         "relation": "accion_larga", "img": None},
        {"text": "Dirigida por Russo Brothers", "emoji": "👥", "value": "russo_brothers_accion_larga",
         "relation": "accion_larga", "img": None},

        # ==== Época de Dramas ====
        {"text": "Películas Clásicas (antes 1990)", "emoji": "🎞️",
         "value": "drama_clasico", "relation": "drama", "img": None},
        {"text": "Películas Modernas (1990-2010)", "emoji": "📼",
         "value": "drama_moderno", "relation": "drama", "img": None},
        {"text": "Películas Actuales (2010+)", "emoji": "🆕", "value": "drama_actual",
         "relation": "drama", "img": None},

        # ==== Actores de Drama Clásico ====
        {"text": "Con Marlon Brando", "emoji": "👑", "value": "marlon_brando_drama_clasico",
         "relation": "drama_clasico", "img": None},
        {"text": "Con Al Pacino", "emoji": "🕴️", "value": "al_pacino_drama_clasico",
         "relation": "drama_clasico", "img": None},
        {"text": "Con Robert De Niro", "emoji": "🎭", "value": "robert_deniro_drama_clasico",
         "relation": "drama_clasico", "img": None},

        # ==== Actores de Drama Moderno ====
        {"text": "Con Tom Hanks", "emoji": "🏃‍♂️", "value": "tom_hanks_drama_moderno",
         "relation": "drama_moderno", "img": None},
        {"text": "Con Leonardo DiCaprio", "emoji": "🌊", "value": "leonardo_dicaprio_drama_moderno",
         "relation": "drama_moderno", "img": None},
        {"text": "Con Russell Crowe", "emoji": "🏛️", "value": "russell_crowe_drama_moderno",
         "relation": "drama_moderno", "img": None},

        # ==== Actores de Drama Actual ====
        {"text": "Con Joaquin Phoenix", "emoji": "🃏", "value": "joaquin_phoenix_drama_actual",
         "relation": "drama_actual", "img": None},
        {"text": "Con Ryan Gosling", "emoji": "🌙", "value": "ryan_gosling_drama_actual",
         "relation": "drama_actual", "img": None},
        {"text": "Con Oscar Isaac", "emoji": "🎵", "value": "oscar_isaac_drama_actual",
         "relation": "drama_actual", "img": None},

        # ==== Tipo de Comedia ====
        {"text": "Comedia Romántica", "emoji": "💕", "value": "comedia_romantica",
         "relation": "comedia", "img": None},
        {"text": "Comedia de Acción", "emoji": "💥", "value": "comedia_accion",
         "relation": "comedia", "img": None},
        {"text": "Comedia Familiar", "emoji": "👨‍👩‍👧‍👦",
         "value": "comedia_familiar", "relation": "comedia", "img": None},

        # ==== Actores de Comedia Romántica ====
        {"text": "Con Ryan Reynolds", "emoji": "😏", "value": "ryan_reynolds_comedia_romantica",
         "relation": "comedia_romantica", "img": None},
        {"text": "Con Jennifer Aniston", "emoji": "💛", "value": "jennifer_aniston_comedia_romantica",
         "relation": "comedia_romantica", "img": None},
        {"text": "Con Hugh Grant", "emoji": "🇬🇧", "value": "hugh_grant_comedia_romantica",
         "relation": "comedia_romantica", "img": None},

        # ==== Escritores de Ciencia Ficción ====
        {"text": "Isaac Asimov", "emoji": "🤖", "value": "asimov",
         "relation": "scifi", "img": None},
        {"text": "Philip K. Dick", "emoji": "🧠", "value": "dick",
         "relation": "scifi", "img": None},
        {"text": "Ursula K. Le Guin", "emoji": "🌌", "value": "leguin",
         "relation": "scifi", "img": None},
        {"text": "Ray Bradbury", "emoji": "🔥", "value": "bradbury",
         "relation": "scifi", "img": None},

        # ==== Temática de Asimov ====
        {"text": "Robots y Inteligencia Artificial", "emoji": "🤖", "value": "asimov_robots",
         "relation": "asimov", "img": None},
        {"text": "Imperio Galáctico", "emoji": "🌟", "value": "asimov_imperio",
         "relation": "asimov", "img": None},
        {"text": "Fundación", "emoji": "🏛️", "value": "asimov_fundacion",
         "relation": "asimov", "img": None},

        # ==== Temática de Philip K. Dick ====
        {"text": "Realidad Virtual", "emoji": "🕶️", "value": "dick_realidad_virtual",
         "relation": "dick", "img": None},
        {"text": "Distopías Futuristas", "emoji": "🏙️", "value": "dick_distopias",
         "relation": "dick", "img": None},
        {"text": "Identidad y Memoria", "emoji": "🧩", "value": "dick_identidad",
         "relation": "dick", "img": None},

        # ==== Longitud de Libros de Fantasía ====
        {"text": "Novela Corta (< 300 páginas)", "emoji": "📖",
         "value": "fantasia_corta", "relation": "fantasia", "img": None},
        {"text": "Novela Media (300-500 páginas)", "emoji": "📚",
         "value": "fantasia_media", "relation": "fantasia", "img": None},
        {"text": "Saga Épica (500+ páginas)", "emoji": "📜", "value": "fantasia_epica",
         "relation": "fantasia", "img": None},

        # ==== Autores de Fantasía Épica ====
        {"text": "J.R.R. Tolkien", "emoji": "🧙‍♂️", "value": "tolkien_fantasia_epica",
         "relation": "fantasia_epica", "img": None},
        {"text": "George R.R. Martin", "emoji": "🗡️", "value": "martin_fantasia_epica",
         "relation": "fantasia_epica", "img": None},
        {"text": "Brandon Sanderson", "emoji": "⚔️", "value": "sanderson_fantasia_epica",
         "relation": "fantasia_epica", "img": None},

        # ==== Duración de Series de Drama ====
        {"text": "Series Cortas (1-2 temporadas)", "emoji": "⏱️",
         "value": "drama_series_corta", "relation": "drama", "img": None},
        {"text": "Series Largas (3+ temporadas)", "emoji": "📺",
         "value": "drama_series_larga", "relation": "drama", "img": None},
        {"text": "Miniseries (episodios limitados)", "emoji": "🎬",
         "value": "drama_miniserie", "relation": "drama", "img": None},

        # ==== Protagonistas de Series de Drama Largas ====
        {"text": "Con Bryan Cranston", "emoji": "🧪", "value": "bryan_cranston_drama_series_larga",
         "relation": "drama_series_larga", "img": None},
        {"text": "Con Claire Foy", "emoji": "👑", "value": "claire_foy_drama_series_larga",
         "relation": "drama_series_larga", "img": None},
        {"text": "Con Kevin Spacey", "emoji": "🏛️", "value": "kevin_spacey_drama_series_larga",
         "relation": "drama_series_larga", "img": None},

        # ==== Estilo de Comedia en Series ====
        {"text": "Comedia de Oficina", "emoji": "💼", "value": "comedia_oficina",
         "relation": "comedia", "img": None},
        {"text": "Comedia Situacional", "emoji": "🏠",
         "value": "comedia_situacional", "relation": "comedia", "img": None},
        {"text": "Comedia Absurda", "emoji": "🤪", "value": "comedia_absurda",
         "relation": "comedia", "img": None},

        # ==== Protagonistas de Comedia de Oficina ====
        {"text": "Con Steve Carell", "emoji": "📎", "value": "steve_carell_comedia_oficina",
         "relation": "comedia_oficina", "img": None},
        {"text": "Con Ricky Gervais", "emoji": "😏", "value": "ricky_gervais_comedia_oficina",
         "relation": "comedia_oficina", "img": None},
        {"text": "Con Amy Poehler", "emoji": "🏛️", "value": "amy_poehler_comedia_oficina",
         "relation": "comedia_oficina", "img": None},

        # ==== Temática de Documentales ====
        {"text": "Naturaleza", "emoji": "🌍", "value": "doc_naturaleza",
         "relation": "documental", "img": None},
        {"text": "Crimen Real", "emoji": "🔍", "value": "doc_crimen",
         "relation": "documental", "img": None},
        {"text": "Historia", "emoji": "🏛️", "value": "doc_historia",
         "relation": "documental", "img": None},
        {"text": "Ciencia", "emoji": "🔬", "value": "doc_ciencia",
         "relation": "documental", "img": None},

        # ==== Narradores de Documentales de Naturaleza ====
        {"text": "Narrado por David Attenborough", "emoji": "🎙️", "value": "attenborough_doc_naturaleza",
         "relation": "doc_naturaleza", "img": None},
        {"text": "Narrado por Morgan Freeman", "emoji": "🌟", "value": "freeman_doc_naturaleza",
         "relation": "doc_naturaleza", "img": None},
        {"text": "Documental National Geographic", "emoji": "📸", "value": "natgeo_doc_naturaleza",
         "relation": "doc_naturaleza", "img": None},
    ]

    created = []
    for card in default_cards:
        new_card = Card(**card)
        db.session.add(new_card)
        created.append(new_card)

    db.session.commit()
    return [c.serialize() for c in created]
import os
import json
#import openai

USE_AI = os.getenv("USE_AI", "false").lower() == "true"


if USE_AI:
    import openai
    openai.api_key = os.getenv("OPENAI_API_KEY")


PROMPTS = {
    "libros": """
Eres un experto en literatura.
El usuario busca recomendaciones de libros.
Sus preferencias: {preferences}.
Devuelve EXACTAMENTE 3 libros en JSON:

[
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }}
]
""",
    "peliculas": """
Eres un crítico de cine.
El usuario busca recomendaciones de películas.
Sus preferencias: {preferences}.
Devuelve EXACTAMENTE 3 películas en JSON:

[
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }}
]
""",
    "series": """
Eres un especialista en series de TV.
El usuario busca recomendaciones de series.
Sus preferencias: {preferences}.
Devuelve EXACTAMENTE 3 series en JSON:

[
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }},
  {{ "title": "", "description": "" }}
]
"""
}


def get_ai_recommendations(category, preferences):
    """Llama a OpenAI solo si USE_AI=True"""
    if not USE_AI:
        return generate_recommendations(category, preferences)  # usa mock
    
    prompt_template = PROMPTS.get(category)
    if not prompt_template:
        return {"category": category, "recommendations": []}

    prompt = prompt_template.format(preferences=preferences)

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=400,
        temperature=0.7
    )

    content = response["choices"][0]["message"]["content"]

    try:
        recommendations = json.loads(content)
    except json.JSONDecodeError:
        recommendations = [{"title": "Resultado AI", "description": content}]

    return {
        "category": category,
        "recommendations": recommendations
    }


def generate_recommendations(category, preferences):
    """Mock local para pruebas sin OpenAI"""
    mock_data = {
        "libros": [
            {"title": "Dune", "description": "Clásico de ciencia ficción."},
            {"title": "Fundación", "description": "De Isaac Asimov."},
            {"title": "El Hobbit", "description": "Aventura fantástica de Tolkien."}
        ],
        "peliculas": [
            {"title": "Inception", "description": "Viaje dentro de los sueños."},
            {"title": "Interestelar", "description": "Exploración espacial y tiempo."},
            {"title": "Matrix", "description": "Simulación y filosofía de la realidad."}
        ],
        "series": [
            {"title": "Dark", "description": "Viajes en el tiempo y misterio."},
            {"title": "Breaking Bad", "description": "Transformación de un profesor en criminal."},
            {"title": "The Expanse", "description": "Intriga política y ciencia ficción espacial."}
        ]
    }

    return {
        "category": category,
        "recommendations": mock_data.get(category, [])
    }

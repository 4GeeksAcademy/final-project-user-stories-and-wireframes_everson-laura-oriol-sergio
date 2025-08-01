import os
#import openai
import json

#openai.api_key = os.getenv("OPENAI_API_KEY")

def get_ai_recommendations(category, preferences):
    prompt = f"""
    El usuario busca recomendaciones de {category}.
    Sus preferencias: {preferences}.
    Devuelve exactamente 3 recomendaciones en formato JSON:
    [
      {{ "title": "", "description": "" }},
      {{ "title": "", "description": "" }},
      {{ "title": "", "description": "" }}
    ]
    """

    response = openai.ChatCompletion.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=300,
        temperature=0.7
    )

    content = response["choices"][0]["message"]["content"]

    try:
        recommendations = json.loads(content)
    except json.JSONDecodeError:
        # fallback si la IA no devuelve JSON correcto
        recommendations = [{"title": content, "description": ""}]

    return {
        "category": category,
        "recommendations": recommendations
    }


def generate_recommendations(category, preferences):
    """Devuelve mock, usado si no hay API Key"""
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

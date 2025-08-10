import os
import json
from dotenv import load_dotenv

load_dotenv()


client = None
try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    print("Cliente OpenAI inicializado correctamente.")
except Exception as e:
    print("Error al inicializar OpenAI:", e)

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
Eres un crítico de cine experto.
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
Eres un experto en series de TV.
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
    """Genera recomendaciones reales con OpenAI"""
    if not client:
        raise ValueError("OpenAI client no inicializado.")

    prompt = PROMPTS.get(category)
    if not prompt:
        return {"category": category, "recommendations": []}

    prompt = prompt.format(preferences=preferences)

    try:
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            max_tokens=300,
            temperature=0.7
        )

        content = response.choices[0].message.content.strip()
        try:
            recommendations = json.loads(content)
        except json.JSONDecodeError:
            recommendations = [{"title": "Respuesta inválida", "description": content}]

        return {
            "category": category,
            "recommendations": recommendations
        }

    except Exception as e:
        return {
            "category": category,
            "recommendations": [{"title": "Error con OpenAI", "description": str(e)}]
        }

def generate_recommendations(category, preferences):
    """Recomendaciones mock"""
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

import os
import re
import json
from dotenv import load_dotenv

load_dotenv()

try:
    from openai import OpenAI
    client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
    print("Cliente OpenAI inicializado correctamente.")
except Exception as e:
    print("Error al inicializar OpenAI:", e)
    client = None

PROMPTS = {
    "libros": """
Eres un asistente experto en literatura.
El usuario busca recomendaciones de libros.
Sus preferencias: {preferences}.

  INSTRUCCIONES:
- RESPONDE ÚNICAMENTE con un objeto JSON válido.
- NO escribas texto antes o después del JSON.
- NO incluyas explicaciones, comentarios ni frases adicionales.
- Asegúrate de que la sintaxis sea correcta y que pueda ser parseada con JSON.parse o json.loads.

Ejemplo de formato EXACTO:

{{
  "category": "libros",
  "recommendations": [
    {{ "title": "Título 1", "description": "Descripción 1" }},
    {{ "title": "Título 2", "description": "Descripción 2" }},
    {{ "title": "Título 3", "description": "Descripción 3" }}
  ]
}}
""",
    "peliculas": """
Eres un crítico de cine experto.
El usuario busca recomendaciones de películas.
Sus preferencias: {preferences}.

 INSTRUCCIONES:
- RESPONDE ÚNICAMENTE con un objeto JSON válido.
- NO escribas texto antes o después del JSON.
- NO incluyas explicaciones, comentarios ni frases adicionales.
- Asegúrate de que la sintaxis sea correcta y que pueda ser parseada con JSON.parse o json.loads.

Ejemplo de formato EXACTO:

{{
  "category": "peliculas",
  "recommendations": [
    {{ "title": "Título 1", "description": "Descripción 1" }},
    {{ "title": "Título 2", "description": "Descripción 2" }},
    {{ "title": "Título 3", "description": "Descripción 3" }}
  ]
}}
""",
    "series": """
Eres un experto en series de televisión.
El usuario busca recomendaciones de series.
Sus preferencias: {preferences}.

  INSTRUCCIONES:
- RESPONDE ÚNICAMENTE con un objeto JSON válido.
- NO escribas texto antes o después del JSON.
- NO incluyas explicaciones, comentarios ni frases adicionales.
- Asegúrate de que la sintaxis sea correcta y que pueda ser parseada con JSON.parse o json.loads.

Ejemplo de formato EXACTO:

{{
  "category": "series",
  "recommendations": [
    {{ "title": "Título 1", "description": "Descripción 1" }},
    {{ "title": "Título 2", "description": "Descripción 2" }},
    {{ "title": "Título 3", "description": "Descripción 3" }}
  ]
}}
"""
}

def extract_json(text):
    """
    Extrae el primer bloque JSON válido de un texto usando regex.
    Retorna None si no encuentra un bloque.
    """
    match = re.search(r'\{[\s\S]*\}', text)
    if match:
        return match.group(0)
    return None

def get_ai_recommendations(category, preferences):
    """Intenta generar recomendaciones con OpenAI y limpia la respuesta para asegurar formato JSON"""
    if not client:
        raise RuntimeError("Cliente OpenAI no inicializado.")

    prompt = PROMPTS.get(category)
    if not prompt:
        return {"category": category, "recommendations": []}

    prompt = prompt.format(preferences=preferences)

    response = client.chat.completions.create(
        model="gpt-3.5-turbo",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=400,
        temperature=0.7
    )

    content = response.choices[0].message.content.strip()

    
    json_str = extract_json(content)
    if not json_str:
        return {
            "category": category,
            "recommendations": [
                {"title": "Respuesta inválida", "description": content}
            ]
        }

    try:
        parsed = json.loads(json_str)
        # Validar que tenga la estructura esperada
        if "category" in parsed and "recommendations" in parsed:
            return parsed
        else:
            return {
                "category": category,
                "recommendations": [
                    {"title": "Formato inesperado", "description": content}
                ]
            }
    except json.JSONDecodeError:
        return {
            "category": category,
            "recommendations": [
                {"title": "Respuesta inválida", "description": content}
            ]
        }

def generate_recommendations(category, preferences):
    """Genera recomendaciones mock"""
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

def get_recommendations(category, preferences):
    """Usa AI si es posible, si falla usa mock"""
    try:
        return get_ai_recommendations(category, preferences)
    except Exception as e:
        print(f" AI falló, usando mock: {e}")
        return generate_recommendations(category, preferences)

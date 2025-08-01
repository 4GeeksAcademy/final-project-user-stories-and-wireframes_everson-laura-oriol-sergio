def get_mock_recommendations(category, preferences):
    return {
        "category": category,
        "preferences": preferences,
        "results": [
            f"Recomendación 1 para {category}",
            f"Recomendación 2 para {category}"
        ]
    }
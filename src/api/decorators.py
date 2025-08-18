# decorators.py
from functools import wraps
from flask import request, jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.models import User

def admin_required(fn):
    @wraps(fn)
    def wrapper(*args, **kwargs):
        if request.method == "OPTIONS":
            return jsonify({"msg": "Preflight OK"}), 200

        @jwt_required()
        @wraps(fn)
        def protected(*args, **kwargs):
            uid = int(get_jwt_identity())
            user = User.query.get(uid)
            if not user:
                return jsonify({"msg": "Usuario no encontrado"}), 401
            if not user.is_admin:
                return jsonify({"msg": "Acceso solo para administradores"}), 403
            return fn(*args, **kwargs)

        return protected(*args, **kwargs)

    return wrapper

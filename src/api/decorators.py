from functools import wraps
from flask import jsonify
from flask_jwt_extended import get_jwt_identity, jwt_required
from api.models import User

def admin_required(fn):
    @wraps(fn)
    @jwt_required()
    def wrapper(*args, **kwargs):
        user_id = get_jwt_identity()
        user = User.query.get(user_id)

        if not user or not user.is_admin:
            return jsonify({"msg": "Admin access required"}), 403

        return fn(*args, **kwargs)
    return wrapper

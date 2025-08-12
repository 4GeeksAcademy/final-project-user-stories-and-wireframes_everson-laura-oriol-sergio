import os
from datetime import timedelta
from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from itsdangerous import URLSafeTimedSerializer, SignatureExpired, BadSignature
from api.models import db, User
from flask_jwt_extended import create_access_token
from api.mail import send_reset_email, generate_reset_token

JWT_EXPIRE_DAYS = int(os.getenv("JWT_EXPIRE_DAYS", 1))


def register_user():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Missing email or password"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        name=data.get("name"),
        email=data["email"],
        username=data.get("username"),
        password=generate_password_hash(data["password"]),
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201


def login_user():
    data = request.get_json()
    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=data.get("email")).first()

    if not user or not user.password or not check_password_hash(user.password, data.get("password")):
        return jsonify({"msg": "Bad credentials"}), 401

    token = create_access_token(
        identity=user.id, expires_delta=timedelta(days=JWT_EXPIRE_DAYS)
    )

    return jsonify({"token": token, "user": user.serialize()}), 200


def forgot_password():
    data = request.get_json()
    if not data or not data.get("email"):
        return jsonify({"msg": "Missing email"}), 400

    user = User.query.filter_by(email=data["email"]).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    token = generate_reset_token(user.email)
    send_reset_email(user.email, token)

    return jsonify({"msg": "Password reset email sent"}), 200


def reset_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("password")

    if not token or not new_password:
        return jsonify({"msg": "Missing token or password"}), 400

    serializer = URLSafeTimedSerializer(
        os.getenv('SECRET_KEY', "default_secret_key")
    )
    try:
        email = serializer.loads(
            token, salt="password-reset-salt", max_age=3600  
        )
    except SignatureExpired:
        return jsonify({"msg": "Token expired"}), 400
    except BadSignature:
        return jsonify({"msg": "Invalid token"}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"msg": "Password updated successfully"}), 200

from flask import request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from api.models import db, User
from flask_jwt_extended import create_access_token
from datetime import timedelta
from api.mail import send_reset_email
import uuid


def register_user():
    data = request.get_json()
    if not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Missing email or password"}), 400

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"msg": "User already exists"}), 400

    new_user = User(
        email=data["email"],
        password=generate_password_hash(data["password"]),
        is_active=True
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201


def login_user():
    data = request.get_json()
    print("Login payload:", data)

    if not data or not data.get("email") or not data.get("password"):
        return jsonify({"msg": "Missing email or password"}), 400

    user = User.query.filter_by(email=data.get("email")).first()

    if not user or not user.password or not check_password_hash(user.password, data.get("password")):
        return jsonify({"msg": "Bad credentials"}), 401

    token = create_access_token(
        identity=user.id, expires_delta=timedelta(days=1))
    return jsonify({"token": token, "user": user.serialize()}), 200


def forgot_password():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()
    if not user:
        return jsonify({"msg": "User not found"}), 404

    token = str(uuid.uuid4())
    user.reset_token = token
    db.session.commit()
    send_reset_email(user.email, token)
    return jsonify({"msg": "Password reset email sent"}), 200


def reset_password():
    data = request.get_json()
    token = data.get("token")
    new_password = data.get("password")

    user = User.query.filter_by(reset_token=token).first()

    if not new_password:
        return jsonify({"msg": "Missing new password"}), 400

    if not user:
        return jsonify({"msg": "Invalid or expired token"}), 400

    user.password = generate_password_hash(new_password)
    user.reset_token = None
    db.session.commit()
    return jsonify({"msg": "Password updated successfully"}), 200

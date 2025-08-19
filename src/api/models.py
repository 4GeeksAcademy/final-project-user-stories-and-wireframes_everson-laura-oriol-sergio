from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import String, Boolean
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy.dialects.postgresql import ARRAY
from datetime import datetime

db = SQLAlchemy()

class User(db.Model):
    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(120), nullable=False)
    email: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    username: Mapped[str] = mapped_column(String(120), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean(), nullable=False)
    is_admin: Mapped[bool] = mapped_column(Boolean(), default=False, nullable=False)

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name": self.name,
            "username": self.username,
            "is_admin": self.is_admin,
            "is_active": self.is_active
        }

class Card(db.Model):
    __tablename__ = 'cards'
    id = db.Column(db.Integer, primary_key=True)
    text = db.Column(db.String(255), nullable=False)
    emoji = db.Column(db.String(10), nullable=True)
    value = db.Column(db.String(50), nullable=False)
    relation = db.Column(db.String(50), nullable=False)
    img = db.Column(db.String(500), nullable=True)

    def serialize(self):
        return {
            "id": self.id,
            "text": self.text,
            "emoji": self.emoji,
            "value": self.value,
            "relation": self.relation,
            "img": self.img
        }


class UserRecommendation(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    category = db.Column(db.String(50), nullable=False)
    preferences = db.Column(ARRAY(db.String), nullable=False)
    recommendations = db.Column(ARRAY(db.String), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "preferences": self.preferences,
            "recommendations": self.recommendations,
            "created_at": self.created_at.isoformat()
        }
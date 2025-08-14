from flask_mail import Message, Mail
from flask import current_app
from itsdangerous import URLSafeTimedSerializer
import os

mail = Mail()  

def generate_reset_token(email):
    serializer = URLSafeTimedSerializer(current_app.config['SECRET_KEY'])
    return serializer.dumps(email, salt="password-reset-salt")

def send_reset_email(to_email, token):
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    reset_url = f"{frontend_url}/reset-password/{token}"

    msg = Message(
        subject="Recuperación de contraseña",
        recipients=[to_email],
        html=f"""
            <p>Hola,</p>
            <p>Has solicitado restablecer tu contraseña. Haz clic en el enlace de abajo para continuar:</p>
            <p><a href="{reset_url}">{reset_url}</a></p>
            <p>Si no solicitaste este cambio, ignora este mensaje.</p>
        """
    )

    try:
        mail.send(msg)
        print(f"Correo enviado correctamente a {to_email}")
    except Exception as e:
        print(f"Error enviando correo: {e}")

import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_reset_email(to_email, token):
    frontend_url = os.getenv("FRONTEND_URL", "http://localhost:3000")
    reset_url = f"{frontend_url}/reset-password/{token}"
    
    message = Mail(
        from_email=os.getenv("EMAIL_SENDER", "proyectswireframes@gmail.com"),
        to_emails=to_email,
        subject='Password Reset Request',
        html_content=f"<p>Haz click aquí para restablecer tu contraseña: <a href='{reset_url}'>{reset_url}</a></p>"
    )
    try:
        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        sg.send(message)
        print(f"Email de reseteo enviado a {to_email}")
    except Exception as e:
        print(f"Error enviando email: {e}")

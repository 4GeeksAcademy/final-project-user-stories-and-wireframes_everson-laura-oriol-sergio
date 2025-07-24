import os
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

def send_reset_email(to_email, token):
    reset_url = f"https://yourfrontend.com/reset-password/{token}"
    message = Mail(
        from_email=os.getenv("EMAIL_SENDER", "proyectswireframes@gmail.com"),
        to_emails=to_email,
        subject='Password Reset Request',
        html_content=f"<p>Click to reset: <a href='{reset_url}'>{reset_url}</a></p>"
    )
    try:
        sg = SendGridAPIClient(os.getenv("SENDGRID_API_KEY"))
        sg.send(message)
    except Exception as e:
        print(e)

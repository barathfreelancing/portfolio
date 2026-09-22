from dotenv import load_dotenv
import os
import os
import re
import smtplib
import logging
from email.message import EmailMessage

load_dotenv()
logger = logging.getLogger("email_service")


class EmailConfigurationError(Exception):
    """Raised when required email environment variables are missing."""
    pass


class EmailSendError(Exception):
    """Raised when email delivery via SMTP fails."""
    pass


def sanitize_header_value(val: str) -> str:
    """Strip newlines to prevent email header injection attacks."""
    if not val:
        return ""
    return re.sub(r"[\r\n]", " ", val).strip()


def send_enquiry_email(name: str, visitor_email: str, project_type: str, message: str) -> None:
    """
    Sends an enquiry email to the portfolio owner using configured SMTP settings.
    """
    contact_email = os.getenv("CONTACT_EMAIL", "barathfreelancing@gmail.com").strip()
    email_host = os.getenv("EMAIL_HOST", "").strip()
    email_port_str = os.getenv("EMAIL_PORT", "587").strip()
    email_username = os.getenv("EMAIL_USERNAME", "").strip()
    email_password = os.getenv("EMAIL_PASSWORD", "").strip()
    email_from = os.getenv("EMAIL_FROM", "").strip() or email_username or contact_email

    if not email_host or not email_username or not email_password:
        logger.error("Email service requested but SMTP credentials (EMAIL_HOST, EMAIL_USERNAME, EMAIL_PASSWORD) are not set.")
        raise EmailConfigurationError(
            "Email service is not configured on the server. Please configure SMTP environment variables."
        )

    try:
        email_port = int(email_port_str)
    except ValueError:
        email_port = 587

    clean_name = sanitize_header_value(name)
    clean_visitor_email = sanitize_header_value(visitor_email)
    clean_project_type = sanitize_header_value(project_type)

    msg = EmailMessage()
    msg["Subject"] = f"New Portfolio Enquiry — {clean_project_type}"
    msg["From"] = email_from
    msg["To"] = contact_email
    msg["Reply-To"] = clean_visitor_email

    body_content = (
        "New enquiry received from your portfolio.\n\n"
        f"Name:\n{clean_name}\n\n"
        f"Email:\n{clean_visitor_email}\n\n"
        f"Project Type:\n{clean_project_type}\n\n"
        f"Message:\n{message.strip()}\n"
    )
    msg.set_content(body_content)

    use_ssl = email_port == 465 or os.getenv("EMAIL_USE_SSL", "false").lower() == "true"

    try:
        if use_ssl:
            with smtplib.SMTP_SSL(email_host, email_port, timeout=15) as server:
                if email_username and email_password:
                    server.login(email_username, email_password)
                server.send_message(msg)
        else:
            with smtplib.SMTP(email_host, email_port, timeout=15) as server:
                server.ehlo()
                if server.has_extn("STARTTLS"):
                    server.starttls()
                    server.ehlo()
                if email_username and email_password:
                    server.login(email_username, email_password)
                server.send_message(msg)
        logger.info("Enquiry email successfully sent for %s", clean_visitor_email)
    except Exception as exc:
        logger.error("Failed to send enquiry email: %s", str(exc))
        raise EmailSendError("Failed to deliver email. Please check server SMTP configuration.") from exc

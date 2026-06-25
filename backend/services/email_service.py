import smtplib
import logging
from email.mime.multipart import MIMEMultipart
from email.mime.text import MIMEText

from config import get_settings

logger = logging.getLogger(__name__)
settings = get_settings()


def _build_admin_html(name: str, email: str, organization: str | None, subject: str, message: str) -> str:
    org_row = f"""
      <tr>
        <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;width:130px;vertical-align:top;">Organization</td>
        <td style="padding:8px 0;color:#F0F0F0;font-size:14px;">{organization}</td>
      </tr>
    """ if organization else ""

    return f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0F0D;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0F0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-radius:12px 12px 0 0;padding:28px 36px;">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#00FF87;letter-spacing:2px;text-transform:uppercase;">bainiac.me · New Message</p>
            <h1 style="margin:10px 0 0;font-size:20px;color:#F0F0F0;font-weight:600;">{subject}</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0D1610;border-left:1px solid #1E2E22;border-right:1px solid #1E2E22;padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #1E2E22;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;width:130px;vertical-align:top;">From</td>
                <td style="padding:8px 0;color:#F0F0F0;font-size:14px;font-weight:600;">{name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;vertical-align:top;">Email</td>
                <td style="padding:8px 0;font-size:14px;">
                  <a href="mailto:{email}" style="color:#0066FF;text-decoration:none;">{email}</a>
                </td>
              </tr>
              {org_row}
            </table>

            <p style="margin:0 0 8px;color:#6B7B72;font-size:11px;font-family:monospace;letter-spacing:1px;text-transform:uppercase;">Message</p>
            <div style="background:#111A14;border:1px solid #1E2E22;border-radius:8px;padding:20px 24px;">
              <p style="margin:0;color:#F0F0F0;font-size:14px;line-height:1.7;white-space:pre-wrap;">{message}</p>
            </div>

            <div style="margin-top:28px;">
              <a href="mailto:{email}?subject=Re: {subject}"
                 style="display:inline-block;background:#00FF87;color:#0A0F0D;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;font-family:monospace;">
                Reply to {name}
              </a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">
            <p style="margin:0;font-size:12px;color:#6B7B72;font-family:monospace;">
              Submitted via <a href="https://www.bainiac.me" style="color:#00FF87;text-decoration:none;">bain.me</a>
              &nbsp;·&nbsp; Reply-To is set to the sender's email
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""


def _build_autoreply_html(name: str, subject: str) -> str:
    return f"""
<!DOCTYPE html>
<html lang="en">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0F0D;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0F0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

        <!-- Header -->
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-radius:12px 12px 0 0;padding:28px 36px;">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#00FF87;letter-spacing:2px;text-transform:uppercase;">Emmanuel Bain Oduwo</p>
            <h1 style="margin:10px 0 0;font-size:20px;color:#F0F0F0;font-weight:600;">Got your message.</h1>
          </td>
        </tr>

        <!-- Body -->
        <tr>
          <td style="background:#0D1610;border-left:1px solid #1E2E22;border-right:1px solid #1E2E22;padding:36px;">
            <p style="margin:0 0 16px;color:#F0F0F0;font-size:15px;line-height:1.7;">Hi {name},</p>
            <p style="margin:0 0 16px;color:#6B7B72;font-size:14px;line-height:1.7;">
              Thanks for reaching out. I received your message about
              <span style="color:#F0F0F0;font-weight:500;">"{subject}"</span>
              and I'll get back to you within 48 hours.
            </p>
            <p style="margin:0 0 32px;color:#6B7B72;font-size:14px;line-height:1.7;">
              If your message is urgent, you can reach me directly at
              <a href="mailto:emmanuelbain@kemirix.com" style="color:#00FF87;text-decoration:none;">emmanuelbain@kemirix.com</a>.
            </p>

            <div style="border-top:1px solid #1E2E22;padding-top:28px;">
              <p style="margin:0 0 4px;color:#F0F0F0;font-size:14px;font-weight:600;">Emmanuel Bain Oduwo</p>
              <p style="margin:0 0 2px;color:#6B7B72;font-size:13px;">B.Pharm Student · AI Engineer</p>
              <p style="margin:0 0 12px;color:#6B7B72;font-size:13px;">Co-Founder, Kemirix Health Technologies</p>
              <a href="https://www.bainiac.me" style="color:#00FF87;font-size:13px;text-decoration:none;font-family:monospace;">www.bainiac.me</a>
            </div>
          </td>
        </tr>

        <!-- Footer -->
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">
            <p style="margin:0;font-size:12px;color:#6B7B72;font-family:monospace;">
              You're receiving this because you submitted a message at
              <a href="https://www.bainiac.me" style="color:#00FF87;text-decoration:none;">bain.me</a>
            </p>
          </td>
        </tr>

      </table>
    </td></tr>
  </table>
</body>
</html>
"""


def send_contact_emails(
    name: str,
    email: str,
    organization: str | None,
    subject: str,
    message: str,
) -> None:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP credentials not configured — skipping email send")
        return

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
            server.ehlo()
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)

            # 1 — Admin notification
            admin_msg = MIMEMultipart("alternative")
            admin_msg["Subject"] = f"[bainiac.me] New message from {name}: {subject}"
            admin_msg["From"] = f"{settings.from_name} <{settings.from_email}>"
            admin_msg["To"] = settings.contact_email
            admin_msg["Reply-To"] = f"{name} <{email}>"
            admin_msg.attach(MIMEText(_build_admin_html(name, email, organization, subject, message), "html"))
            server.sendmail(settings.smtp_user, settings.contact_email, admin_msg.as_string())
            logger.info("Admin notification sent to %s", settings.contact_email)

            # 2 — Auto-reply to sender
            reply_msg = MIMEMultipart("alternative")
            reply_msg["Subject"] = f"Re: {subject} — Emmanuel Bain Oduwo"
            reply_msg["From"] = f"Emmanuel Bain Oduwo <{settings.from_email}>"
            reply_msg["To"] = email
            reply_msg.attach(MIMEText(_build_autoreply_html(name, subject), "html"))
            server.sendmail(settings.smtp_user, email, reply_msg.as_string())
            logger.info("Auto-reply sent to %s", email)

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check SMTP_USER and SMTP_PASSWORD")
    except smtplib.SMTPException as exc:
        logger.error("SMTP error: %s", exc)
    except Exception as exc:
        logger.error("Unexpected error sending email: %s", exc)

def _build_booking_admin_html(
    name: str, email: str, organization: str | None,
    service: str, preferred_date: str | None, preferred_time: str | None,
    timezone: str | None, notes: str | None,
) -> str:
    org_row = f"""<tr>
        <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;width:150px;vertical-align:top;">Organization</td>
        <td style="padding:8px 0;color:#F0F0F0;font-size:14px;">{organization}</td>
      </tr>""" if organization else ""
    date_row = f"""<tr>
        <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;vertical-align:top;">Preferred Date</td>
        <td style="padding:8px 0;color:#F0F0F0;font-size:14px;">{preferred_date}</td>
      </tr>""" if preferred_date else ""
    time_row = f"""<tr>
        <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;vertical-align:top;">Preferred Time</td>
        <td style="padding:8px 0;color:#F0F0F0;font-size:14px;">{preferred_time}{(' (' + timezone + ')') if timezone else ''}</td>
      </tr>""" if preferred_time else ""
    notes_block = f"""
            <p style="margin:24px 0 8px;color:#6B7B72;font-size:11px;font-family:monospace;letter-spacing:1px;text-transform:uppercase;">Additional Notes</p>
            <div style="background:#111A14;border:1px solid #1E2E22;border-radius:8px;padding:20px 24px;">
              <p style="margin:0;color:#F0F0F0;font-size:14px;line-height:1.7;white-space:pre-wrap;">{notes}</p>
            </div>""" if notes else ""

    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0F0D;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0F0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-radius:12px 12px 0 0;padding:28px 36px;">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#00FF87;letter-spacing:2px;text-transform:uppercase;">bainiac.me · New Booking Request</p>
            <h1 style="margin:10px 0 0;font-size:20px;color:#F0F0F0;font-weight:600;">{service}</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#0D1610;border-left:1px solid #1E2E22;border-right:1px solid #1E2E22;padding:32px 36px;">
            <table width="100%" cellpadding="0" cellspacing="0" style="border-bottom:1px solid #1E2E22;margin-bottom:24px;">
              <tr>
                <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;width:150px;vertical-align:top;">From</td>
                <td style="padding:8px 0;color:#F0F0F0;font-size:14px;font-weight:600;">{name}</td>
              </tr>
              <tr>
                <td style="padding:8px 0;color:#6B7B72;font-size:13px;font-family:monospace;vertical-align:top;">Email</td>
                <td style="padding:8px 0;font-size:14px;"><a href="mailto:{email}" style="color:#0066FF;text-decoration:none;">{email}</a></td>
              </tr>
              {org_row}{date_row}{time_row}
            </table>
            {notes_block}
            <div style="margin-top:28px;">
              <a href="mailto:{email}?subject=Re: Discovery Call — {service}"
                 style="display:inline-block;background:#00FF87;color:#0A0F0D;padding:12px 24px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;font-family:monospace;">
                Reply to {name}
              </a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">
            <p style="margin:0;font-size:12px;color:#6B7B72;font-family:monospace;">Submitted via <a href="https://www.bainiac.me/services" style="color:#00FF87;text-decoration:none;">bain.me/services</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def _build_booking_autoreply_html(name: str, service: str) -> str:
    return f"""<!DOCTYPE html>
<html lang="en"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#0A0F0D;font-family:'Inter',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0A0F0D;padding:40px 20px;">
    <tr><td align="center">
      <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-radius:12px 12px 0 0;padding:28px 36px;">
            <p style="margin:0;font-family:monospace;font-size:11px;color:#00FF87;letter-spacing:2px;text-transform:uppercase;">Emmanuel Bain Oduwo</p>
            <h1 style="margin:10px 0 0;font-size:20px;color:#F0F0F0;font-weight:600;">Booking request received.</h1>
          </td>
        </tr>
        <tr>
          <td style="background:#0D1610;border-left:1px solid #1E2E22;border-right:1px solid #1E2E22;padding:36px;">
            <p style="margin:0 0 16px;color:#F0F0F0;font-size:15px;line-height:1.7;">Hi {name},</p>
            <p style="margin:0 0 16px;color:#6B7B72;font-size:14px;line-height:1.7;">
              Thanks for your interest in <span style="color:#F0F0F0;font-weight:500;">{service}</span>.
              I've received your booking request and will confirm a time with you within 24–48 hours.
            </p>
            <p style="margin:0 0 32px;color:#6B7B72;font-size:14px;line-height:1.7;">
              If this is urgent, email me directly at
              <a href="mailto:emmanuelbain@kemirix.com" style="color:#00FF87;text-decoration:none;">emmanuelbain@kemirix.com</a>.
            </p>
            <div style="border-top:1px solid #1E2E22;padding-top:28px;">
              <p style="margin:0 0 4px;color:#F0F0F0;font-size:14px;font-weight:600;">Emmanuel Bain Oduwo</p>
              <p style="margin:0 0 2px;color:#6B7B72;font-size:13px;">B.Pharm Student · AI Engineer</p>
              <p style="margin:0 0 12px;color:#6B7B72;font-size:13px;">Co-Founder, Kemirix Health Technologies</p>
              <a href="https://www.bainiac.me/services" style="color:#00FF87;font-size:13px;text-decoration:none;font-family:monospace;">bain.me/services</a>
            </div>
          </td>
        </tr>
        <tr>
          <td style="background:#111A14;border:1px solid #1E2E22;border-top:none;border-radius:0 0 12px 12px;padding:20px 36px;">
            <p style="margin:0;font-size:12px;color:#6B7B72;font-family:monospace;">You're receiving this because you submitted a booking request at <a href="https://www.bainiac.me" style="color:#00FF87;text-decoration:none;">bain.me</a></p>
          </td>
        </tr>
      </table>
    </td></tr>
  </table>
</body></html>"""


def send_booking_emails(
    name: str,
    email: str,
    organization: str | None,
    service: str,
    preferred_date: str | None,
    preferred_time: str | None,
    timezone: str | None,
    notes: str | None,
) -> None:
    if not settings.smtp_user or not settings.smtp_password:
        logger.warning("SMTP credentials not configured — skipping booking email send")
        return

    try:
        with smtplib.SMTP(settings.smtp_host, settings.smtp_port, timeout=15) as server:
            server.ehlo()
            server.starttls()
            server.login(settings.smtp_user, settings.smtp_password)

            admin_msg = MIMEMultipart("alternative")
            admin_msg["Subject"] = f"[bainiac.me] Booking request from {name}: {service}"
            admin_msg["From"] = f"{settings.from_name} <{settings.from_email}>"
            admin_msg["To"] = settings.contact_email
            admin_msg["Reply-To"] = f"{name} <{email}>"
            admin_msg.attach(MIMEText(
                _build_booking_admin_html(name, email, organization, service, preferred_date, preferred_time, timezone, notes),
                "html",
            ))
            server.sendmail(settings.smtp_user, settings.contact_email, admin_msg.as_string())
            logger.info("Booking admin notification sent to %s", settings.contact_email)

            reply_msg = MIMEMultipart("alternative")
            reply_msg["Subject"] = f"Booking Request Received — {service}"
            reply_msg["From"] = f"Emmanuel Bain Oduwo <{settings.from_email}>"
            reply_msg["To"] = email
            reply_msg.attach(MIMEText(_build_booking_autoreply_html(name, service), "html"))
            server.sendmail(settings.smtp_user, email, reply_msg.as_string())
            logger.info("Booking auto-reply sent to %s", email)

    except smtplib.SMTPAuthenticationError:
        logger.error("SMTP authentication failed — check SMTP_USER and SMTP_PASSWORD")
    except smtplib.SMTPException as exc:
        logger.error("SMTP error sending booking email: %s", exc)
    except Exception as exc:
        logger.error("Unexpected error sending booking email: %s", exc)

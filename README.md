# Emmanuel Bain Oduwo — Portfolio & Services

Live at **[www.bainiac.me](https://www.bainiac.me)** · Services at **[www.bainiac.me/services](https://www.bainiac.me/services)**

I'm a pharmacy student and AI engineer building clinical AI systems, medication safety tools, and healthcare datasets. This repo powers my portfolio website and services platform — where investors, recruiters, hospitals, pharma companies, and research institutions can find my work, explore what I offer, and book a call or send a message directly.

---

## What's in this repo

```
bain_portfolio/
├── frontend/    Next.js 14 app — portfolio + services site
└── backend/     FastAPI — contact form, booking system, email delivery, PostgreSQL
```

The frontend lives on **Vercel**. The backend lives on **Railway**. They communicate in real time — messages and booking requests are stored in PostgreSQL and delivered to my inbox at `emmanuelbain@kemirix.com`.

---

## Pages

| Page | URL | Purpose |
|------|-----|---------|
| Portfolio | `/` | Projects, experience, skills, datasets, contact |
| Services | `/services` | Service offerings + discovery call booking form |

---

## Services Offered

The `/services` page covers six areas:

- **Clinical AI Development** — drug interaction APIs, contraindication screening, RAG-powered clinical assistants, LLM fine-tuning
- **Healthcare Data Engineering** — pharmacovigilance datasets, DDI databases, MedDRA/ICH E2B compliance, Hugging Face/Kaggle publishing
- **Medication Safety Consulting** — drug interaction workflows, ADR reporting frameworks, pharmacovigilance system design
- **AI/ML Model Development** — clinical ML models, LLM fine-tuning on Google Cloud TPU, PEFT/LoRA pipelines, MLOps
- **Healthcare Software Development** — FastAPI backends, Next.js clinical web apps, PostgreSQL architecture, REST APIs
- **AI & Data Science Training** — Python/ML/data science programs for healthcare professionals and students

Visitors can fill out a booking form on `/services` to request a discovery call — selecting a service, preferred date/time, and describing their project. The booking is saved to the database and Emmanuel is notified by email immediately.

---

## How the backend works

### Contact form (`POST /api/contact`)

Someone fills out the form on the homepage → frontend POSTs to the Railway backend → backend:

1. Saves the message to PostgreSQL (`contact_submissions` table)
2. Sends a notification email to `emmanuelbain@kemirix.com` with all details and a one-click reply button
3. Sends a professional auto-reply to the sender

### Booking system (`POST /api/booking`)

Someone fills out the booking form on `/services` → frontend POSTs to backend → backend:

1. Saves the booking to PostgreSQL (`booking_requests` table) — includes service, preferred date/time, timezone, notes
2. Sends a booking notification to `emmanuelbain@kemirix.com` with full details
3. Sends a confirmation auto-reply to the person who booked

Both contact and booking emails are styled HTML matching the site's dark design.

---

## Running it locally

### Frontend

```bash
cd frontend
npm install
npm run dev
```

Opens at `http://localhost:3000`.

### Backend

```bash
cd backend
python -m venv venv

# Mac / Linux
source venv/bin/activate

# Windows
venv\Scripts\activate

pip install -r requirements.txt
cp .env.example .env   # fill in your values
uvicorn main:app --reload
```

Opens at `http://localhost:8000`. Interactive API docs at `/docs`.

---

## Deploying

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) and import this repo
2. Set **Root Directory** to `frontend`
3. Vercel picks up Next.js automatically
4. Add your custom domain (`www.bainiac.me`) in project settings

**Environment variable to set in Vercel:**

| Key | Value |
|-----|-------|
| `NEXT_PUBLIC_API_URL` | Your Railway backend URL (e.g. `https://bain-api.up.railway.app`) |

### Backend → Railway

1. Go to [railway.app](https://railway.app) and create a new project from this repo
2. Set **Root Directory** to `backend`
3. Add a **PostgreSQL** database — Railway injects `DATABASE_URL` automatically
4. Railway reads `railway.toml` to know how to start the app

**Environment variables to set in Railway:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | Auto-injected by Railway |
| `SMTP_HOST` | `smtp.gmail.com` |
| `SMTP_PORT` | `587` |
| `SMTP_USER` | `emmanuelbain@kemirix.com` |
| `SMTP_PASSWORD` | Your Google App Password (see note below) |
| `CONTACT_EMAIL` | `emmanuelbain@kemirix.com` |
| `FROM_EMAIL` | `emmanuelbain@kemirix.com` |
| `FRONTEND_URL` | `https://www.bainiac.me` |

> **Google App Password** — Go to your Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail" and use it as `SMTP_PASSWORD`. Required because Google blocks plain-password SMTP login.

---

## Stack

**Frontend** — Next.js 14, TypeScript, Tailwind CSS, Framer Motion

**Backend** — FastAPI, SQLAlchemy, PostgreSQL, Python

**Deployed on** — Vercel (frontend) · Railway (backend + database)

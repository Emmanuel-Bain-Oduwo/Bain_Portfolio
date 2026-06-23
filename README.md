# bain.me — Emmanuel Bain Oduwo

My personal portfolio. Live at **[www.bain.me](https://www.bain.me)**.

I'm a pharmacy student and AI engineer building clinical AI systems, medication safety tools, and healthcare datasets. This site is where I keep everything in one place — projects, research, background, and a way to reach me.

---

## What's in this repo

```
bain_portfolio/
├── frontend/    Next.js 14 app — the actual website
└── backend/     FastAPI — handles the contact form and email delivery
```

The frontend lives on **Vercel**. The backend lives on **Railway**. They talk to each other — when someone fills out the contact form on the site, the message gets stored in PostgreSQL and delivered to my inbox at `emmanuelbain@kemirix.com`.

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

Opens at `http://localhost:8000`. Interactive API docs are at `/docs`.

---

## Deploying

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) and import this repo
2. Set **Root Directory** to `frontend` — this is the important step
3. Vercel picks up Next.js automatically from there
4. Add your custom domain (`www.bain.me`) in project settings once it's live

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
| `FRONTEND_URL` | `https://www.bain.me` |

> **Google App Password** — Go to your Google Account → Security → 2-Step Verification → App Passwords. Generate one for "Mail" and use it as `SMTP_PASSWORD`. This is needed because Google Workspace blocks regular password login for SMTP.

---

## How the contact form works

Someone fills out the form on the site → frontend POSTs to the Railway backend → backend:

1. Saves the message to PostgreSQL
2. Sends a notification email to `emmanuelbain@kemirix.com` with all the details and a one-click reply button
3. Sends a professional auto-reply to the person who wrote in

Both emails are HTML and match the site's visual style.

---

## Things to add before going fully live

- **Photo** — drop your portrait into `frontend/public/emmanuel-portrait.jpg`, then swap the placeholder in `frontend/src/app/page.tsx` (look for the `Add photo to /public/` comment)
- **Profile links** — `frontend/src/lib/data.ts` has `PLACEHOLDER` everywhere in the `PUBLIC_PROFILES` array — replace those with your real LinkedIn, GitHub, Hugging Face, ORCID, etc.
- **Backend URL** — once Railway is deployed, set `NEXT_PUBLIC_API_URL` in your Vercel project environment variables

---

## Stack

**Frontend** — Next.js 14, TypeScript, Tailwind CSS, Framer Motion

**Backend** — FastAPI, SQLAlchemy, PostgreSQL

**Deployed on** — Vercel (frontend) · Railway (backend + database)
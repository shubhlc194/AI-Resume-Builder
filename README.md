# AI Resume Builder 📄✨ & Interview IQ 🧠
> Two tools, one goal — land that job. Build polished resumes with AI in minutes, then ace the interview with smart, role-specific prep.

🌐 **Live Demo:** [ai-resume-builder-328.pages.dev](https://ai-resume-builder-328.pages.dev/) 📁 **Repos:** [AI-Resume-Builder](https://github.com/shubhlc194/AI-Resume-Builder) · [InterviewIq](https://github.com/shubhlc194/InterviewIq)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB) ![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white) ![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=for-the-badge&logo=clerk&logoColor=white) ![Strapi](https://img.shields.io/badge/Strapi-2F2E8B?style=for-the-badge&logo=strapi&logoColor=white) ![Groq](https://img.shields.io/badge/Groq-F55036?style=for-the-badge&logo=groq&logoColor=white) ![Cloudflare](https://img.shields.io/badge/Cloudflare_Pages-F38020?style=for-the-badge&logo=cloudflare&logoColor=white)

---

## ✨ Features

### 📄 AI Resume Builder
- **AI content generation** — Groq-powered summaries, bullet points & skills tailored to your role
- **Real-time preview** — see changes live as you type, no refresh, no lag
- **Clerk authentication** — secure sign-in, OAuth2, multi-session support out of the box
- **Cloud storage** — save and manage multiple resumes via Strapi backend
- **Export ready** — download your resume as a clean, job-ready PDF

### 🧠 Interview IQ
- **AI-generated questions** — DSA, system design & behavioral questions per role
- **Smart feedback** — instant detailed feedback on your answers
- **Mock interview mode** — simulate real interview environments
- **Progress tracking** — monitor your performance over time

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React + Vite |
| Auth | Clerk |
| Backend / CMS | Strapi |
| AI / LLM | Groq API |
| UI Components | shadcn/ui |
| Bundler | Vite + SWC |
| Deployment | Cloudflare Pages |

---

## 🧩 Case Study

### The Problem
Job seekers spend hours writing resumes and still fail ATS filters, then walk into interviews unprepared for role-specific questions. Most tools solve only one half of this — either resume formatting or interview prep, never both, and rarely with AI-generated, role-specific content.

### The Approach
I built two connected tools instead of one bloated app:
- **AI Resume Builder** generates tailored summaries, bullet points, and skills using Groq's LLM API based on the target role, with a live preview so changes are visible instantly.
- **Interview IQ** generates DSA, system design, and behavioral questions for that same role, then gives instant AI feedback on answers — closing the loop from "resume ready" to "interview ready."

### Key Technical Decisions
| Decision | Why |
|---|---|
| Clerk over custom auth | OAuth2 + multi-session out of the box, saved ~2 weeks of auth/security work |
| Strapi as backend/CMS | Fast to spin up a content-managed API without hand-rolling admin panels |
| Groq over OpenAI | Sub-second inference latency — critical for real-time preview UX |
| Cloudflare Pages for deploy | Free tier, global edge CDN, zero-config CI from GitHub |

### Impact
- Live at [ai-resume-builder-328.pages.dev](https://ai-resume-builder-328.pages.dev/)
- [Add: resumes generated / users / Lighthouse score once you have real numbers]

### What I'd Improve Next
- ATS keyword-match scoring against job descriptions
- Resume templates beyond the current default
- Merge auth session between Resume Builder and Interview IQ for a single onboarding flow

---

## 📦 Getting Started

### Prerequisites
- Node.js `v18+`
- A [Clerk](https://clerk.dev) account
- A [Groq](https://console.groq.com) API key
- A running [Strapi](https://strapi.io) instance

### Installation

\```bash
# 1. clone
git clone https://github.com/shubhlc194/AI-Resume-Builder.git
cd AI-Resume-Builder

# 2. install deps
npm install

# 3. set env vars
cp .env.example .env

# 4. fire it up
npm run dev
\```

Open <http://localhost:5173> in your browser.

---

## ⚙️ Environment Variables

\```
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_GROQ_API_KEY=your_groq_api_key
VITE_STRAPI_API_KEY=your_strapi_api_key
VITE_STRAPI_BASE_URL=http://localhost:1337
\```
> Never commit real keys — add `.env` to your `.gitignore`

---

## 📂 Project Structure

\```
AI-Resume-Builder/
├── public/          # static assets
├── service/         # Groq + Strapi API layers
├── src/
│   ├── components/  # reusable UI
│   ├── pages/       # route-level views
│   └── main.jsx     # entry point
├── index.html
└── vite.config.js
\```

---

## 🤝 Contributing

1. Fork the repo
2. Create your branch — `git checkout -b feature/your-feature`
3. Commit your changes and push
4. Open a Pull Request — let's ship it 🚀

---

## 📄 License

MIT License — see [LICENSE](https://github.com/shubhlc194/AI-Resume-Builder/blob/main/LICENSE) for details.

---

Made with 🔥 by [@shubhlc194](https://github.com/shubhlc194)

⭐ Star this repo if it helped you!

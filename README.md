# 🍎 **EasyDiet – Intelligent Nutrition Platform**

A full-stack solution that empowers users to **search nutritional data, build recipes, and generate personalized diet plans**. The platform couples a modern **Next 13 / React** front-end with a robust **Flask API** backed by **MongoDB** and enriched through the **FatSecret Platform API**.  
Designed with Clean Architecture principles, EasyDiet is ready to scale, integrate, and evolve into a production-grade SaaS for nutrition, wellness, and coaching services.

[![Status](https://img.shields.io/badge/status-alpha-blue)]() [![License](https://img.shields.io/badge/license-MIT-green)]()

---

## 🎯 Overview
|                     |                                                                            |
|---------------------|----------------------------------------------------------------------------|
| **Problem**         | Reliable nutritional information is fragmented across multiple sources and hard for end-users to combine into actionable meal plans. |
| **Solution**        | EasyDiet unifies food look-up, macro calculation, recipe aggregation, and diet planning behind a single API and polished UI. |
| **Impact**          | • Faster meal planning for dietitians and fitness enthusiasts<br>• Consistent macro tracking for end-users<br>• Foundation for premium coaching and analytics add-ons |

---

## 🏗️ Architecture

### High-Level Diagram
```
Browser ─▶ Next 13 App Router ─▶ /api proxy ─▶ Flask API ─▶ MongoDB
                               │                 │
                               └──────────▶ FatSecret OAuth2 + REST
```

### Component Breakdown
| Layer | Component | Responsibilities | Tech & Patterns |
|-------|-----------|------------------|-----------------|
| **Presentation** | Next 13 (App Router) | Routing, SSR/ISR, responsive UI, PWA | Radix UI Primitives, MUI, Framer Motion |
| **BFF / API** | Flask 2.x + Blueprints | REST endpoints (`/auth`, `/food`, `/recipe`, `/diet`, `/users`) | Service layer, JWT middleware, Pydantic schemas |
| **Domain / Services** | `server/services/*` | Business rules, token lifecycle, macro calculations | Service-Repository pattern |
| **Persistence** | MongoDB | User, recipe, diet, token collections | PyMongo, environment-driven connection string |
| **External Integrations** | FatSecret Platform API | OAuth2 + food search & nutrition facts | Requests, cached tokens |
| **Cross-Cutting** | Validation, security, logging | `.core/*`, `middleware.py`, `utils/*` | Config object, structured JSON logs |

> **Design principles:** SOLID, Clean Architecture, 12-Factor Config, stateless services, DTO validation up-front.

---

## ✨ Key Features

| Category | Capability |
|----------|------------|
| **Food Search** | Query 500k+ food items via FatSecret with macro & micronutrient details. |
| **Recipe Builder** | Persist multi-ingredient recipes; automatic macro aggregation. |
| **Diet Planner** | Compose daily/weekly diet plans referencing recipes & foods. |
| **Auth & Security** | JWT access & refresh tokens, bcrypt hashing, token revocation list (Mongo). |
| **User Profile** | Track weight/height, goals, dietary restrictions (schema ready). |
| **PWA Front-end** | Offline support, installable on iOS/Android, responsive layouts. |

### Non-functional
* **CORS-safe API** with granular origins.  
* **Scalable DB** connection pooling.  
* **Extensible Service Layer**—drop-in support for other nutrient providers or RDBMS.

---

## 🛠️ Tech Stack

| Domain | Technology | Version | Rationale |
|--------|------------|---------|-----------|
| Front-end | Next 13, React 18 | `13.x` | App Router SSR + API proxy, incremental adoption, huge plugin ecosystem |
| Styling & UI | Radix UI, MUI v7, Emotion | `^7.0` | Accessible primitives + enterprise theme system |
| State / Data | React Context (Auth), Fetch API | – | Lightweight; swaps easily for TanStack Query |
| Back-end | Python 3.11, Flask 2.x | – | Minimal overhead, large community, simple DI via Blueprints |
| Data Validation | Pydantic v2 | – | Runtime-safe DTOs, OpenAPI-ready |
| Auth | python-jose + bcrypt | – | Stateless JWT, refresh rotation |
| Database | MongoDB 6.x | – | Flexible schema for rapidly evolving nutrition domain |
| External API | FatSecret Platform | – | Rich food DB with OAuth2 |
| Dev Tools | Jest, ESLint, Prettier / Pytest, Black, Ruff | – | Quality gate & auto-format |
| Packaging | `pip-tools` / `npm` | – | Reproducible dependency graphs |

---

## 📁 Repository Layout

```
repo-root
├── backend/                # Flask application
│   ├── app.py              # Entrypoint & middleware hook
│   ├── requirements.txt
│   └── server/
│       ├── api/            # Blueprints & external_api/
│       ├── core/           # Config, error handlers, security
│       ├── db/             # Mongo connection helpers
│       ├── schemas/        # Pydantic models
│       ├── services/       # Business logic
│       └── utils/          # JSON/BSON helpers
├── frontend/               # Next 13 application
│   ├── src/
│   │   ├── app/            # App Router pages & layout
│   │   ├── components/     # UI, forms, layouts
│   │   └── context/        # AuthContext
│   └── package.json
└── README.md               # ← you are here
```

---

## 🚀 Quick Start

### 1️⃣ Clone & bootstrap
```bash
git clone repo-full.bundle easy-diet && cd easy-diet
```

### 2️⃣ Back-end (Flask + Mongo)
```bash
cd backend
cp .env.example .env   # add JWT_SECRET, MONGO_URI, FATSECRET keys
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
python app.py         # http://localhost:5000
```

### 3️⃣ Front-end (Next 13)
```bash
cd ../frontend
npm install
npm run dev           # http://localhost:3000
```

### 4️⃣ Smoke Test
```bash
# Food search
curl 'http://localhost:5000/food/?query=banana'   -H 'Authorization: Bearer <access_token>'
```

---

## 🧪 Testing Strategy

| Layer | Framework | Command | Target |
|-------|-----------|---------|--------|
| **Unit** | Pytest / Jest | `pytest -q` / `npm test` | Service functions & React components |
| **Integration** | Pytest + TestClient | `pytest tests/integration` | Blueprint routes vs. Mongo test DB |
| **E2E** | Playwright (planned) | – | Full user flows (login → build diet) |

> 📊 Add `pytest-cov` + `jest --coverage` to enforce ≥ 80 % branch coverage.

---

## 📈 Performance & Scalability

* **Horizontal scaling** via stateless Flask instances behind Nginx or Gunicorn.  
* **Connection pooling** handled by PyMongo; tune `maxPoolSize` for high load.  
* **Front-end ISR/SSG** leverages Next 13 for CDN-edge caching.  
* **Roadmap:** Redis query-level cache & background workers (Celery/RQ) for heavy macro computations.

---

## 🔒 Security Posture

* **JWT (HS256)** short-lived access + rotating refresh tokens.  
* **Bcrypt-hashed** credentials with per-user salts.  
* **Data validation** on every request; rejects malformed payloads early.  
* **CORS** whitelist & Helmet-style headers on Next 13.  
* **Planned:** Rate-limiting middleware and OAuth 2 login via Google/Apple.

---

## 🔄 DevOps & CI/CD

| Stage | Tooling | Status |
|-------|---------|--------|
| **Build & Test** | GitHub Actions (TEMPLATE) | _todo_ |
| **Lint & Format** | Ruff, Black, ESLint, Prettier | manual |
| **Docker** | `Dockerfile` & `docker-compose.yml` (proposed) | _todo_ |
| **Deploy** | Railway / Vercel preview → main → prod | _todo_ |

> **Next Steps:** add multi-stage Dockerfiles and GH Actions workflow (`build → test → scan → push → deploy`).

---

## 🔮 Roadmap

| Release | ETA | Highlights |
|---------|-----|------------|
| **v0.2** | Q3 2025 | Dockerized services, GitHub Actions CI, Redis caching |
| **v0.3** | Q4 2025 | Macro goal analytics, social recipe sharing, OpenAPI-generated SDK |
| **v1.0** | 2026 | HIPAA/GDPR compliance, multi-tenant SaaS, Kubernetes Helm charts |

---

## 🤝 Contributing

1. Fork → feature branch (`feat/<name>`).  
2. Conventional Commits (`type(scope): description`).  
3. PR → automatic checks + code review.  
4. Squash-merge by maintainer.

See [`CONTRIBUTING.md`](docs/CONTRIBUTING.md) _(coming soon)_.

---

## 📄 License

**MIT** © 2025 EasyDiet Contributors  
Nutritional data provided by **FatSecret Platform API** under their terms of use.

---

*Generated automatically • Last updated 2025-07-07*

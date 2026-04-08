# Temp

> API-first email verification SaaS. Detect disposable emails, validate addresses in real time, and manage API keys across projects.

Temp is a developer-focused email verification platform that lets you detect disposable email addresses and validate user-submitted emails via a simple REST API. Block throwaway signups, reduce fraud, and improve data quality — with full API key management, multi-project workspaces, and per-key usage analytics.

---

## Features

- 🔍 **Disposable email detection** — instantly flags known throwaway email providers
- 🔑 **API key management** — create, revoke, and scope keys per project
- 🏢 **Multi-tenant workspaces** — organize usage across multiple projects and teams
- 📊 **Usage logs & analytics** — per-key request history with endpoint and email metadata
- 🔐 **Auth built-in** — secure sign-up with disposable email blocking enforced at the door
- ⚡ **Developer-first** — clean REST API with interactive docs and a live playground

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router) |
| Language | TypeScript (strict) |
| Styling | Tailwind CSS v4 + shadcn/ui |
| Auth | BetterAuth + API Key plugin |
| ORM | Prisma 7 |
| Database | PostgreSQL 16 |
| Runtime | Node.js |

---

## Getting Started

### Prerequisites

- Node.js 20+
- PostgreSQL 16
- Docker (optional, for local DB)

### 1. Clone the repo

```bash
git clone https://github.com/your-username/temp.git
cd temp
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your values:

```bash
cp .env .env.local
```

Required variables:

```env
DATABASE_URL=postgresql://user:password@localhost:5432/temp
BETTER_AUTH_SECRET=your-secret-here
BETTER_AUTH_URL=http://localhost:3000
```

### 4. Run the database

Using Docker Compose:

```bash
docker-compose up -d
```

### 5. Apply database migrations

```bash
npx prisma migrate deploy
```

### 6. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the app.

---

## API Reference

### Verify an email

```http
GET /api/v1/verify?email=user@example.com
Authorization: Bearer <your-api-key>
```

**Response**

```json
{
  "email": "user@example.com",
  "isDisposable": false,
  "valid": true
}
```

Full API documentation is available in the app at `/docs`.

---

## Project Structure

```
src/
├── app/
│   ├── (auth)/          # Sign in, sign up pages
│   ├── (dashboard)/     # Dashboard, API keys, settings
│   ├── (public)/        # Landing page, docs
│   └── api/             # API route handlers
├── components/          # Shared UI components
├── hooks/               # Custom React hooks
└── lib/                 # Auth config, Prisma client, utilities
prisma/
└── schema.prisma        # Database schema
```

---

## Development

```bash
npm run dev        # Start dev server
npm run build      # Production build
npm run lint       # Lint with Biome
npm run format     # Format with Biome
```

---

## Deployment

The recommended deployment targets are:

- **Frontend / API** → [Vercel](https://vercel.com)
- **Database** → [Neon](https://neon.tech) or [Supabase](https://supabase.com) (production), [Railway](https://railway.app) (staging)

---

## License

MIT

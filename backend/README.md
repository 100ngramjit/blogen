# Blogen Backend

## Getting Started

Install the dependencies:

```bash
npm install
```

Start the development server (runs Cloudflare Worker locally):

```bash
npm run dev
```

Deploy the worker to Cloudflare:

```bash
npm run deploy
```

---

## Database Connection & Prisma Accelerate

Serverless backends (like Cloudflare Workers) require a connection pooler because they can spawn many concurrent connections that might overwhelm a centralized database. In this project, we use **Prisma Accelerate** to proxy and pool our database connections.

### How the DB Connection is Proxied
1. **Direct Connection**: Your actual database (e.g., Supabase Postgres) provides a direct connection URL (starting with `postgres://` or `postgresql://`). This is necessary to run schema migrations since connection poolers do not properly support the migration process.
2. **Prisma Accelerate**: 
   - We register the direct database URL in the Prisma Data Platform (Accelerate).
   - Accelerate provides an optimized proxy URL with an API key (starting with `prisma://accelerate.prisma-data.net/?api_key=...`).
   - This proxy URL is used as the `DATABASE_URL` during runtime in the Cloudflare Worker. It catches Prisma Client queries, securely routes them, and efficiently pools connections before hitting the actual DB.

### Step-by-Step: Setup & Generate New Details

Follow these steps to set up the project with a new database and configure Prisma Accelerate:

**Step 1: Create a Database**
- Create a new PostgreSQL database on a provider like [Supabase](https://supabase.com), Neon, or Aiven.
- Copy your **direct database connection string** (e.g., `postgresql://user:password@host:5432/dbname`).

**Step 2: Generate an Accelerate Connection String**
- Go to the [Prisma Data Platform](https://console.prisma.io/) and create a new project.
- Select your environment and enable **Prisma Accelerate**.
- Paste your direct database connection string when prompted.
- Prisma will generate a new proxy connection string starting with `prisma://`. Copy this URL.

**Step 3: Update Local Environment Variables**
- Create or update the `.env` file in the `backend/` directory for your local migration environment:
  ```env
  # Update this with your direct database URL for Prisma Migrations
  DIRECT_URL="postgres://your_direct_db_url"
  
  # Update this with your Prisma Accelerate proxy URL
  DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=your_accelerate_api_key"
  ```

**Step 4: Update Worker Variables (.dev.vars)**
- For local Cloudflare Worker development, open or create `.dev.vars` inside `backend/`:
  ```env
  # Cloudflare uses this to connect via Accelerate
  DATABASE_URL="prisma://accelerate.prisma-data.net/?api_key=your_accelerate_api_key"
  
  # Set your JWT secret for authentication
  JWT_SECRET="your_secure_jwt_secret"
  ```

**Step 5: Add Secrets to Cloudflare (Production)**
- To update your connection details for the live deployment, run the following Wrangler commands and paste your values when prompted (run these in your `backend/` directory):
  ```bash
  npx wrangler secret put DATABASE_URL
  npx wrangler secret put JWT_SECRET
  ```

**Step 6: Run Migrations and Generate Client**
- Whenever you make changes to `prisma/schema.prisma` or need to initialize your new DB:
  ```bash
  npx prisma migrate dev --name init
  npx prisma generate
  ```
- *Note: `prisma migrate` relies on the database details provided in your `.env` file.*

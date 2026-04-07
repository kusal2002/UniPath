# UniPath Consulting – Student Platform

A modern web platform for UniPath, a fictional university consulting agency. This repository includes both a **public landing page** to capture student inquiries and a **staff management dashboard** for processing those applications.

Built for the full-stack assignment.

## Tech Stack
- **Framework:** Next.js 14 (App Router) with TypeScript
- **Styling:** Tailwind CSS + Framer Motion
- **Database:** PostgreSQL (Neon Serverless)
- **ORM:** Prisma
- **Form Handling:** React Hook Form + Zod validation
- **Authentication:** NextAuth (Credentials Provider)
- **Deployment:** Vercel

## Features

**1. Public Landing Page**
- Premium, modern design with subtle microanimations.
- Fully responsive layout.
- Comprehensive "Student Inquiry Form" with built-in client-side robust validation.

**2. Staff Portal (`/admin`)**
- Secure login area utilizing NextAuth.
- View list of submitted student inquiries with real-time status badges.
- Detailed view with all applicant data.
- Staff functionality: Update inquiry statuses and save internal notes.

## Run Locally

### Prerequisites
- Node.js 18+ installed
- A PostgreSQL Database (Local or Neon/Supabase)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repo-url>
   cd unipath
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Setup**
   Ensure an `.env` file exists at the root, identical to the pattern in `.env.example` (or simply use local DB):
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/unipath?schema=public"
   NEXTAUTH_SECRET="your_secure_secret_key"
   NEXTAUTH_URL="http://localhost:3000"
   ```

4. **Initialize Database**
   Push the Prisma schema to your database:
   ```bash
   npx prisma db push
   ```

5. **Create Default Admin**
   To access the dashboard, run the seed script to create the default staff account:
   ```bash
   npx -y dotenv-cli -e .env -- npx -y tsx prisma/seed.ts
   ```
   *Default Login credentials are: Username `admin`, Password `admin123`*

6. **Start Dev Server**
   ```bash
   npm run dev
   ```
   Access the frontend at `http://localhost:3000`
   Access the admin panel at `http://localhost:3000/admin`

## Deployment

This app is optimized for Vercel deployment. 

1. Push code to GitHub.
2. Import project in Vercel.
3. In Build Settings, set `Build Command` to `npm run build` and `Install Command` to `npm install`.
4. Add the Environment Variables:
   - `DATABASE_URL`
   - `NEXTAUTH_SECRET`
   - `NEXTAUTH_URL` (Set this to the actual production URL after domain is assigned).
5. Add the `npx prisma generate` command as postinstall script in `package.json` to ensure Vercel builds properly:
   ```json
   "scripts": {
     "postinstall": "prisma generate"
   }
   ```
   *(This repo already has this configured)*

## Author
Prepared for full-stack review.

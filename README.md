# UniPath

A comprehensive platform for managing university admission inquiries and student applications. UniPath streamlines the process of collecting, organizing, and managing student inquiry data with an intuitive admin dashboard.

## Features

- **Student Inquiry Form**: Collect comprehensive student information including academic background, preferences, and budget
- **Admin Dashboard**: Manage inquiries with real-time status updates and notes
- **Authentication System**: Secure admin access with NextAuth integration
- **Student Profile Management**: Track personal info, academic details, and preferences
- **Status Tracking**: Monitor inquiry status (NEW, IN PROGRESS, ACCEPTED, REJECTED)
- **Database Integration**: Reliable PostgreSQL database with Prisma ORM
- **Responsive Design**: Beautiful UI with Tailwind CSS and Framer Motion animations

## Tech Stack

- **Framework**: [Next.js 16](https://nextjs.org) with TypeScript
- **Database**: PostgreSQL with [Prisma ORM](https://www.prisma.io)
- **Authentication**: [NextAuth.js](https://next-auth.js.org)
- **Styling**: [Tailwind CSS](https://tailwindcss.com)
- **Forms**: [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) validation
- **UI Components**: [Lucide React](https://lucide.dev) icons, Framer Motion animations
- **Linting**: ESLint with Next.js config

## Prerequisites

Before you begin, ensure you have installed:

- **Node.js** 18.17+ or later
- **npm** or **yarn** (npm is recommended)
- **PostgreSQL** 12+ (or a PostgreSQL cloud service like Neon, AWS RDS, etc.)

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/kusal2002/UniPath.git
cd unipath
```

### 2. Install Dependencies

```bash
npm install
```

This will install all required packages including `tsx` for running the seed script.

### 3. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/unipath"

# NextAuth Configuration
NEXTAUTH_SECRET="your-secret-key-here-generate-with-openssl-rand-base64-32"
NEXTAUTH_URL="http://localhost:3000"

# Authentication Provider (optional - configure based on your needs)
# GITHUB_ID=your_github_id
# GITHUB_SECRET=your_github_secret
```

**To generate `NEXTAUTH_SECRET`:**
```bash
openssl rand -base64 32
```

### 4. Setup Database

Run Prisma migrations to create database tables:

```bash
npx prisma migrate dev --name init
```

**Seed the database (optional):**
```bash
npx prisma db seed
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Run linter
npm run lint

# Generate new database schema
npx prisma generate

# View database in Prisma Studio
npx prisma studio
```

## Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Landing page
│   ├── layout.tsx         # Root layout
│   ├── api/               # API routes
│   │   ├── auth/          # Authentication endpoints
│   │   └── inquiries/     # Inquiry CRUD endpoints
│   └── admin/             # Admin dashboard pages
├── components/            # React components
│   ├── AuthProvider.tsx   # NextAuth provider wrapper
│   ├── admin/             # Admin components
│   └── landing/           # Landing page components
├── lib/                   # Utility functions
│   ├── auth.ts           # NextAuth configuration
│   └── prisma.ts         # Prisma client instance
└── styles/               # Global styles

prisma/
├── schema.prisma         # Database schema
└── seed.ts              # Database seed data
```

## Database Schema

### Inquiry Model

Stores student inquiry information:

- `id`: Unique identifier
- `fullName`: Student's full name
- `email`: Contact email
- `phone`: Phone number (optional)
- `nationality`: Student nationality
- `educationLevel`: Current education level
- `gpa`: Grade point average (optional)
- `preferredCountries`: Array of preferred study countries
- `preferredMajor`: Preferred field of study
- `intakeYear`: Target intake year
- `intakeSeason`: Target intake season (Fall, Spring, etc.)
- `budgetRange`: Student's budget range
- `message`: Additional message/comments
- `status`: Inquiry status (NEW, IN PROGRESS, ACCEPTED, REJECTED)
- `notes`: Internal staff notes
- `createdAt`, `updatedAt`: Timestamps

### Admin Model

Stores admin user credentials for dashboard access.

## API Endpoints

### Public Routes

- `GET /` - Landing page
- `POST /api/inquiries` - Submit new inquiry

### Admin Routes (Protected)

- `GET /api/inquiries` - List all inquiries
- `GET /api/inquiries/[id]` - Get inquiry details
- `PATCH /api/inquiries/[id]` - Update inquiry
- `DELETE /api/inquiries/[id]` - Delete inquiry
- `GET /admin/login` - Admin login page
- `POST /api/auth/signin` - Authentication endpoint
- `GET /admin` - Dashboard (requires login)

## Environment Variables Reference

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth session encryption | Yes |
| `NEXTAUTH_URL` | Application URL (for production) | Yes |

## Development Workflow

1. Create a new branch for features: `git checkout -b feature/your-feature-name`
2. Make your changes and commit regularly
3. Test thoroughly in the development server
4. Submit a pull request with clear description

## Deployment

### Deploy on Vercel (Recommended)

The easiest way to deploy is using [Vercel](https://vercel.com):

1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Deploy on Other Platforms

This is a standard Next.js application and can be deployed on:

- Railway
- Render
- DigitalOcean App Platform
- AWS Amplify
- Heroku

See [Next.js Deployment Documentation](https://nextjs.org/docs/app/building-your-application/deploying) for detailed instructions.

## Common Issues

### Database Connection Error

```
Error: P1000 Authentication failed
```

**Solution**: Verify your `DATABASE_URL` is correct and the database server is running.

### NextAuth Secret Not Set

```
Error: NEXTAUTH_SECRET is not set
```

**Solution**: Generate and add `NEXTAUTH_SECRET` to `.env.local`:

```bash
openssl rand -base64 32
```

### Prisma Schema Out of Sync

```
Error: The Prisma schema is out of sync
```

**Solution**: Run migrations:

```bash
npx prisma generate
npx prisma migrate dev
```

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For issues, questions, or suggestions:

- Open an issue on GitHub
- Contact the maintainer at: [your-email@example.com]

## Roadmap

- [ ] Email notifications for inquiry updates
- [ ] Advanced filtering and search
- [ ] Bulk import from CSV
- [ ] Email templates for inquiries
- [ ] Multi-language support
- [ ] Analytics dashboard
- [ ] Document upload for inquiries

---

Built with ❤️ using Next.js and TypeScript

# Kolotebe MVP - Book Sharing Platform

A platform for sharing books through multiple exchange mechanisms: free giveaways, virtual currency (Kolocoins), direct trades, or temporary loans.

## Features

- **User Authentication**: Google OAuth via NextAuth
- **Book Management**: Add books to your personal library
- **Listing Creation**: Share books with flexible transfer options
- **Virtual Currency**: Earn and spend Kolocoins (KLC)
- **Multiple Delivery Methods**: Self-pickup, Nova Poshta, Ukrposhta
- **Transfer Types**: Free, For Kolocoins, Trade, Loan

## Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **Database**: PostgreSQL with Prisma ORM
- **Authentication**: NextAuth v5 (beta)
- **Media Storage**: S3/Cloudflare R2
- **Deployment**: Vercel (recommended)

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- PostgreSQL database
- Google OAuth credentials
- S3/Cloudflare R2 bucket (for photo uploads)

### Installation

1. Clone the repository and install dependencies:
```bash
npm install
```

2. Copy the environment variables template:
```bash
cp .env.example .env
```

3. Configure your `.env` file with:
   - PostgreSQL connection string
   - NextAuth secret and URL
   - Google OAuth credentials
   - S3/Cloudflare R2 credentials

4. Generate Prisma Client and push schema to database:
```bash
npx prisma generate
npx prisma db push
```

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000)

## Database Schema

The platform uses the following core entities:
- **Users**: Platform participants with authentication
- **Books**: Unique book titles in the catalog
- **BookCopies**: Physical instances owned by users
- **Listings**: Active offers to share books
- **BookTransfers**: Transaction lifecycle management
- **UserBalance**: Kolokoin holdings
- **UserBalanceTransactions**: Immutable ledger for KLC movements
- **TransactionHolds**: Reserved KLC during pending transactions
- **Disputes**: Conflict resolution system

## Development Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Prisma commands
npm run db:push      # Push schema changes
npm run db:studio    # Open Prisma Studio
npm run db:generate  # Generate Prisma Client

# Linting
npm run lint
```

## Project Structure

```
kolotebe-mvp/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── auth/              # Authentication pages
│   ├── books/             # Book management pages
│   ├── listings/          # Listing pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── lib/                  # Utility libraries
│   ├── auth.ts          # NextAuth configuration
│   ├── prisma.ts        # Prisma client
│   ├── upload.ts        # File upload utilities
│   └── utils.ts         # Helper functions
├── prisma/              # Database schema
│   └── schema.prisma    # Prisma schema
├── types/               # TypeScript type definitions
└── public/              # Static assets
```

## Implementation Phases

### Phase 1: Foundation (Current)
- ✅ Next.js setup with TypeScript and Tailwind
- ✅ PostgreSQL database with Prisma
- ✅ NextAuth with Google OAuth
- ✅ Photo upload to S3/Cloudflare R2
- ✅ Book and listing management
- ✅ Browse interface

### Phase 2: Kolokoin Economy
- User balance management
- Transaction ledger (immutable)
- Hold mechanism
- Balance calculation and display

### Phase 3: Transfer Flow
- Book request creation
- Owner approval process
- Transfer type handling (free, KLC, trade, loan)
- Request notifications

### Phase 4: Delivery & Completion
- Address autocomplete
- Delivery method selection
- Tracking code entry
- Automatic KLC processing
- Loan return reminders

### Phase 5: Security & Disputes
- Phone verification
- Rate limiting
- Photo moderation
- Dispute management
- Admin dashboard

### Phase 6: Polish & Launch
- User onboarding
- Email notifications
- SEO optimization
- Performance tuning
- Security audit

## Contributing

This is an MVP project. Contributions welcome via pull requests.

## License

MIT License - See LICENSE file for details
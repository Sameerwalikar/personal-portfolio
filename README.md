# Sameer Walikar — Personal Portfolio

Production-ready personal portfolio built with **Next.js 15**, **TypeScript**, **Tailwind CSS v4**, and **Framer Motion**. Inspired by a modern green-themed developer portfolio aesthetic.

## Tech Stack

- Next.js 15 (App Router)
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion
- Lucide React

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Production Build

```bash
npm run build
npm start
```

## Deploy to Vercel

1. Push this repository to GitHub.
2. Import the project on [Vercel](https://vercel.com).
3. Deploy — no extra configuration required.

## Customization

All portfolio content lives in a single data file:

`src/data/portfolio.ts`

Update projects, experience, skills, social links, and contact details there without touching UI components.

## Project Structure

```
src/
├── app/              # Next.js app router & global styles
├── components/
│   ├── icons/        # Social & brand icons
│   ├── layout/       # Header, Footer
│   ├── sections/     # Page sections
│   └── ui/           # Reusable UI primitives
├── data/             # Portfolio content (single source of truth)
├── lib/              # Utilities
└── types/            # TypeScript interfaces
```

## License

Private — © Sameer Walikar
# personal-portfolio

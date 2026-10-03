# Patcharapon Portfolio — v0.1

A one-page personal portfolio built for MT / Business Engineer applications.

## Current sections

1. Hero
2. About Me
3. Experience
4. Selected Case Studies

This first version is intentionally modular so new sections can be added later without rebuilding the site.

## Tech stack

- Next.js (App Router)
- TypeScript
- Plain CSS design system (easy to customize)
- Responsive layout
- Vercel-ready

## Run locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Deploy with GitHub + Vercel

1. Create a GitHub repository, e.g. `patcharapon-portfolio`.
2. Copy this project into the repo.
3. Commit and push:

```bash
git init
git add .
git commit -m "Initial portfolio v0.1"
git branch -M main
git remote add origin YOUR_GITHUB_REPO_URL
git push -u origin main
```

4. In Vercel, choose **Add New → Project**.
5. Import the GitHub repository.
6. Vercel should detect Next.js automatically. Click **Deploy**.

Every future push to the main branch will trigger a new Vercel deployment automatically.

## Where to update content

- Hero: `components/Hero.tsx`
- About: `components/About.tsx`
- Experience data: `data/experience.ts`
- Case study data: `data/caseStudies.ts`
- Colors / spacing / typography: `app/globals.css`

## Design system

- Warm white background: `#F7F7F5`
- Surface: `#FFFFFF`
- Charcoal: `#202124`
- Main text: `#171717`
- Secondary text: `#6B6B6B`
- Accent blue: `#3157D5`

## Carousel behavior

The Selected Case Studies section uses the preferred 90% / 100% / 90% layout:
- center card = active, full scale
- side cards = 90% scale
- auto-advance every ~6.5 seconds
- pauses on hover/focus
- mouse drag / touch swipe
- arrow and dot controls

## Next suggested version

v0.2 can add:
- Leadership & Global Experience
- Recognition & Impact
- Skills
- Contact
- Individual case study pages

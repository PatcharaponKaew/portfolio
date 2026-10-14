# Patcharapon Portfolio — v0.1.1

A one-page personal portfolio built for MT / Business Engineer applications.

## Current sections
Hero → About → Experience → Selected Case Studies → Global Experience → Leadership & Recognition → Community & Volunteering → Let's Connect.

See [AUDIT.md](AUDIT.md) for publication TODOs, shared content sources and validation commands.

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

Development uses `next dev --turbopack`. This avoids the Webpack CSS HMR helper in Next.js 15.5.4 throwing `Cannot read properties of null (reading 'removeChild')` when a stylesheet link has already been detached during hot reload. Production builds still use `npm run build`. Stop the dev server before building because both commands use `.next`.

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

## v0.1.1 update

- Hero leads with PATCHARAPON / KAEWNOEN on two lines, followed by the smaller positioning statement.
- Original portrait, university, location and Discover My Impact button are preserved. Hero mini highlights are removed.
- About, Experience and case study data are preserved.
- Image-led carousel uses a 55% image area, 100% active card, approximately 90% side cards and 650ms transitions.
- Stable cards animate between positions; mouse drag, touch swipe, arrows, keyboard arrows and dots are supported.
- Autoplay advances every 6.5 seconds and pauses during hover, focus and dragging. Reduced-motion preference disables autoplay.

### Add actual project images

Only the original Hero portrait is included. Case study cards currently show clearly labeled image placeholders, not fabricated project photos.
Put your project images in `public/images/`, then add these optional fields to the corresponding entry in `data/caseStudies.ts`:

```ts
image: "/images/shopee-case.jpg",
imageAlt: "Describe the actual project image",
```

The image area is already reserved, so adding images does not change the card layout. Subtitles remain in the data for future detail pages; cards show category, title, description and tags to keep the layout concise.

### Verify and run a release

```bash
npm ci
npx tsc --noEmit
npm run build
npm start
```

Stop the development server before building in the same folder: development and production builds share `.next`.
The ZIP contains source, the lockfile and the original portrait; it excludes `node_modules`, `.next`, secrets and local generated files.

## PV Fault Detection project details

Click anywhere on the PV card (or activate its Explore project button with the keyboard) to open the project detail dialog. The three supplied images appear only in the top gallery. The five explanation sections below it are edited in `data/caseStudies.ts` under `details`.

The explanation is a concise draft based on the supplied slides and existing project description; confirm personal contributions, lessons and measured results before publication. No accuracy figures or operational savings are assumed.

## Global Experience

The horizontal country cards after Selected Case Studies are maintained in `data/globalExperiences.ts`. The section uses native horizontal scrolling and mobile swipe with scroll snapping, plus mouse drag, keyboard arrows and country selection controls. The closest card receives the active style; reduced motion disables animation.

### Travel-inspired global experience layout

The local mini-map uses Natural Earth 1:110m public-domain geography, sourced from https://github.com/nvkelso/natural-earth-vector/blob/master/geojson/ne_110m_admin_0_countries.geojson. It is a simplified regional overview. Pins use supplied cities; the Philippines pin represents the country because a city has not been provided. Map selections scroll to the corresponding country card. Cards show country codes rather than unconfirmed airport codes. Taiwan and Philippines years remain blank until confirmed.

### Code-built boarding passes

All five destinations share `components/BoardingPass.tsx` and identical responsive dimensions, grid, photo width and stub geometry. Impact order: Japan, Taiwan, Singapore, South Korea, Philippines. Photos are independent Wikimedia Commons assets with complete source/author/license metadata in `public/images/destinations/credits.json`; the supplied reference images are not embedded or cropped. Flags, destination maps, plane icons, stamps, perforations and decorative barcodes are vector/CSS elements.

Routes use BKK as the visual origin and CTS / TPE / SIN / ICN / CEB as destination airport markers, not confirmed flight itineraries. Flight numbers, gates, seats and terminals from the references are deliberately not treated as factual experience data. Taiwan and Philippines years remain unconfirmed. The carousel advances every 8.5 seconds, pauses on hover/focus, and stops autoplay after user interaction. Reduced motion disables autoplay and transitions.

## About Me editorial section

`components/About.tsx` contains the statement and a continuous right-to-left keyword ribbon. Styles are scoped under `.about-editorial` in `app/globals.css`. Each statement line fades and rises directly with scroll position, reversing when scrolling upward. A passive scroll listener updates CSS variables through requestAnimationFrame. The statement uses Manrope Bold 700. Reduced motion displays the text immediately and stops the ribbon. Manrope is served locally from `public/fonts`. The mountain background and parallax have been removed. Verify with `npm run typecheck` and preview using `npm run dev`.



## Responsive layout

The shared layout uses fluid typography and breakpoints at 360, 600, 980, and 1000px. The navbar uses a touch-sized collapsible menu at 980px and below. Hero text wraps on narrow screens; its portrait, statistics and reduced-motion behavior are preserved. Experience stacks logo and copy on phones. Projects remain a two-row horizontal ribbon at every size with touch scrolling, mouse dragging and keyboard navigation. Project detail dialogs use dynamic viewport height.

Validation: `npm run typecheck`; CSS syntax can be checked with the installed `postcss` parser. Before publication, visually test 320/375/430px phones, 768/820px tablet portrait, 1024/1180px tablet landscape, and 1440/1920px desktop widths, including rotation, touch scrolling and enlarged text. This update passed TypeScript and CSS parsing; live viewport inspection was unavailable because the browser tool denied access.

## GitHub and Vercel deployment

Repository: https://github.com/PatcharaponKaew/portfolio
Vercel project: https://vercel.com/james-5a6c/portfolio

The application lives at the repository root. Use the Next.js preset, root directory `.`, install command `npm ci`, and build command `npm run build`. No environment variables are required for the current static portfolio. Next.js 15.5.27 is retained from the existing repository; the lockfile is committed for repeatable installs. Local dependency folders, generated build output and `.env` files are ignored.

Stop the local development server before running a production build because both use `.next`. After validation, restart with `npm run dev`. A push to the connected production branch should trigger Vercel when Git integration is enabled; verify the deployment status in Vercel rather than assuming a successful Git push means deployment succeeded.

Dependency audit during deployment preparation reports inherited PostCSS and sharp advisories. A framework major upgrade is outside this upload; review these dependencies before accepting untrusted asset inputs.

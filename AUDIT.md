# Portfolio audit / publication TODOs

Design, section ordering, layouts, colors, type, card styling and spacing are preserved.

## Missing owner input
- Email, LinkedIn URL and CV PDF: `data/contact.ts`. Buttons intentionally remain disabled.
- Taiwan and Philippines experience years: `data/globalExperiences.ts`.
- Real flight/gate/seat/terminal details: boarding-pass fields intentionally use em dashes. Earlier illustrative itineraries must not be presented as verified.
- Google/McKinsey leadership activity photos; all 14 award and 7 honor photos; 6 community photos and confirmed captions.
- Case images and confirmed challenge, approach, results and reflection details for the nine cases other than PV Fault Detection. Section 03 uses the approved ten-project order; missing details remain labeled placeholders.
- Confirm Rewastec draft impact, all journey reflection drafts, and USA role/responsibilities. Do not add assumed outcomes.
- Confirm 3.95/4.00, top-of-class, 20+ awards, 67K+ views and any project performance claims. Listing 14 competitions + 7 honors does not establish 21 separate awards.

## Repeatable checks
- `npm run typecheck` (also `npm run lint`; no external lint tool installed).
- `npm run build`; do not run build against the same `.next` directory as an active development server.
- Verify at 1440, 1024, 768, 390 and 320px; keyboard, pointer drag, touch swipe, horizontal wheel, reduced motion, and dialog Escape/focus return.

## Shared content
- Profile metrics/name/location: `data/profile.ts`.
- Destination assets: `data/destinationAssets.ts`; missing images stay null.
- Global destinations and country order: `data/globalExperiences.ts`.
- Expanded journey content is keyed by country code: `data/experienceJourneys.ts`.
- Recognition names and dates: `data/recognitions.ts` (owner supplied).

## Verified in this audit
- TypeScript check and optimized Next.js production build passed.
- Browser checks at 1440, 1024, 768, 390 and 320px: no page overflow, clipped recognition content or broken section anchors.
- Verified keyboard navigation, pointer drag centering, journey expand/collapse, Asia return, gallery Escape and reduced-motion behavior; no browser page errors.
- The Park Grill owner-supplied photo is shared by the USA boarding pass and expanded journey.
- Touch hardware testing and owner confirmation of draft content remain outstanding.

# Custom navbar mascot

The mascot replaces only the original PK mark. Its slot remains 40×40px; artwork is 48px on desktop and 40px on mobile. Reduced motion uses the static center pose. Hero portrait and navigation links are unchanged.

- Runtime: `page-mascot` React component, local `/mascots/` URLs.
- Source sheets: `characters/patcharapon/directions.png` and `reactions.png` (true RGBA transparency).
- Built assets: `public/mascots/patcharapon-directions.webp` and `patcharapon-reactions.webp`.
- Style: clean chibi colour. The skill's default Lanczos build softens pixel art; colour preserves glasses and hair readability at navbar size.
- Rebuild from the project root (skill installed under the user's `.agents/skills/page-mascot`):
  `.venv-mascot/Scripts/python.exe C:/Users/patch/.agents/skills/page-mascot/scripts/mascot.py patcharapon --skip-generate`
- Local Python dependencies: `.venv-mascot`, installed from the skill's `scripts/requirements.txt`; not needed by Vercel or the website runtime.

Verification passed: directions shoulder spread 1.3%, true alpha, no direction edge contact. Built reaction swap: 0.00 rendered px movement at 140px, 89.5% weakest palette match, 0.2% worst width change. Left/right cells were cropped and visually checked: both face the correct viewer direction.

Browser checks: pointer directions, click and keyboard reactions, reduced-motion static pose, native drag prevention, asset URLs, mobile overflow, unchanged navbar height (72px desktop / 62px mobile) and unchanged navigation position.

Production-mode browser verification also passed with local Next.js start: both assets returned HTTP 200, cursor tracking and reactions worked, and no console errors occurred. Actual Vercel deployment was not performed.

# KoraWear

A fictional fashion brand selling contemporary African-inspired clothing. This is a front-end ecommerce demo built to show product layouts, state management, cart functionality and checkout UX.

**Stack:** React 18 · TypeScript · Vite · React Router. No backend, no UI library; styling is a single token-driven CSS file with light and dark themes.

## Features

- **Catalogue:** category tabs, search, sort, filter by size and price, per-card colourway swatches
- **Product page:** colour and size selection with sold-out sizes per colourway, quantity, size guide, related pieces
- **Bag:** slide-over drawer, quantity controls, free-delivery progress, promo code `KORA10` (10% off), persisted in `localStorage`
- **Checkout:** field validation (Nigerian phone numbers, card number/expiry/CVC), delivery estimates by state, standard or express delivery, card / bank transfer / pay-on-delivery (Lagos only), VAT breakdown, order confirmation
- **Accessibility:** skip link, focus management in the drawer, `aria-live` updates, visible focus states, reduced-motion support

Garments are drawn as SVG silhouettes filled with woven-pattern tiles, so the project has no image assets.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build
```

`npm run build` produces a single self-contained `dist/index.html`. It opens by double-click, with no server needed. A ready-made copy is included as `KoraWear.html`.

## Project structure

```
src/
  components/   Header, Hero, ProductCard, CartDrawer, Garment (SVG), ColorDots, Footer
  pages/        Shop, Product, Checkout, Confirmation
  context/      CartContext (reducer + persistence), ToastContext
  data/         products.ts (typed catalogue)
  lib/          constants, pricing (totals, VAT, shipping), validation, formatting
  styles/       global.css (design tokens + components)
  types.ts      shared domain types
```

State lives in two places: `CartContext` holds cart lines, promo and the last order, and page-level `useState` holds UI state such as filters and the selected size. All money maths sits in `lib/pricing.ts`, which is a pure function and easy to unit test.

## Deploying

The app uses hash routing (`/#/product/...`), so it needs no server rewrites and works on any static host.

- **Vercel:** import the repo and keep the Vite preset.
- **Netlify:** build command `npm run build`, publish directory `dist`.

## Notes

- Prices are in Nigerian naira and treated as VAT-inclusive (7.5%).
- This is a demo: no payment is processed and no data leaves the browser.
- Replace `src/data/products.ts` and the `Garment` component with real product data and photography to adapt it to a client.

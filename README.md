# Lumi Jewellery: Nuxt 3 take-home store

A small online jewellery store: product listing, product detail, cart and mocked checkout, with SEO built in.

## Stack
Nuxt 3 (SSR) + Tailwind CSS, Pinia (cart), Nitro server routes (API), PostgreSQL (Supabase) via Drizzle ORM, `@nuxt/image`, `@nuxtjs/sitemap`.

## Run locally
```bash
npm install
cp .env.example .env      # then paste your DATABASE_URL
npm run db:push           # creates the products table
npm run db:seed           # inserts 12 products
npm run dev               # http://localhost:3000
```

## Deploy (Vercel)
1. Push to GitHub, import the repo in Vercel (framework: Nuxt is auto-detected).
2. Add the env var `DATABASE_URL` (Supabase transaction pooler string, port 6543).
3. Deploy. Canonical URLs, Open Graph URLs and the sitemap use the production domain automatically. Set `NUXT_PUBLIC_SITE_URL` only if you use a custom domain.

## Architecture decisions
- **SSR, not SPA:** crawlers get full HTML for every product page.
- **Nitro server routes instead of a separate backend:** one repo, one deploy. The routes are small and could be moved into NestJS later.
- **Drizzle + Postgres:** typed queries, plain SQL underneath, no lock-in to a provider.
- **Cart in Pinia + localStorage:** the cart needs no backend. It loads after mount so server and client HTML match.
- **SEO:** unique title and description per page (`useSeoMeta`), canonical URLs, Open Graph and Twitter tags, Product JSON-LD with price and availability, dynamic `sitemap.xml` built from the database, dynamic `robots.txt`, `noindex` on cart/checkout/confirmation, a real 404 page.
- **Images:** served through `@nuxt/image` as WebP with explicit width/height (no layout shift). Hero and product-detail images load eagerly; listing images are lazy.

## Trade-offs and next steps
- Checkout is mocked. No payment or order is saved.
- Product images are generated placeholders in `public/images/` (same file name as the product slug). Replace them with real photos.
- With more time: search, pagination, category pages with their own URLs, caching headers, real M-Pesa payments.

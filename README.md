# Monis Workspace Builder
Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Zustand · Framer Motion · lucide-react

    npm install && npm run dev

## Approach
The brief asks for a fun, visual experience rather than a product catalog, so the page is a live workspace you build in place. Picking a desk or chair, or adding a monitor, lamp or plant, updates the preview right away. A "Ready to Rent?" card keeps the weekly price in view and opens a checkout summary with duration, start date, delivery area and total. The layout follows the provided sketch: a tabbed picker on the left, the scene on a platform in the middle, quick-add slots on the right, and extra zones (coffee, outdoor gear, relax, garage) along the bottom. The rental itself is sent as a pre-filled WhatsApp message, because that is the simplest real channel for a small rental business in Bali.

## Tech choices
Next.js 16 (App Router) with TypeScript, Tailwind CSS v4 for styling, Zustand for the small builder state, Framer Motion for the item pop-in and modal animations, and lucide-react for icons. The scene is built from separate image layers, not hard-coded drawings. All products, prices and placement live in data/catalog.ts, and the images are plain files in public/assets. The client can swap in real photos or add products without touching the UI code.

## Deploy
Push to GitHub (add `desent-bot` as collaborator), import on vercel.com, set `NEXT_PUBLIC_WA_NUMBER`.

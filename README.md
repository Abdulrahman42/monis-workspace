# Monis Workspace Builder
Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Zustand · Framer Motion · lucide-react

    npm install && npm run dev

## Customize without touching UI code
- **Products, prices, placement:** `data/catalog.ts` (one place for desks, chairs, accessories, zones).
- **Images:** `public/assets/{desks,chairs,items,icons}`. Replace a file with the same name, or add a new one and point `src` / `icon` at it (SVG, PNG, WebP all work). `w`/`h` are sizes in a 600×370 scene; `anchor` + `dx` position an item on the desk; `slots` lists x-offsets per quantity (monitors).
- **WhatsApp number:** copy `.env.example` to `.env.local`.
- **Dark mode:** automatic; line-art images are inverted via `dark:invert`. Use colored photos? remove `dark:invert` in `Scene.tsx` / `Slot.tsx`.

## Deploy
Push to GitHub (add `desent-bot` as collaborator), import on vercel.com, set `NEXT_PUBLIC_WA_NUMBER`.

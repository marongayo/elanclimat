# Élan Climat & Énergie — Website

A professional Next.js website for an HVAC, Solar & Battery company.

## Stack
- **Next.js 16** (App Router)
- **TypeScript**
- **Tailwind CSS v4**
- **Lucide React** (icons)
- **Google Fonts** — Playfair Display + DM Sans

## Sections
1. Navbar — sticky, scroll-aware, mobile-responsive hamburger menu
2. Hero — full-screen dark green with parallax orb, floating icons, animated stats
3. Services — 6-card grid (HVAC, Ventilation, Solar, Battery, Smart Energy, Maintenance)
4. About — story, values, floating stat cards
5. Why Us — dark section with key metrics
6. Projects — filterable gallery by category
7. Testimonials — animated carousel
8. Team — profile cards with specialties
9. FAQ — animated accordion
10. Blog — article cards with tags
11. Contact — contact info + fully functional form
12. Footer — links, social icons, brand

## Get Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Build for Production

```bash
npm run build
npm start
```

## Customisation
- **Colors** — edit CSS variables in `app/globals.css`
- **Content** — update text/data arrays in each component file
- **Fonts** — change Google Fonts import in `app/layout.tsx`
- **Logo** — replace the `<Leaf>` icon in `Navbar.tsx` and `Footer.tsx` with your own SVG/image

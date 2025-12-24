# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Development
npm run dev          # Start development server on localhost:3000

# Production
npm run build        # Build for production
npm run start        # Start production server

# Linting
npm run lint         # Run ESLint
```

## Technology Stack

- **Next.js 15.1.11** with App Router (React 19.0.0)
- **Tailwind CSS v4** with custom theme and CSS variables
- **Animation**: framer-motion, GSAP, @studio-freight/lenis (smooth scrolling)
- **UI Components**: shadcn/ui (configured via components.json), Radix UI primitives
- **Chat**: @n8n/chat widget integration
- **Icons**: lucide-react

## Project Structure

```
src/
├── app/                    # Next.js App Router (file-based routing)
│   ├── layout.js           # Root layout with metadata, SEO schema, global providers
│   ├── page.js             # Home page
│   ├── globals.css         # Global styles, CSS variables, Tailwind imports
│   ├── SmoothScroll.jsx    # Lenis smooth scroll provider (client component)
│   ├── [slug]/             # Route pages (about, services, ai-calling-agents, etc.)
│   └── blog/               # Blog section
└── components/             # React components
    ├── navbar.jsx          # Navigation with mega menu
    ├── hero.jsx            # Hero section with animations
    ├── services.jsx        # Services showcase
    ├── story.jsx           # Company story section
    ├── faqs.jsx            # FAQ accordion
    ├── form.jsx            # Contact form
    ├── footer.jsx          # Footer component
    ├── button.jsx          # Reusable button
    ├── countup.jsx         # Animated counter
    ├── ChatbotWidget.jsx   # N8N chat widget
    ├── FluidHeader.jsx     # Animated header text effects
    ├── GlassOrchestra.jsx  # Glass morphism utilities
    └── ui/                 # shadcn/ui components
```

## Path Aliases

The `@/*` alias maps to `./src/*` (configured in jsconfig.json). Use it for clean imports:
```javascript
import Navbar from "@/components/navbar";
import "@/app/globals.css";
```

## Styling Conventions

- **Colors**: Defined as CSS variables in `globals.css` under `:root`
  - `--primary-color: #ff541f`
  - `--secondary-color: #ffd700`
  - `--white: #ffffff`
  - `--bg-dark: #000000`
  - `--bg-zinc-950: #09090b`

- **Fonts**:
  - `Poppins` - Default body font (`var(--font-poppins)`)
  - `Urbanist` - Display/headings font (`var(--font-urbanist)`)
  - `DM Sans` - Geometric font (`var(--font-dmsans)`)

- **Utilities**:
  - `.glass-panel` - Glassmorphism background with blur
  - `.text-gradient` - White gradient text effect
  - `.session` - Section padding helper (responsive)

## Architecture Notes

### Client vs Server Components
- Most components in `src/components/` use `"use client"` directive for animations and interactivity
- `SmoothScroll.jsx` must be a client component for Lenis to work
- Pages in `src/app/` are server components by default (add `"use client"` when needed)

### Animation Stack
- **Lenis**: Smooth scrolling (initialized in SmoothScroll.jsx)
- **framer-motion**: Page/component animations and transitions
- **GSAP**: Complex timeline-based animations
- Components like `FluidHeader.jsx` and `GlassOrchestra.jsx` contain animation utilities

### Global Providers (in layout.js)
- `<Navbar />` - Site navigation
- `<BookCal />` - Cal.com booking integration
- `<SmoothScroll />` - Lenis smooth scroll provider

### SEO
- Comprehensive metadata in `src/app/layout.js` including OpenGraph, Twitter cards
- Structured data (JSON-LD) for Organization schema
- Robots.txt configured in `src/app/robots.js`

### N8N Chat Integration
The chatbot widget (`ChatbotWidget.jsx`) connects to an N8N webhook:
- Webhook URL is hardcoded in the component
- Runs in "window" mode (bottom-right corner)
- CSS is imported in the root layout (`@n8n/chat/style.css`)

## Tailwind CSS v4 Notes

This project uses Tailwind CSS v4 beta. Key differences:
- CSS-based configuration via `@theme` directive in `globals.css`
- Custom fonts defined in `@theme` block
- `tailwind-merge` and `clsx` used for conditional class merging
- `tw-animate-css` provides additional animation utilities

## shadcn/ui Configuration

- Configured in `components.json`
- Style variant: "new-york"
- Path aliases match project structure
- Add new components: use shadcn CLI or manual copy to `src/components/ui/`

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
│   ├── page.js             # Home page (composes src/components/home/*)
│   ├── globals.css         # Global styles, CSS variables, Tailwind imports
│   ├── SmoothScroll.jsx    # Lenis smooth scroll provider (client component)
│   ├── about/             # About page
│   ├── services/          # Services page
│   ├── ai-calling-agents/ # AI Calling Agents service page
│   ├── ai-chatbots/       # AI Chatbots service page
│   ├── website-development/ # Website Development service page
│   ├── digital-marketing/ # Digital Marketing service page
│   └── blog/              # Blog section and posts
└── components/             # React components
    ├── navbar.jsx          # Navigation with mega menu
    ├── home/               # Home page sections (server components + small client islands)
    │   ├── HomeHero.jsx / CallDemo.jsx        # Hero and the sample-call demo
    │   ├── FactStrip.jsx                      # Offer facts (prices, delivery times)
    │   ├── MissedCallsSection.jsx / MissedCallCalculator.jsx
    │   ├── CoverageComparison.jsx             # AI agent vs answering service vs receptionist
    │   ├── ServicesBento.jsx, DemoSection.jsx / DemoVideo.jsx (click-to-load YouTube)
    │   ├── ProcessTimeline.jsx, IndustriesSection.jsx / IndustryPanels.jsx
    │   ├── WorkRail.jsx, AboutStatement.jsx
    │   └── Reveal.jsx                         # Shared scroll-reveal wrapper
    ├── faqs.jsx            # Site-wide FAQ section (two-column, accordion)
    ├── form.jsx            # Site-wide contact section (server shell)
    ├── contact-form.jsx    # Contact form client component (WhatsApp handoff)
    ├── footer.jsx          # Footer component
    ├── button.jsx          # Reusable button
    ├── countup.jsx         # Animated counter
    ├── ChatbotWidget.jsx   # N8N chat widget
    ├── book-calcom.jsx     # Cal.com booking floating button
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
- **Lenis**: Smooth scrolling (initialized in SmoothScroll.jsx with duration: 1.2s, lerp: 0.1)
- **framer-motion** (imported as `motion/react`): Page/component animations and transitions
  - `FluidHeader.jsx` - Word-by-word text reveal animation with staggered delays
  - `GlassOrchestra.jsx` - Ambient background glows and floating glass blobs
- **GSAP**: Complex timeline-based animations
- `tw-animate-css`: Additional CSS animation utilities

### Global Providers (in layout.js)
- `<Navbar />` - Site navigation
- `<BookCal />` - Cal.com booking integration (floating button, namespace: "30min", calLink: "syenxa-tech/30min")
- `<SmoothScroll />` - Lenis smooth scroll provider

### SEO
- Comprehensive metadata in `src/app/layout.js` including OpenGraph, Twitter cards
- Structured data (JSON-LD) for Organization schema embedded in layout
- Organization name: "Syenxa Tech", URL: https://syenxatech.com

### N8N Chat Integration
The chatbot widget (`ChatbotWidget.jsx`) connects to an N8N webhook:
- Webhook URL: `https://n8n.srv929626.hstgr.cloud/webhook/314ce18e-efe9-487c-ab35-4fc2cd673762/chat`
- Runs in "window" mode (bottom-right corner, fixed positioning)
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
- Uses `motion` package (alias for framer-motion) for animations
- Path aliases defined: `@/components`, `@/lib/utils`, `@/components/ui`
- Custom registry configured: `@spectrumui` at https://ui.spectrumhq.in/r/{name}.json
- Utility functions for class merging in `src/lib/utils.js` (uses `clsx` and `tailwind-merge`)
- Add new components: use shadcn CLI or manual copy to `src/components/ui/`

# RH Digital Portfolio — Project Documentation

> **Last updated:** May 2026  
> **Version:** 0.1.0  
> **Purpose:** Full technical reference for the landing page — folder structure, tech stack, design system, and all section details.

---

## Table of Contents

1. [Tech Stack](#1-tech-stack)
2. [Project Structure](#2-project-structure)
3. [Design System](#3-design-system)
4. [Page Render Order](#4-page-render-order)
5. [Sections — Detailed Reference](#5-sections--detailed-reference)
   - [Navbar](#51-navbar)
   - [Hero](#52-hero)
   - [PainPoints](#53-painpoints)
   - [Partner](#54-partner)
   - [CaseStudies](#55-casestudies)
   - [Mission](#56-mission)
   - [Testimonials](#57-testimonials)
   - [RecentCaseStudies](#58-recentcasestudies)
   - [CoreValues](#59-corevalues)
   - [Partnerships](#510-partnerships)
   - [Pathway](#511-pathway)
   - [Footer](#512-footer)
6. [UI Components](#6-ui-components)
7. [Types Reference](#7-types-reference)
8. [Scripts & Commands](#8-scripts--commands)
9. [Conventions & Rules](#9-conventions--rules)

---

## 1. Tech Stack

| Layer | Technology | Version |
|---|---|---|
| **Framework** | Next.js (App Router) | 16.2.6 |
| **Language** | TypeScript | ^5 |
| **UI Library** | React | 19.2.4 |
| **Styling** | Vanilla CSS Modules (scoped per component) | — |
| **Font** | Manrope via `next/font/google` | 300–800 weights |
| **Bundler** | Turbopack (via `next dev`) | built-in |
| **Linting** | ESLint with `eslint-config-next` | 16.2.6 |
| **Node types** | `@types/node` | ^20 |

### Key architectural decisions
- **No CSS framework** (no Tailwind, no Bootstrap) — all styling via CSS Modules + custom design tokens in `globals.css`
- **App Router only** — no `pages/` directory
- **Zero client-side state management** — all sections are pure presentational components
- **Dynamic imports** for all below-fold sections — preserves Core Web Vitals
- **SSR enabled** on all dynamic imports for SEO

---

## 2. Project Structure

```
senthilsir-portfolio/
├── public/
│   └── images/
│       ├── footer_avatar.png          # AI-generated CTA profile photo
│       ├── partnership_interview.png  # Partnership card graphic
│       ├── partnership_sofa.png       # Partnership card graphic
│       └── river_cruise.png           # Partnership card graphic
│
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css                # 🔑 ALL design tokens (colors, spacing, radius, shadows)
│   │   ├── layout.tsx                 # Root layout — Manrope font + <Footer /> injected
│   │   ├── page.module.css            # Page-level styles (unused; kept as scaffold)
│   │   └── page.tsx                   # 🔑 Page composition — dynamic section imports
│   │
│   ├── components/
│   │   ├── sections/                  # One folder per page section
│   │   │   ├── CaseStudies/
│   │   │   │   ├── CaseStudies.module.css
│   │   │   │   ├── CaseStudies.tsx
│   │   │   │   └── index.ts
│   │   │   ├── CoreValues/
│   │   │   │   ├── CoreValues.module.css
│   │   │   │   ├── CoreValues.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Footer/
│   │   │   │   ├── Footer.module.css
│   │   │   │   ├── Footer.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Hero/
│   │   │   │   ├── Hero.module.css
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── TrustBar.tsx       # Hero sub-component
│   │   │   │   └── index.ts
│   │   │   ├── Mission/
│   │   │   │   ├── Mission.module.css
│   │   │   │   ├── Mission.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Navbar/
│   │   │   │   ├── Navbar.module.css
│   │   │   │   ├── Navbar.tsx
│   │   │   │   └── index.ts
│   │   │   ├── PainPoints/
│   │   │   │   ├── ChallengeCard.module.css
│   │   │   │   ├── ChallengeCard.tsx  # Sub-component
│   │   │   │   ├── PainPoints.module.css
│   │   │   │   ├── PainPoints.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Partner/
│   │   │   │   ├── Partner.module.css
│   │   │   │   ├── Partner.tsx
│   │   │   │   └── index.ts
│   │   │   ├── Partnerships/
│   │   │   │   ├── Partnerships.module.css
│   │   │   │   ├── Partnerships.tsx
│   │   │   │   ├── PartnershipCard.tsx   # Card sub-component
│   │   │   │   ├── PartnershipGraphics.tsx # CSS/SVG visual mockups
│   │   │   │   └── index.ts
│   │   │   ├── Pathway/
│   │   │   │   ├── Pathway.module.css
│   │   │   │   ├── Pathway.tsx
│   │   │   │   ├── PathwayCard.tsx     # Single step sub-component
│   │   │   │   ├── PathwayGraphics.tsx # 5 bespoke CSS/SVG mockups
│   │   │   │   └── index.ts
│   │   │   ├── RecentCaseStudies/
│   │   │   │   ├── RecentCaseStudies.module.css
│   │   │   │   ├── RecentCaseStudies.tsx
│   │   │   │   └── index.ts
│   │   │   └── Testimonials/
│   │   │       ├── Testimonials.module.css
│   │   │       ├── Testimonials.tsx
│   │   │       └── index.ts
│   │   │
│   │   └── ui/                        # Reusable primitive UI components
│   │       ├── Badge/
│   │       ├── Button/
│   │       ├── Card/
│   │       ├── FloatingChat/          # Floating contact button (global, in page.tsx)
│   │       └── Logo/
│   │
│   ├── lib/
│   │   ├── tokens.ts                  # TypeScript mirror of CSS tokens (for JS usage)
│   │   └── utils.ts                   # Shared utility functions
│   │
│   └── types/
│       └── index.ts                   # 🔑 All shared TypeScript interfaces & prop types
│
├── AGENTS.md                          # AI agent rules (Next.js version guidance)
├── next.config.ts                     # Next.js configuration
├── tsconfig.json                      # TypeScript configuration
└── package.json                       # Dependencies & scripts
```

---

## 3. Design System

### 3.1 Token Source of Truth
All tokens live in **`src/app/globals.css`** inside `:root`. Never hardcode colours or spacing in component CSS — always reference a token.

### 3.2 Color Tokens

| Token | Value | Usage |
|---|---|---|
| `--color-hero-bg` | `#8687C0` | Hero section purple background |
| `--color-hero-text` | `#FFFFFF` | Hero heading |
| `--color-highlight-bar` | `#C9587E` | Pink highlight bar under heading |
| `--color-cta-primary` | `#3DDC84` | Green CTA buttons |
| `--color-trust-bar-bg` | `#3A3C8E` | Hero trust bar dark blue |
| `--color-section-bg` | `#F3EDE2` | Warm cream — PainPoints, CoreValues, etc. |
| `--color-section-text` | `#1A1A1A` | Dark body headings |
| `--color-section-subtext` | `#3A3A3A` | Secondary text |
| `--color-badge-blue` | `#6B5CF6` | Blue pill badge |
| `--color-badge-pink` | `#C084B0` | Pink pill badge |
| `--color-card-bg` | `#FFFFFF` | White card backgrounds |
| `--color-black` | `#1A1A1A` | Global near-black |
| `--color-white` | `#FFFFFF` | Global white |
| `--color-testimonials-bg` | `#FAF8F5` | Off-white warm beige |
| `--color-recentcasestudies-grj-bg` | `#121a24` | Dark navy case study card |
| `--color-recentcasestudies-twolist-bg` | `#ff1e76` | Hot pink case study card |
| `--color-chat-yellow` | `#FFD54F` | Floating chat button |

### 3.3 Typography Tokens

| Token | Value | Usage |
|---|---|---|
| `--font-family-primary` | `'Manrope', 'DM Sans', 'Inter', sans-serif` | All text |
| `--font-light` | `300` | Thin headings |
| `--font-regular` | `400` | Body text |
| `--font-medium` | `500` | Emphasized body |
| `--font-semibold` | `600` | Subheadings |
| `--font-bold` | `700` | Headings |
| `--font-extrabold` | `800` | Display headings |
| `--text-hero-heading` | `clamp(3rem, 6vw, 5.5rem)` | Hero `<h1>` |
| `--text-section-heading` | `clamp(2.5rem, 5vw, 4rem)` | Section `<h2>` |
| `--text-body-lg` | `clamp(1rem, 1.5vw, 1.2rem)` | Large body copy |

### 3.4 Spacing Scale (8px base)

| Token | Value |
|---|---|
| `--space-1` | `4px` |
| `--space-2` | `8px` |
| `--space-3` | `12px` |
| `--space-4` | `16px` |
| `--space-5` | `20px` |
| `--space-6` | `24px` |
| `--space-8` | `32px` |
| `--space-10` | `40px` |
| `--space-12` | `48px` |
| `--space-16` | `64px` |
| `--space-20` | `80px` |
| `--space-24` | `96px` |

### 3.5 Border Radius

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Buttons, badges |
| `--radius-md` | `12px` | Cards |
| `--radius-lg` | `16px` | Large cards |
| `--radius-xl` | `24px` | Section panels |
| `--radius-pill` | `999px` | CTA buttons |

---

## 4. Page Render Order

`src/app/page.tsx` composes the full page. Sections render in this order:

```
1.  <Hero />                  ← Static import (critical path / above fold)
2.  <PainPoints />            ← Dynamic import (SSR)
3.  <Partner />               ← Dynamic import (SSR)
4.  <CaseStudies />           ← Dynamic import (SSR)
5.  <Mission />               ← Dynamic import (SSR)
6.  <Testimonials />          ← Dynamic import (SSR)
7.  <RecentCaseStudies />     ← Dynamic import (SSR)
8.  <CoreValues />            ← Dynamic import (SSR)
9.  <Partnerships />          ← Dynamic import (SSR)
10. <Pathway />               ← Dynamic import (SSR)
11. <FloatingChat />          ← Static import (always visible)
12. <Footer />                ← In layout.tsx (site-wide, after {children})
```

> All dynamic imports use `ssr: true` to preserve SEO + hydration, and a `<SectionSkeleton>` as the loading fallback.

---

## 5. Sections — Detailed Reference

---

### 5.1 Navbar
**Path:** `src/components/sections/Navbar/`  
**Type:** Static (imported directly in Hero)  
**Theme:** Transparent → overlays Hero background

**Contents:**
- Logo (left)
- Navigation links: Work · Services · About · Journal
- CTA button: "Start a project" (white pill)
- Fixed to top, sits above Hero

**Key CSS:**
- `position: fixed; top: 0; z-index: 100`
- Backdrop blur on scroll for glassmorphism effect

---

### 5.2 Hero
**Path:** `src/components/sections/Hero/`  
**Type:** Static (above fold, critical path)  
**Background:** `--color-hero-bg` (`#8687C0` purple/indigo)

**Contents:**
- `<Navbar />` rendered inside Hero
- `<h1>` display heading (2 lines, second line with pink highlight bar)
- Subtext paragraph
- Green CTA button "Start a project"
- `<TrustBar />` sub-component showing Trustpilot rating + star count

**Sub-components:**
- `TrustBar.tsx` — displays rating badge, star icons, and source label

**Props (`HeroProps`):**
- `heading1`, `heading2Prefix`, `heading2Highlight`, `subtext`, `ctaLabel`, `ctaHref`

---

### 5.3 PainPoints
**Path:** `src/components/sections/PainPoints/`  
**Background:** `--color-section-bg` (`#F3EDE2` warm cream)

**Contents:**
- Section heading (light-weight large type)
- 2 decorative badge pills (blue + pink)
- 2-column grid of `<ChallengeCard />` components
- Decorative orange star
- CTA sub-heading + button at bottom

**Sub-components:**
- `ChallengeCard.tsx` — displays a quote or avatar card with left-border colour accent

**Props (`PainPointsProps`):**
- `heading1`, `heading2`, `frequentChallenges[]`, `commonPainPoints[]`

**Card types (`ChallengeCardProps`):**
- `variant: 'blue' | 'pink'` — controls left-border and badge colour
- `quote`, `headline`, `description`, `avatarSrc`, `avatarAlt`

---

### 5.4 Partner
**Path:** `src/components/sections/Partner/`  
**Background:** Dark purple/indigo (solid dark section)

**Contents:**
- "Who I partner with" heading (white)
- Subtitle — target audience description
- 3-column service blocks with title + description

**Props (`PartnerProps`):**
- `heading`, `services: ServiceBlock[]`

**`ServiceBlock`:**
- `title`, `description`

---

### 5.5 CaseStudies
**Path:** `src/components/sections/CaseStudies/`  
**Background:** `--color-casestudies-bg` (`#8E7DF0` purple)  
**Layout:** Blueprint grid pattern overlay

**Contents:**
- Section heading (white)
- 3 phone mockups side-by-side:
  - Left: dark/black (`#13131A`) — app UI mockup
  - Centre: mint/teal (`#C0EFEA`) — product mockup
  - Right: cream/beige (`#F5EFE4`) — branding mockup
- Grid blueprint lines via CSS `background-image`

---

### 5.6 Mission
**Path:** `src/components/sections/Mission/`  
**Background:** Black

**Contents:**
- Large statement heading (white, multi-line)
- Decorative concentric blue circle rings (CSS)
- Orange hand-drawn arrow accent (SVG/CSS)
- Yellow triangle accent

**Token:** `--text-mission-heading: clamp(2.2rem, 5.5vw, 4.2rem)`

---

### 5.7 Testimonials
**Path:** `src/components/sections/Testimonials/`  
**Background structure:**  
- Outer: `--color-black` (`#1A1A1A`) dark  
- Inner curved panel: `--color-testimonials-bg` (`#FAF8F5` off-white) with `border-top-radius: 40px`

**Contents:**
- "Trusted by SaaS founders & startups" heading
- Subtext
- Grid of reviewer cards — each with: avatar initials circle, name, date, star rating, review text

**Props (`TestimonialsProps`):**
- `heading`, `reviews: ReviewData[]`

**`ReviewData`:**
- `id`, `name`, `date`, `avatarInitials`, `avatarColor`, `rating`, `text`

---

### 5.8 RecentCaseStudies
**Path:** `src/components/sections/RecentCaseStudies/`  
**Background:** Dark navy `#121a24`

**Contents:**
- Section heading + subheading
- 2 case study cards:
  - **GRJ** (`mockupVariant: 'grj'`) — dark navy card with device mockup
  - **TwoList** (`mockupVariant: 'twolist'`) — hot-pink card `#ff1e76`
- Each card: client name badge, headline, mockup graphic, tags

**Props (`RecentCaseStudiesProps`):**
- `heading`, `subheading`, `cases: CaseStudyData[]`

**`CaseStudyData`:**
- `id`, `client`, `headline`, `mockupVariant: 'grj' | 'twolist'`

---

### 5.9 CoreValues
**Path:** `src/components/sections/CoreValues/`  
**Background structure:**  
- Outer: `#1A1A1A` dark  
- Inner curved panel: `--color-section-bg` (`#F3EDE2` warm cream) with `border-top-radius: 40px`

**Contents:**
- Heading: "Core values used for every design project"
- Subtext: "The output of my design is based on these principles"
- 2×2 grid of value cards — each with:
  - Circular icon (`90×90px`, light-blue fill `#c5eaf7`, teal border `#4dbfd8`)
  - Dark SVG icon stroke
  - Bold title + body description

**4 Values:**
| # | Title | Icon |
|---|---|---|
| 1 | User-Centric Focus | Person silhouette |
| 2 | Innovation | Lightbulb |
| 3 | Empowerment | Lightning bolt |
| 4 | Results | Checkmark |

---

### 5.10 Partnerships
**Path:** `src/components/sections/Partnerships/`  
**Background:** Dark / white card mix

**Contents:**
- Section heading: "Partnerships & Affiliations"
- Filter pill bar: All · Advice · Courses · Community · (more categories)
- Grid of `<PartnershipCard />` components — each showing:
  - Date tag
  - Visual graphic mockup
  - Title
  - Tag pills

**Sub-components:**
- `PartnershipCard.tsx` — individual card layout
- `PartnershipGraphics.tsx` — CSS/SVG visual mockups for all `graphicVariant` types

**Graphic variants:**
`interview` · `sofa` · `zoom` · `skills` · `laurence` · `freelance` · `ai` · `figma` · `content`

**Props (`PartnershipsProps`):**
- `heading`, `items: PartnershipItem[]`

**`PartnershipItem`:**
- `id`, `date`, `title`, `tags[]`, `graphicVariant`

---

### 5.11 Pathway
**Path:** `src/components/sections/Pathway/`  
**Background:** `#0c0c0e` very dark charcoal  
**Theme:** Dark section with glowing green accents

**Contents:**
- Section heading: "The Product Strategy Pathway"
- Subheading
- Vertical timeline of 5 steps — each step has:
  - Left: visual CSS/SVG mockup graphic
  - Centre: glowing numbered badge (`#32c878` green glow) + connector line
  - Right: title, description, bullet checklist, "Why is this needed?" section

**Sub-components:**
- `PathwayCard.tsx` — single step renderer
- `PathwayGraphics.tsx` — 5 bespoke graphic components

**5 Steps & Graphic Variants:**
| Step | Title | Graphic |
|---|---|---|
| 1 | Discovery & Research | `DiscoveryMockup` — sticky notes, target rings, cursor |
| 2 | UX Design & Wireframing | `UXDesignMockup` — flowchart with diamond node |
| 3 | Brand Identity & Visual Language | `BrandMockup` — yellow card with asterisk + white paper |
| 4 | Design Direction & Review | `DesignDirectionMockup` — 2 phone frames (Creative vs Corporate) |
| 5 | UI Delivery & Handoff | `UIDeliveryMockup` — dark browser chrome + bar chart + toggles |

**Props (`PathwayProps`):**
- `heading`, `subheading`, `steps: PathwayStep[]`

**`PathwayStep`:**
- `id`, `stepNumber`, `title`, `description`, `bullets[]`, `whyNeeded[]`, `graphicVariant`

---

### 5.12 Footer
**Path:** `src/components/sections/Footer/`  
**Placement:** `src/app/layout.tsx` — injected after `{children}`, appears on every page  
**Background:** `#161616` jet-black throughout

**Contents — 3 zones:**

#### Zone 1 — CTA
- Circular profile avatar (`/public/images/footer_avatar.png`, `110×110px`)
- Large heading: "Ready to work together?" (`clamp(2.8rem → 5.5rem)`)
- Green pill CTA button: "Start a project" (`#3DDC84`)

#### Zone 2 — Links (3 columns)
| Column | Content |
|---|---|
| Latest articles | 2 article links with divider between them |
| Have a browse | Work · Services · About · Journal · Start a project · **Terms and conditions** · Privacy Policy |
| Let's talk | Email · Phone · LinkedIn / X / Behance icon buttons |

**Social icons:** Inline SVG (LinkedIn, X/Twitter, Behance) in square-bordered `42×42px` buttons

#### Zone 3 — Legal Bar
- Full company registration: `RH Digital Limited, 14 Foxholes Crescent, Calverley, Leeds, LS28 5NT. Company Number 08834946 | Registered in England and Wales`
- Muted `rgba(white, 0.3)` small text, centered

---

## 6. UI Components

Located in `src/components/ui/` — reusable across any section.

| Component | Props | Usage |
|---|---|---|
| `Badge` | `variant: 'blue' \| 'pink'`, `children` | Pill labels in PainPoints |
| `Button` | `variant: 'primary' \| 'nav'`, `size`, `href`, `onClick` | CTA buttons |
| `Card` | `variant: 'blue' \| 'pink'`, `children` | Coloured card wrappers |
| `FloatingChat` | — | Fixed yellow chat button (bottom-right), globally in `page.tsx` |
| `Logo` | — | Brand logo mark used in Navbar |

---

## 7. Types Reference

All interfaces in `src/types/index.ts`. Key groupings:

```
UI Primitives:    ButtonProps, BadgeProps, CardProps, LogoProps
Navigation:       NavLink, NavbarProps
Hero:             HeroProps, TrustBarProps
PainPoints:       ChallengeCardData, PainPointCardData, PainPointsProps, ChallengeCardProps
Partner:          ServiceBlock, PartnerProps
CaseStudies:      CaseStudiesProps
Mission:          MissionProps
Testimonials:     ReviewData, TestimonialsProps
RecentCaseStudies: CaseStudyData, RecentCaseStudiesProps
Pathway:          PathwayStep, PathwayProps
Partnerships:     PartnershipItem, PartnershipsProps
Global:           FloatingChatProps
```

---

## 8. Scripts & Commands

```bash
# Start development server (Turbopack)
npm run dev

# Build for production (Turbopack)
npm run build

# Start production server
npm run start

# Lint
npm run lint
```

> **Dev server:** `http://localhost:3000`

---

## 9. Conventions & Rules

### File Naming
- Component files: `PascalCase.tsx` (e.g. `HeroSection.tsx`)
- CSS Modules: `PascalCase.module.css` (e.g. `Hero.module.css`)
- Barrel exports: `index.ts` in every component folder

### Component Rules
- Every section component has a `// ✓ tokens:` comment at the top listing tokens used
- All section components accept optional props with sensible defaults — never hardcode content
- `'use client'` only when actually needed (hover state, interactivity)
- Sub-components live in the same folder as their parent section

### CSS Rules
- **Never** hardcode colours — always use `var(--token-name)`
- Use `clamp()` for all font sizes and padding — mobile-first responsive
- Scoped via CSS Modules — no global class pollution
- Never use `!important`

### Page Composition
- `page.tsx` is **composition only** — no logic, no styles
- All below-fold sections use `dynamic()` with `ssr: true`
- `<SectionSkeleton>` used as loading fallback (matches section background)
- Footer lives in `layout.tsx`, not `page.tsx`

### Next.js Version Warning
> ⚠️ This project uses **Next.js 16.2.6** — not v13/14/15. APIs, file conventions, and config may differ from documentation targeting earlier versions. Always consult `node_modules/next/dist/docs/` for accurate guidance.

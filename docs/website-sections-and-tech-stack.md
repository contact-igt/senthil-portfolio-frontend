# Dr. Senthil Tamilaraasan — Portfolio Website Documentation

> **Site:** Dr. T. Senthil Tamilaraasan — Ophthalmologist & Healthcare Entrepreneur  
> **Tagline:** Ophthalmologist. Entrepreneur. Transforming Eye Care Across India.  
> **Contact:** senthil@ophthall.in | [ophthall.in](https://www.ophthall.in)

---

## Table of Contents

1. [Tech Stack](#tech-stack)
2. [Project Structure](#project-structure)
3. [Design System](#design-system)
4. [Website Sections](#website-sections)
5. [UI Components](#ui-components)
6. [Deployment](#deployment)

---

## Tech Stack

### Core Framework

| Technology | Version | Role |
|---|---|---|
| **Next.js** | 16.2.6 | App framework (App Router, SSR, dynamic imports) |
| **React** | 19.2.4 | UI rendering |
| **React DOM** | 19.2.4 | DOM bindings |
| **TypeScript** | ^5 | Type safety across all components |

### Styling

| Technology | Role |
|---|---|
| **Vanilla CSS Modules** | Per-section scoped styles (`.module.css`) |
| **CSS Custom Properties** | Global design tokens in `globals.css` |
| **Manrope** (Google Fonts) | Primary typeface — weights 300–800 |
| **Fallbacks** | DM Sans → Inter → sans-serif |

### Tooling & Dev

| Tool | Version | Role |
|---|---|---|
| **ESLint** | ^9 | Linting (`eslint-config-next` 16.2.6) |
| **@types/node** | ^20 | Node type support |
| **@types/react** | ^19 | React type support |

### Deployment

| Platform | Role |
|---|---|
| **Vercel** | Hosting & CI/CD (`vercel` ^54.5.0) |
| **next/font/google** | Self-hosted Google Fonts (no flash) |
| **next/dynamic** | Below-fold code splitting |

---

## Project Structure

```
senthilsir-portfolio/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout — font setup, metadata, Footer
│   │   ├── page.tsx            # Home page — composition only, no logic
│   │   ├── globals.css         # ALL design tokens + CSS reset
│   │   └── page.module.css     # Page-level layout styles
│   ├── components/
│   │   ├── sections/           # 12 page sections (see below)
│   │   └── ui/                 # Reusable UI primitives
│   ├── lib/                    # Shared utilities / helpers
│   └── types/                  # TypeScript type definitions
├── public/
│   └── images/                 # Static assets (avatars, mockups, etc.)
├── docs/                       # Project documentation
├── package.json
├── next.config.ts
└── tsconfig.json
```

---

## Design System

Defined entirely in `src/app/globals.css` as CSS Custom Properties.

### Typography

| Token | Value |
|---|---|
| `--font-family-primary` | Manrope, DM Sans, Inter, sans-serif |
| `--text-hero-heading` | `clamp(3rem, 6vw, 5.5rem)` |
| `--text-section-heading` | `clamp(2.5rem, 5vw, 4rem)` |
| `--text-body-lg` | `clamp(1rem, 1.5vw, 1.2rem)` |
| `--text-mission-heading` | `clamp(2.2rem, 5.5vw, 4.2rem)` |
| `--text-partner-title` | `clamp(1.8rem, 3vw, 2.3rem)` |

### Colour Palette

| Token | Hex | Usage |
|---|---|---|
| `--color-hero-bg` | `#8687C0` | Hero section background (periwinkle) |
| `--color-highlight-bar` | `#C9587E` | Heading underline accent (rose) |
| `--color-cta-primary` | `#3DDC84` | CTA button (green) |
| `--color-trust-bar-bg` | `#3A3C8E` | Trust bar (deep blue) |
| `--color-section-bg` | `#F3EDE2` | Off-white warm background |
| `--color-badge-blue` | `#6B5CF6` | Badge/tag purple |
| `--color-badge-pink` | `#C084B0` | Badge/tag pink |
| `--color-partner-purple` | `#4F3BB2` | Partner section accent |
| `--color-casestudies-bg` | `#8E7DF0` | Case studies purple |
| `--color-chat-yellow` | `#FFD54F` | Floating chat button |
| `--color-testimonials-bg` | `#FAF8F5` | Testimonials warm beige |
| `--color-rating-star` | `#FFB000` | Star rating gold |

### Spacing (8px base grid)

`4px · 8px · 12px · 16px · 20px · 24px · 32px · 40px · 48px · 64px · 80px · 96px`

### Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-pill` | `999px` |

---

## Website Sections

The homepage is assembled in `src/app/page.tsx` as **composition-only** (no logic or inline styles). Sections above-the-fold are statically imported; all below-fold sections use `next/dynamic` for code-splitting with skeleton loading states.

### 1. 🧭 Navbar
**Path:** `src/components/sections/Navbar/`  
Navigation bar rendered above the Hero. Contains the site logo, navigation links, and a "Book a Session" CTA button.

---

### 2. 🦸 Hero *(Above fold — static import)*
**Path:** `src/components/sections/Hero/`

The first impression section.

| Prop | Value |
|---|---|
| `heading1` | "Ophthalmologist. Entrepreneur." |
| `heading2Prefix` | "Transforming Eye Care" |
| `heading2Highlight` | "Across India" |
| `subtext` | Dr. Senthil's bio tagline |
| `ctaLabel` | "Book a Session" |
| `ctaHref` | `mailto:senthil@ophthall.in` |

---

### 3. ⚡ PainPoints *(Dynamic)*
**Path:** `src/components/sections/PainPoints/`  
Highlights the key challenges faced by eye hospitals and ophthalmologists — setting up the value proposition for Dr. Senthil's work. Skeleton height: `600px`.

---

### 4. 🏅 Partner — Clinical Credentials & Healthcare Leadership *(Dynamic)*
**Path:** `src/components/sections/Partner/`  
Showcases Dr. Senthil's academic and professional credentials. Displays as a service-card grid with a tablet mockup graphic.

**Content cards:**
1. **Educational Qualifications** — MBBS & DO from Sri Ramachandra University (Harvard Medical International affiliated)
2. **Professional Memberships** — AIOS, Tamilnadu Medical Council, Tamilnadu Ophthalmology Association
3. **Current Positions & Roles** — Founder of Ophthall, Director of Pranav Healthcare & Welcare, VP of Telemedicine Society of India (TN Chapter)

---

### 5. 📋 CaseStudies *(Dynamic)*
**Path:** `src/components/sections/CaseStudies/`  
Visual showcase section with phone mockup graphics demonstrating Dr. Senthil's strategic work and case examples. Skeleton height: `600px`.

---

### 6. 🎯 Mission *(Dynamic)*
**Path:** `src/components/sections/Mission/`  
A bold, typographic impact statement highlighting the transition from clinician to healthcare strategist.

| Prop | Value |
|---|---|
| `line1` | "From Clinic to Boardroom." |
| `line2` | "From One Patient to" |
| `line3` | "500,000+ Lives Impacted." |
| `subtext` | Dr. Senthil's journey narrative |

Features concentric animated circles and hand-drawn arrow decorations.

---

### 7. 💬 Testimonials *(Dynamic)*
**Path:** `src/components/sections/Testimonials/`  
Star-rated testimonials from ophthalmologists, hospital directors, and collaborators. Warm beige background (`#FAF8F5`) with gold star ratings. Skeleton height: `500px`.

---

### 8. 🏆 RecentCaseStudies — Awards & Honours *(Dynamic)*
**Path:** `src/components/sections/RecentCaseStudies/`

| Award | Year | Body |
|---|---|---|
| Unite For Sight Volunteer of the Year | 2007 | Stanford University / USA |
| Gold Medal for Excellence in Ophthalmology | 2014–2015 | Governor of Tamil Nadu |
| Healthcare Entrepreneur of the Year | 2016 | CII India |
| Start-up of the Year Award | 2017 | Smart CEO Magazine |

Displayed as stylised card mockups with variant designs (`grj`, `twolist`, `award3`, `award4`).

---

### 9. 📊 CoreValues — Impact & Key Metrics *(Dynamic)*
**Path:** `src/components/sections/CoreValues/`

Four impact metrics:

| Metric | Description |
|---|---|
| **500,000+ Patients Screened** | Via Welcare telemedicine network |
| **Half the Cost of Conventional Care** | Affordable diabetic retinopathy screening |
| **600+ Eye Hospitals in the Network** | Largest ophthalmology business conference (AIIMS 2024) |
| **200,000+ Lives Served Free** | Pranav Foundation subsidised care |

---

### 10. 🤝 Partnerships & Affiliations *(Dynamic)*
**Path:** `src/components/sections/Partnerships/`

Eight partnership cards with filterable tags:

| Partner | Date | Tags |
|---|---|---|
| Unitus Ventures | Dec 2013 | Investment, HealthTech, Impact |
| Unite For Sight | Since 2005 | Humanitarian, Global Health |
| Yale University | April 2006 | Speaking, International, Academia |
| Stanford University | 2007 | Recognition, Global |
| Duke University | Ongoing | Speaking, Innovation |
| AIIMS New Delhi | 2024 | Conference, Leadership |
| CII India | 2016 | Industry, Award |
| Telemedicine Society of India | Ongoing | Leadership, Telemedicine |

---

### 11. 🗺️ Pathway — Ventures & Investments *(Dynamic)*
**Path:** `src/components/sections/Pathway/`

Five ventures shown as a numbered journey pathway. Each card has `title`, `description`, `bullets`, and `whyNeeded` fields.

| # | Venture | Role |
|---|---|---|
| 1 | **Ophthall** — Practice Development Platform | Founder & Organising Chairman |
| 2 | **Welcare Health Systems** — Telemedicine Eye Screening | CEO & Co-Founder |
| 3 | **Pranav Foundation** — Free Eye Care for Underprivileged | Managing Trustee |
| 4 | **Ophthall Academy of Vision Sciences** — Healthcare Education | Founder |
| 5 | **Ophthall Eventology** — Conferences & Event Management | Partner |

---

### 12. 🦶 Footer *(Static — rendered in layout.tsx)*
**Path:** `src/components/sections/Footer/`

Full-width footer with CTA, 3 link columns, social links, and legal text.

| Column | Content |
|---|---|
| **Latest Talks** | YouTube, LinkedIn Articles |
| **Explore** | About, Ventures, Impact, Partnerships, Book a Session, Ophthall links |
| **Let's Talk** | Email, LinkedIn, YouTube |

---

## UI Components

Located in `src/components/ui/`:

| Component | Description |
|---|---|
| **Badge** | Pill-shaped label (blue/pink variants) used for tags and categories |
| **Button** | CTA button with primary green style and hover shadow animation |
| **Card** | Content card with left-border accent and rounded corners |
| **FloatingChat** | Sticky floating contact button (yellow, bottom-right) — pulsing animation |
| **Logo** | Site logo mark with ring styling |

---

## Deployment

- **Platform:** [Vercel](https://vercel.com)
- **Dev Server:** `npm run dev` (Next.js dev server)
- **Build:** `npm run build`
- **Start:** `npm start`
- **Lint:** `npm run lint`

### Performance Patterns

- All sections below the fold use `next/dynamic` with `ssr: true` and skeleton placeholders
- Google Fonts loaded via `next/font/google` (self-hosted, zero layout shift)
- Images served from `/public/images/` with `max-width: 100%` reset

---

*Last updated: June 2026 · Built by Invictus Projects*

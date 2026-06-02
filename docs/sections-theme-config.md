# 🎨 Senthil Sir Portfolio — Sections, Theme Colors & Design System

> **Last Updated:** June 2026  
> **Tech Stack:** Next.js (App Router) · CSS Modules · GSAP + ScrollTrigger  
> **Font:** Manrope (primary), DM Sans / Inter (fallbacks)

---

## Table of Contents

1. [Global Design Tokens](#1-global-design-tokens)
2. [Section-by-Section Breakdown](#2-section-by-section-breakdown)
   - [Navbar](#21-navbar)
   - [Hero](#22-hero)
   - [TrustBar](#23-trustbar)
   - [PainPoints](#24-painpoints)
   - [Partner](#25-partner)
   - [CaseStudies](#26-casestudies)
   - [Mission](#27-mission)
   - [Testimonials](#28-testimonials)
   - [RecentCaseStudies](#29-recentcasestudies)
   - [CoreValues](#210-corevalues)
   - [Partnerships](#211-partnerships)
   - [Pathway](#212-pathway)
   - [Footer](#213-footer)
   - [FloatingChat](#214-floatingchat)
3. [Section Flow & Color Transitions](#3-section-flow--color-transitions)
4. [File References](#4-file-references)

---

## 1. Global Design Tokens

All design tokens are declared in a single source of truth:  
📄 **`src/app/globals.css`** → `:root { ... }`

### Typography

| Token | Value |
|---|---|
| `--font-family-primary` | `'Manrope', 'DM Sans', 'Inter', sans-serif` |
| `--font-light` | `300` |
| `--font-regular` | `400` |
| `--font-medium` | `500` |
| `--font-semibold` | `600` |
| `--font-bold` | `700` |
| `--font-extrabold` | `800` |
| `--text-hero-heading` | `clamp(3rem, 6vw, 5.5rem)` |
| `--text-section-heading` | `clamp(2.5rem, 5vw, 4rem)` |
| `--text-body-lg` | `clamp(1rem, 1.5vw, 1.2rem)` |
| `--text-body` | `1rem` |
| `--text-badge` | `0.95rem` |
| `--text-nav` | `1rem` |
| `--text-cta` | `1.05rem` |
| `--lh-heading` | `1.1` |
| `--lh-body` | `1.6` |
| `--ls-heading` | `-0.02em` |
| `--ls-body` | `0em` |

### Spacing (8px base scale)

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

### Border Radius

| Token | Value |
|---|---|
| `--radius-sm` | `6px` |
| `--radius-md` | `12px` |
| `--radius-lg` | `16px` |
| `--radius-xl` | `24px` |
| `--radius-pill` | `999px` |
| `--radius-partnerships-card` | `32px` |

### Shadows

| Token | Value |
|---|---|
| `--shadow-card` | `0 2px 16px rgba(0, 0, 0, 0.06)` |
| `--shadow-btn` | `0 4px 14px rgba(61, 220, 132, 0.35)` |
| `--shadow-mockup` | `0 20px 40px rgba(0, 0, 0, 0.3)` |

### Global Colors

| Token | Hex | Swatch | Usage |
|---|---|---|---|
| `--color-black` | `#002f42` | 🟦 | Base dark navy-blue text, dark section backgrounds |
| `--color-white` | `#FFFFFF` | ⬜ | Base white, card backgrounds |
| `--color-brand-blue` | `#00a0e3` | 🟦 | Brand primary blue accent color |
| `--color-brand-dark` | `#002f42` | 🟦 | Brand dark navy-blue background color |

---

## 2. Section-by-Section Breakdown

---

### 2.1 Navbar

📄 **CSS:** `src/components/sections/Navbar/Navbar.module.css`  
📄 **TSX:** `src/components/sections/Navbar/Navbar.tsx`

**Background:**
| State | Color | Notes |
|---|---|---|
| Default (transparent) | `transparent` | No background on page load |
| Scrolled | `rgba(0, 47, 66, 0.92)` | Brand dark navy-blue with alpha, `backdrop-filter: blur(12px)` |
| Mobile Menu Overlay | `#002f42` | Brand dark navy-blue inset card with rounded corners (`28px`) |

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-nav-link` | `rgba(255,255,255,0.90)` | Nav link text |
| `--color-nav-btn-bg` | `#FFFFFF` | CTA button background |
| `--color-nav-btn-text` | `#002f42` | CTA button text |
| `--color-logo-ring` | `#FFFFFF` | Logo ring outline |

**Mobile-specific:**
- Mobile CTA button: `bg: #fff`, hover: `#f3ede2`
- Mobile links: `color: #fff`, `font-size: 2rem`
- Hamburger bars: `background-color: #fff`

---

### 2.2 Hero

📄 **CSS:** `src/components/sections/Hero/Hero.module.css`  
📄 **TSX:** `src/components/sections/Hero/Hero.tsx`

**Background:** `var(--color-hero-bg)` → **`#00a0e3`** (brand primary blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-hero-bg` | `#00a0e3` | Section background |
| `--color-hero-text` | `#FFFFFF` | Heading text |
| `--color-hero-subtext` | `rgba(255,255,255,0.85)` | Subtext paragraph |
| `--color-highlight-bar` | `#002f42` | Dark navy highlight bar behind key phrase |
| `--color-cta-primary` | `#ffffff` | White CTA button background (Hero specific override) |
| `--color-cta-primary-text` | `#002f42` | CTA button text (Hero specific override) |

**Design Notes:**
- Full viewport height (`min-height: 100vh`)
- Absolute-positioned person image on the left (`z-index: 3`) sitting above bottom linear gradient overlay
- Divider line: `rgba(255, 255, 255, 0.3)` vertical 1px
- **Gradient Bridge Transition**: Bottom `::after` pseudo-element (height: 220px, `z-index: 2`) transitions Hero blue (`#00a0e3`) through `#ffffff` (55%) into PainPoints cream (`#F3EDE2` at 100%).
- **Interactive hover state**: Hero CTA button transitions to light blue tint (`#e6f7ff`) on hover.

---

### 2.3 TrustBar

📄 **CSS:** `src/components/sections/Hero/TrustBar.module.css`  
📄 **TSX:** `src/components/sections/Hero/TrustBar.tsx`

**Background:** `var(--color-trust-bar-bg)` → **`#002f42`** (brand dark navy-blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-trust-bar-bg` | `#002f42` | Bar background |
| `--color-trust-bar-text` | `#FFFFFF` | Text and rating info |

**Design Notes:**
- Sits directly below the Hero section, sliding over the bottom of the cream gradient bridge with a curved top panel.
- Curved top panel: `border-top-left-radius: 40px`, `border-top-right-radius: 40px` and overlapping negative top margin: `margin-top: -40px` (`z-index: 4`) to blend the transitions naturally.
- Google logo badge: `background-color: #fff`, circular 24×24px

---

### 2.4 PainPoints

📄 **CSS:** `src/components/sections/PainPoints/PainPoints.module.css`  
📄 **Sub-CSS:** `src/components/sections/PainPoints/ChallengeCard.module.css`

**Background:** `var(--color-section-bg)` → **`#F3EDE2`** (warm cream/beige)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-section-bg` | `#F3EDE2` | Section background |
| `--color-section-text` | `#1A1A1A` | Heading text |
| `--color-section-subtext` | `#3A3A3A` | Body/subtext |
| `--color-badge-blue` | `#6B5CF6` | Purple badge + decorative |
| `--color-badge-blue-text` | `#FFFFFF` | Badge text |
| `--color-badge-pink` | `#C084B0` | Pink badge |
| `--color-badge-pink-text` | `#FFFFFF` | Badge text |
| `--color-card-bg` | `#FFFFFF` | Challenge card backgrounds |
| `--color-card-border-left-blue` | `#6B5CF6` | Left border accent (blue) |
| `--color-card-border-left-pink` | `#C084B0` | Left border accent (pink) |
| `--color-card-quote` | `#1A1A1A` | Card quote text |
| `--color-star-accent` | `#F97316` | Orange star decorative element |
| `--color-card-radius` | `1rem` | Card border radius |

---

### 2.5 Partner

📄 **CSS:** `src/components/sections/Partner/Partner.module.css`  
📄 **Sub-CSS:** `src/components/sections/Partner/TabletMockup.module.css`

**Background:** `var(--color-black)` → **`#002f42`** (brand dark navy-blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Section background |
| `--color-partner-text` | `#FFFFFF` | Primary text |
| `--color-partner-subtext` | `rgba(255,255,255,0.7)` | Secondary text |
| `--color-partner-purple` | `#00a0e3` | Brand blue accent |
| `--color-partner-peach` | `#FFAE8A` | Peach accent |
| `--color-partner-teal` | `#7BE5D9` | Teal accent |
| `--color-partner-grid` | `rgba(255,255,255,0.08)` | Grid lines |
| `--color-cta-primary` | `#00a0e3` | Brand blue bullet dots with glow |
| `--text-partner-title` | `clamp(1.8rem, 3vw, 2.3rem)` | Block title size |

**Design Notes:**
- Curved top borders: `border-top-left-radius: 40px; border-top-right-radius: 40px`
- Looping arrow SVG with floating animation (4s infinite ease-in-out)
- 2-column grid: visual mockup left, service blocks right

---

### 2.6 CaseStudies

📄 **CSS:** `src/components/sections/CaseStudies/CaseStudies.module.css`  
📄 **Sub-CSS:** `src/components/sections/CaseStudies/MobileScreen.module.css`

**Background:** `var(--color-black)` → **`#002f42`** (brand dark navy-blue outer wrapper)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Section outer background |
| `--color-casestudies-bg` | `#00a0e3` | Brand blue tablet frame |
| `--color-casestudies-grid` | `rgba(255,255,255,0.08)` | Blueprint grid pattern |
| `--color-casestudies-card-black` | `#002f42` | Left phone dark navy bg |
| `--color-casestudies-purple-highlight` | `#00a0e3` | Brand blue text accent |
| `--color-casestudies-card-teal` | `#C0EFEA` | Middle phone mint bg |
| `--color-casestudies-card-beige` | `#F5EFE4` | Right phone cream bg |

**Design Notes:**
- Giant purple tablet with 48px border-radius
- CSS repeating grid pattern for blueprint look
- Three tilted mobile mockups inside tablet frame
- Home indicator bar: `rgba(26, 26, 46, 0.35)`

---

### 2.7 Mission

📄 **CSS:** `src/components/sections/Mission/Mission.module.css`

**Background:** `var(--color-black)` → **`#002f42`** (brand dark navy-blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Section background |
| `--color-white` | `#FFFFFF` | Headline text |
| `--color-cta-primary` | `#00a0e3` | Brand blue highlighted words |
| `--color-mission-circles` | `rgba(0, 160, 227, 0.18)` | Concentric blue circles (left) |
| `--color-mission-arrow` | `#E58E6B` | Hand-drawn orange arrow |
| `--color-mission-triangle` | `#FFD257` | Solid yellow triangle (top-right) |
| `--text-mission-heading` | `clamp(2.2rem, 5.5vw, 4.2rem)` | Display heading size |

**Design Notes:**
- Subtext: `rgba(255, 255, 255, 0.85)`
- Floating animations on arrow (4.5s) and triangle (7s)
- Brand blue highlight hover: `text-shadow: 0 0 20px rgba(0, 160, 227, 0.25)`

---

### 2.8 Testimonials

📄 **CSS:** `src/components/sections/Testimonials/Testimonials.module.css`

**Background (outer):** `var(--color-black)` → **`#002f42`**  
**Background (curved panel):** `var(--color-testimonials-bg)` → **`#FAF8F5`** (warm off-white beige)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Outer wrapper |
| `--color-testimonials-bg` | `#FAF8F5` | Main panel background |
| `--color-white` | `#FFFFFF` | Card backgrounds |
| `--color-testimonials-border` | `rgba(0,0,0,0.06)` | Card borders |
| `--color-rating-star` | `#FFB000` | Gold star rating |

**Additional Hardcoded Colors:**
- Rating text: `#002f42` (brand navy)
- User date: `#8C8C8C`
- Review text: `rgba(0, 47, 66, 0.75)` (brand navy tint)
- Card hover shadow: `rgba(0, 0, 0, 0.06)`

**Design Notes:**
- Curved top panel: `border-radius: 40px 40px 0 0`
- Horizontal draggable carousel with momentum scrolling
- Fade gradients on edges (using `--color-testimonials-bg`)
- Cards: 24px border-radius, 28px gap

---

### 2.9 RecentCaseStudies

📄 **CSS:** `src/components/sections/RecentCaseStudies/RecentCaseStudies.module.css`

**Background:** `var(--color-black)` → **`#002f42`** (brand dark navy-blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Section background |
| `--color-white` | `#FFFFFF` | Heading, card titles |
| `--color-recentcasestudies-grj-bg` | `#002f42` | GRJ card container |
| `--color-recentcasestudies-twolist-bg` | `#ff1e76` | Twolist card container (hot pink) |
| `--color-recentcasestudies-text-muted` | `#a0a0ab` | Subheading text |
| `--color-recentcasestudies-badge-border` | `rgba(255,255,255,0.2)` | Badge border |
| `--color-badge-blue` | `#00a0e3` | Award card 3 background |
| `--color-trust-bar-bg` | `#002f42` | Award card 4 background |

**Additional Hardcoded Colors:**
- GRJ tablet border: `#001e2e`, screen: `#00304a`
- Search CTA button: `#f59e0b` (amber)
- Phone device: `#000000` border, `#222222` frame
- Twolist logo icon bg: `--color-recentcasestudies-twolist-bg` (`#ff1e76`)
- Checked circle: `#10b981` (emerald green)
- Tag badges: `rgba(255, 255, 255, 0.08)`

**Design Notes:**
- Curved top: `border-radius: 48px 48px 0 0` with `-48px` overlap
- 2-column grid with device mockups (tablet + phone)
- Phone 3D perspective: `rotateY(-8deg) rotateX(8deg) rotateZ(-3deg)`

---

### 2.10 CoreValues

📄 **CSS:** `src/components/sections/CoreValues/CoreValues.module.css`

**Background (outer):** `var(--color-black)` → **`#002f42`** (brand dark navy-blue)  
**Background (curved panel):** `var(--color-section-bg)` → **`#F3EDE2`** (warm cream)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-black` | `#002f42` | Outer wrapper |
| `--color-section-bg` | `#F3EDE2` | Inner curved panel |
| `--color-section-text` | `#002f42` | Headings, card titles |
| `--color-section-subtext` | `rgba(0, 47, 66, 0.70)` | Body text, descriptions |

**Additional Hardcoded Colors:**
- Icon circle fill: `#c5eaf7` (light sky blue)
- Icon circle hover: `#aedff2`
- Icon circle border: `#00a0e3` (brand blue)
- Icon circle outline: `rgba(0, 160, 227, 0.2)`
- Icon stroke color: `#002f42`

**Design Notes:**
- Curved inner panel: `border-radius: 40px 40px 0 0`
- 2×2 grid layout for value cards
- Each card: icon circle (90px) + text content
- Icon circle hover: subtle scale `1.04` + `box-shadow` glow

---

### 2.11 Partnerships

📄 **CSS:** `src/components/sections/Partnerships/Partnerships.module.css`

**Background (outer):** **`#f3ede2`** (hardcoded cream)  
**Background (curved panel):** `var(--color-partnerships-bg)` → **`#fff`** (pure white)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-partnerships-bg` | `#FFFFFF` | Inner panel |
| `--color-partnerships-filter-bg-active` | `#00a0e3` | Active filter pill |
| `--color-partnerships-card-border-dashed` | `#E2E8F0` | Dashed card dividers |
| `--radius-partnerships-card` | `32px` | Card border radius |
| `--color-black` | `#1A1A1A` | Headings, titles |
| `--color-white` | `#FFFFFF` | Card graphic text, avatars |

**Card Graphic Backgrounds (per-card):**

| Card | Background | Hex |
|---|---|---|
| Zoom | `.zoomBg` | `#0f70f3` (Zoom blue) |
| Soft Skills | `.skillsBg` | `#1d3557` (dark navy) |
| Laurence | `.laurenceBg` | `#e76f51` (terracotta) |
| Freelance | `.freelanceBg` | `#6c5ce7` (vibrant purple) |
| AI | `.aiBg` | `radial-gradient(#1e1b4b → #090514)` |
| Figma | `.figmaBg` | `#1e1e1e` (Figma dark) |
| Content | `.contentBg` | `#f8fafc` (light slate) |

**Additional Hardcoded Colors:**
- Filter pill text: `#475569`
- Filter pill hover bg: `#F8FAFC`
- Filter bar border: `#F1F5F9`
- Date text: `#64748b`
- Tag badges: `bg: #f1f5f9, color: #475569`
- Skills highlight: `bg: #f59e0b, color: #1d3557`
- Figma brand dots: `#f24e1e`, `#ff7262`, `#a259ff`, `#1abc9c`, `#0acf83`
- Figma selection blue: `#0c8ce9`
- AI glow: `rgba(99, 102, 241, 0.15)`
- AI status badge: `bg: rgba(129, 140, 248, 0.15)`, dot: `#818cf8`

---

### 2.12 Pathway

📄 **CSS:** `src/components/sections/Pathway/Pathway.module.css`

**Background (outer):** **`#F3EDE2`** (hardcoded cream — matches Partnerships)  
**Background (curved inner):** **`var(--color-black)`** (`#002f42` brand navy)

**Theme Colors Used:**

| Token/Color | Hex | Usage |
|---|---|---|
| `#F3EDE2` | (hardcoded) | Outer section |
| `var(--color-black)` | `#002f42` | Curved inner dark panel |
| `--color-white` | `#FFFFFF` | Headings, step titles |
| `#32c878` | (hardcoded) | Legacy green accent (unused, updated to brand blue `#00a0e3`) |
| `#00a0e3` | (hardcoded) | Brand blue accent: connector line, step badges, checkmarks |

**Step Badge Styling:**
- Border: `2px solid #00a0e3`
- Background: `var(--color-black)`
- Glow: `box-shadow: 0 0 20px rgba(0, 160, 227, 0.3)`

**Mockup Card Backgrounds (5 steps):**

| Step | Card Class | Background |
|---|---|---|
| 1. Discovery | `.discoveryCard` | `#cde8f0` (light blue) |
| 2. UX Design | `.uxCard` | `#f5efe0` (warm beige) |
| 3. Brand | `.brandCard` | `#f5c518` (golden yellow) |
| 4. Design Direction | `.directionCard` | `#f0f2f5` (cool gray) |
| 5. UI Delivery | `.deliveryCard` | `#002f42` (brand dark navy) |

**Mockup Interior Accent Colors:**
- Discovery sticky notes: `#f5d060` (yellow)
- Discovery dots: `#f5c518` (yellow), `#22c55e` (green), `#a78bfa` (purple)
- UX flowchart blocks: `#f8b4d4` (pink), `#fde68a` (yellow), `#c4b5fd` (purple)
- UX diamond: `#38bdf8` (sky blue)
- Brand blobs: `#e84848` (red), `#f97316` (orange)
- Direction creative grid: `#22c55e` (green), `#3b82f6` (blue), `#a855f7` (purple), `#eab308` (yellow)
- Delivery chart bars: `#3b82f6` (blue), `#22c55e` (green), `#a855f7` (purple), `#ec4899` (pink)
- Delivery slider fill: `#32c878` (green)

**Design Notes:**
- Curved top panel: `border-radius: 40px 40px 0 0`
- Timeline with animated green connector line (`scaleY(0)` → `scaleY(1)`)
- 3-column grid per step: left mockup | center badge | right text
- Horizontal dividers: `rgba(255, 255, 255, 0.15)`

---

### 2.13 Footer

📄 **CSS:** `src/components/sections/Footer/Footer.module.css`

**Background:** **`var(--color-black)`** (`#002f42` brand navy)

**Theme Colors Used:**

| Color | Hex/Token | Usage |
|---|---|---|
| `var(--color-black)` | `#002f42` | Footer background |
| `--color-white` | `#FFFFFF` | Heading text, column headings |
| `var(--color-cta-primary)` | `#00a0e3` | Brand blue CTA pill button |
| `var(--color-cta-primary-text)` | `#ffffff` | CTA button text |
| `#f0b8b8` | (hardcoded) | Avatar fallback pink |

**Text Opacity Levels:**
- Article links: `rgba(255, 255, 255, 0.55)` → hover `0.9`
- Nav links: `rgba(255, 255, 255, 0.55)` → hover `0.95`
- Contact info: `rgba(255, 255, 255, 0.7)` → hover `1.0`
- Legal text: `rgba(255, 255, 255, 0.3)`
- Section dividers: `rgba(255, 255, 255, 0.08)`

**Social Icons:**
- Border: `rgba(255, 255, 255, 0.25)`
- Hover border: `rgba(255, 255, 255, 0.7)`
- Hover bg: `rgba(255, 255, 255, 0.06)`

**Design Notes:**
- Three zones: CTA section → Links grid (3-col) → Legal bar
- CTA heading: `clamp(2.8rem, 7vw, 5.5rem)`
- CTA button glow on hover: `var(--shadow-btn)` (0 4px 14px rgba(0, 160, 227, 0.35))

---

### 2.14 FloatingChat

📄 **CSS:** `src/components/ui/FloatingChat/FloatingChat.module.css`

**Background:** `var(--color-chat-yellow)` → **`#00a0e3`** (brand primary blue)

**Theme Colors Used:**

| Token | Hex | Usage |
|---|---|---|
| `--color-chat-yellow` | `#00a0e3` | Chat bubble background |
| `--color-chat-border` | `rgba(255,255,255,0.8)` | Rotating dashed outer border |

**Design Notes:**
- Fixed position floating element
- Rotating dashed border animation
- Appears over all sections with high z-index

---

## 3. Section Flow & Color Transitions

The site uses a deliberate **alternating dark/light rhythm** with curved panel transitions for visual depth:

```
┌────────────────────────────────────────┐
│  NAVBAR         transparent → blur     │
├────────────────────────────────────────┤
│  HERO           #00a0e3  (brand blue)  │ ← LIGHT/MEDIUM
├────────────────────────────────────────┤
│  TRUSTBAR       #002f42  (brand dark)  │ ← DARK
├────────────────────────────────────────┤
│  PAINPOINTS     #F3EDE2  (warm cream)  │ ← LIGHT
├───────────── curved top ──────────────┤
│  PARTNER        #002f42  (brand dark)  │ ← DARK
├────────────────────────────────────────┤
│  CASESTUDIES    #002f42  (brand dark)  │ ← DARK
│    └ tablet:    #8E7DF0  (purple)      │
├────────────────────────────────────────┤
│  MISSION        #002f42  (brand dark)  │ ← DARK
├───────────── curved top ──────────────┤
│  TESTIMONIALS   #FAF8F5  (off-white)   │ ← LIGHT
├───────────── curved top (overlap) ────┤
│  RECENTCASES    #002f42  (brand dark)  │ ← DARK
├────────────────────────────────────────┤
│  COREVALUES     #002f42 → #F3EDE2      │ ← DARK → LIGHT (curved)
├────────────────────────────────────────┤
│  PARTNERSHIPS   #f3ede2 → #FFFFFF      │ ← LIGHT (curved)
├────────────────────────────────────────┤
│  PATHWAY        #F3EDE2 → #002f42      │  ← LIGHT → DARK (curved)
├────────────────────────────────────────┤
│  FOOTER         #002f42  (brand navy)  │  ← DARK
└────────────────────────────────────────┘
```

### Curved Panel Technique

Multiple sections use the same "curved panel" design pattern:
1. **Outer wrapper** has one background color
2. **Inner `.curvedPanel`** has a different background with `border-top-left-radius: 40px; border-top-right-radius: 40px`
3. Creates a smooth visual transition between color zones

**Sections using this pattern:**
- `Testimonials` (black outer → `#FAF8F5` inner)
- `CoreValues` (black outer → `#F3EDE2` inner)
- `Partnerships` (`#f3ede2` outer → white inner)
- `Pathway` (`#F3EDE2` outer → `#002f42` inner)

---

## 4. File References

### CSS Module Files

| Section | CSS File |
|---|---|
| Navbar | `src/components/sections/Navbar/Navbar.module.css` |
| Hero | `src/components/sections/Hero/Hero.module.css` |
| TrustBar | `src/components/sections/Hero/TrustBar.module.css` |
| PainPoints | `src/components/sections/PainPoints/PainPoints.module.css` |
| PainPoints (cards) | `src/components/sections/PainPoints/ChallengeCard.module.css` |
| Partner | `src/components/sections/Partner/Partner.module.css` |
| Partner (tablet) | `src/components/sections/Partner/TabletMockup.module.css` |
| CaseStudies | `src/components/sections/CaseStudies/CaseStudies.module.css` |
| CaseStudies (screens) | `src/components/sections/CaseStudies/MobileScreen.module.css` |
| Mission | `src/components/sections/Mission/Mission.module.css` |
| Testimonials | `src/components/sections/Testimonials/Testimonials.module.css` |
| RecentCaseStudies | `src/components/sections/RecentCaseStudies/RecentCaseStudies.module.css` |
| CoreValues | `src/components/sections/CoreValues/CoreValues.module.css` |
| Partnerships | `src/components/sections/Partnerships/Partnerships.module.css` |
| Pathway | `src/components/sections/Pathway/Pathway.module.css` |
| Footer | `src/components/sections/Footer/Footer.module.css` |
| FloatingChat | `src/components/ui/FloatingChat/FloatingChat.module.css` |

### Design Token Source

| File | Purpose |
|---|---|
| `src/app/globals.css` | All CSS custom properties (`:root`), global reset, body defaults |

### Animation Engine

| File | Purpose |
|---|---|
| `src/lib/animations.ts` | GSAP + ScrollTrigger registration and shared animation utilities |

---

> **Note:** All components using animations include `'use client';` directives for Next.js App Router compatibility. GSAP plugins are registered only on the client side (`typeof window !== 'undefined'` guard).

# Explore More Articles — Implementation Plan

## What Was Built

A centred **"Explore More Articles"** CTA button added at the bottom of the Blog section, linking to Dr. Senthil's LinkedIn articles page and opening in a new tab.

---

## Implementation Summary

### Files Changed

| File | Change |
|------|--------|
| `src/types/index.ts` | Added `target` and `rel` to `ButtonProps` |
| `src/components/ui/Button/Button.tsx` | Pass `target` and `rel` to the `<a>` element |
| `src/components/sections/Blog/Blog.tsx` | Import `Button`, add `<div className={styles.exploreWrap}>` below the grid |
| `src/components/sections/Blog/Blog.module.css` | Add `.exploreWrap` centering styles |

---

## Button Design Decisions

### Variant: `primary`
- Background: `var(--color-cta-primary)` — matches the site's main CTA colour (dark navy `#002F42`)
- Text: `var(--color-cta-primary-text)` — white
- Shape: pill (`border-radius: var(--radius-pill)`)
- Shadow: `var(--shadow-btn)`

### Size: `lg`
- Padding: `var(--space-4) var(--space-12)`
- Font size: `clamp(1rem, 1.2vw, 1.1rem)`
- Visually prominent without overwhelming the blog grid

### Hover behaviour (inherited from Button.module.css)
```css
.btn:hover {
  opacity: 0.92;
  transform: translateY(-1px);
}
```

---

## Layout

```css
.exploreWrap {
  display: flex;
  justify-content: center;
  margin-top: clamp(56px, 6vw, 80px);  /* responsive gap from grid */
}
```

- Fluid top margin: `56px` (mobile) → `80px` (wide desktop)
- Button stays centred at all breakpoints

---

## Link Target

```
https://www.linkedin.com/in/senthiltamilarasan/recent-activity/articles/
```

Opens in `_blank` with `rel="noopener noreferrer"` for security.

---

## Future Options (if needed)

| Option | Description |
|--------|-------------|
| `variant="outline"` | Add an `outline` variant to Button for a lighter look |
| Arrow icon | Append `→` or an SVG arrow inside the button children |
| LinkedIn icon | Add the LinkedIn logo SVG before the label text |
| Section-aware bg | If the Blog bg changes, swap to a ghost/outline button variant |

# Speaking Slot Modal — Implementation Plan

## Overview

Replace the `mailto:` link on the **"Book a Speaking Slot"** button in the Partnerships / Speaking section with a popup form modal. The form collects the same fields as the existing consultation form, plus a new **Message** field specific to speaking slot bookings. Both forms submit to the same Google Sheet endpoint with different `service` values.

---

## Google Sheet Key Mapping

| Form | `service` value | `form_name` value |
|------|----------------|-------------------|
| Book Consultation (existing) | `Practice Growth Consultation` | `Practice Growth Consultation` |
| Book a Speaking Slot (new) | `Speaking Slot` | `Book a Speaking Slot` |

All other shared keys: `name`, `mobile`, `email`, `organization`, `location`, `page_name`, `utm_source`, `ip_address`, `ip`.

New key for speaking slot only: `message` — Organisation/Event/Topics details.

---

## Files Changed / Created

### 1. `src/lib/consultationLead.ts`

**Changes:**
- Fix existing `buildConsultationPayload` → `service: 'Practice Growth Consultation'`, `form_name: 'Practice Growth Consultation'`
- Add `SpeakingSlotFormValues` interface (name, mobile, email, organization, location, message)
- Add `speakingSlotValidationSchema` (Yup) — message field: required, min 10 chars
- Add `speakingSlotInitialValues`
- Add `buildSpeakingSlotPayload(values)` → sends `service: 'Speaking Slot'`, `form_name: 'Book a Speaking Slot'`, all shared fields + `message`

### 2. `src/components/ui/SpeakingModal/SpeakingModal.tsx` *(new)*

**Component structure:**
```
<SpeakingModal isOpen={bool} onClose={fn}>
  overlay (backdrop, click to close)
  panel (white card, centered)
    close button ×
    title "Book A Speaking Slot"
    form (Formik)
      [name, mobile]      ← 2-col row
      [email]             ← full width
      [organization]      ← full width
      [location]          ← full width
      [message textarea]  ← full width, 4 rows
      submit button "Book a Speaking Slot"
      status message (success / error)
```

**Behaviour:**
- Modal opens when `isOpen=true`, closes on `×` button or backdrop click
- Pressing `Escape` also closes the modal
- Focus trap for accessibility
- On success: show success message + auto-close after 3s
- `body` scroll locked while modal is open

### 3. `src/components/ui/SpeakingModal/SpeakingModal.module.css` *(new)*

**Key CSS:**
- `.overlay` — `position: fixed; inset: 0; background: rgba(0,47,66,0.6); z-index: 1000; display: flex; align-items: center; justify-content: center;`
- `.panel` — `background: white; border-radius: 24px; max-width: 640px; width: 90%; padding: 48px; max-height: 90vh; overflow-y: auto;`
- `.closeBtn` — absolute top-right pill button
- `.form` — `display: grid; grid-template-columns: 1fr 1fr; gap: 24px;`
- `.fieldFull` — `grid-column: 1 / -1;`
- `.textarea` — same style as `.input` but `height: auto; padding: 16px 20px; resize: vertical; min-height: 110px;`

### 4. `src/components/ui/SpeakingModal/index.ts` *(new)*

```ts
export { SpeakingModal } from './SpeakingModal';
```

### 5. `src/components/sections/Partnerships/Partnerships.tsx`

**Changes:**
- Import `SpeakingModal` from `@/components/ui/SpeakingModal`
- Add `useState` for `isSpeakingModalOpen` (default `false`)
- Replace `<a className={styles.speakingButton} href="mailto:...">Book a Speaking Slot</a>` with:
  ```tsx
  <button
    className={styles.speakingButton}
    onClick={() => setIsSpeakingModalOpen(true)}
    type="button"
  >
    Book a Speaking Slot
  </button>
  ```
- Render `<SpeakingModal isOpen={isSpeakingModalOpen} onClose={() => setIsSpeakingModalOpen(false)} />` at end of section

---

## Data Flow

```
User clicks "Book a Speaking Slot"
  → setIsSpeakingModalOpen(true)
  → <SpeakingModal> renders with overlay

User fills form and submits
  → Formik validates
  → buildSpeakingSlotPayload(values)
     {
       name, mobile (+91 prefix), email,
       organization, location,
       message,
       service: "Speaking Slot",
       form_name: "Book a Speaking Slot",
       page_name: "senthilsir-portfolio",
       utm_source, ip_address, ip
     }
  → submitConsultationToGoogleSheet(payload)
     POST to Google Apps Script endpoint
  → Success: show message, auto-close in 3s
  → Error: show retry message
```

---

## Existing Form Update

The existing `BookConsultation` form currently sends `service: 'Book a Consultation'`.
Updated to `service: 'Practice Growth Consultation'` to match the required key mapping.

---

## Future Options

| Option | Description |
|--------|-------------|
| Animation | Fade-in / scale-up modal with GSAP (consistent with other animations) |
| Multi-step form | Split into step 1 (contact) → step 2 (event details) |
| Calendly integration | Embed Calendly after form success |
| Separate Google Sheet tab | Route speaking submissions to a different sheet tab |

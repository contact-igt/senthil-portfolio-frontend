# Thank You Popup For All Forms - Implementation Plan

## Goal

Create one reusable **Thank You popup** for every successful form submission on this page. The popup should be inspired by the reference image, but styled to match this website theme: white modal card, dark teal overlay, black/navy text, brand blue accent, rounded controls, and clean social icons.

The popup content should change dynamically based on which form was submitted.

Forms to cover:

| Form | Current Component | Current Success Handling |
|------|-------------------|--------------------------|
| Practice Growth Consultation | `src/components/sections/BookConsultation/BookConsultation.tsx` | Inline Formik status message below form. |
| Book a Speaking Slot | `src/components/ui/SpeakingModal/SpeakingModal.tsx` | Inline Formik status message inside modal, then closes after 3 seconds. |
| Psychology of Medical Practice Pre-Book | `src/components/ui/PreBookModal/PreBookModal.tsx` | Inline Formik status message inside modal, then closes after 3 seconds. |

## Required Result

After any form is submitted successfully:

1. Form validates successfully.
2. Payload submits to Google Sheet successfully.
3. Form resets.
4. Old inline success message should be commented out or removed from display.
5. A separate themed Thank You popup opens.
6. Popup shows a success icon, dynamic title, dynamic message, optional contact line, and social icons.
7. User can close the popup using close button, backdrop click, or Escape key.

Error messages should stay inside the form because users need to see what failed and try again.

## Design Direction

Use the attached reference image only as a structural reference, not as exact styling.

Reference structure:

```text
dark page overlay
  centered white popup card
    close button
    large success icon
    THANK YOU title
    short message
    optional phone/email line
    FOLLOW US label
    social icon row
```

Website theme adaptation:

| Element | Theme Style |
|---------|-------------|
| Overlay | `rgba(0, 47, 66, 0.65)` or close to existing modal overlays. |
| Card | White background, `24px` border radius, existing modal shadow style. |
| Accent | Use `var(--color-cta-primary)` or `var(--color-brand-blue)`. |
| Text | Use `var(--color-black)` for title and muted navy for body text. |
| Icon | Brand blue circular check icon, with small decorative line/pulse optional. |
| Social icons | Circular outline buttons using the existing Instagram, YouTube, LinkedIn, Facebook icon style. |
| Animation | Reuse existing `fadeIn` and `slideUp` modal animation pattern. |

Do not copy the reference popup colors exactly. Keep the final popup aligned with existing `PreBookModal` and `SpeakingModal` UI.

## New Component

Create a shared component:

```text
src/components/ui/ThankYouPopup/
  ThankYouPopup.tsx
  ThankYouPopup.module.css
  index.ts
```

## Component API

Recommended props:

```tsx
export interface ThankYouPopupContent {
  eyebrow?: string;
  title: string;
  message: string;
  contactLabel?: string;
  contactHref?: string;
  followLabel?: string;
}

interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: ThankYouPopupContent;
}
```

Reason:

- `isOpen` controls popup visibility.
- `onClose` allows every form to close the popup independently.
- `content` lets each form show different thank-you text without duplicating the popup UI.

## Dynamic Content Map

Create content constants in either:

```text
src/components/ui/ThankYouPopup/thankYouContent.ts
```

or keep them near each form if the text is very form-specific.

Recommended shared content file:

```ts
export const THANK_YOU_CONTENT = {
  consultation: {
    eyebrow: 'Request Received',
    title: 'Thank you.',
    message: 'Your practice growth consultation request has been received. Our team will get back to you shortly.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
  speaking: {
    eyebrow: 'Speaking Request Received',
    title: 'Thank you.',
    message: 'Your speaking slot request has been received. We will review the details and contact you shortly.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
  prebook: {
    eyebrow: 'Pre-Booking Interest Received',
    title: 'Thank you.',
    message: 'Your interest in Psychology of Medical Practice has been received. We will share launch updates and pre-booking information with you soon.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
} as const;
```

## Social Icons

Use the same social platforms already used in `ReadyConsultation.tsx`:

```text
instagram
youtube
linkedin
facebook
```

Recommended implementation:

- Move or duplicate the existing SVG icon functions from `ReadyConsultation.tsx` into `ThankYouPopup.tsx` or a small reusable file.
- Display icons inside circular buttons.
- Use brand theme colors, not grey-only icons.
- Open links in a new tab with `target="_blank"` and `rel="noopener noreferrer"`.

Example social link shape:

```ts
const SOCIAL_LINKS = [
  {
    platform: 'instagram',
    href: 'https://www.instagram.com/',
    ariaLabel: 'Follow Dr. Senthil on Instagram',
  },
  {
    platform: 'youtube',
    href: 'https://www.youtube.com/',
    ariaLabel: 'Follow Dr. Senthil on YouTube',
  },
  {
    platform: 'linkedin',
    href: 'https://www.linkedin.com/',
    ariaLabel: 'Follow Dr. Senthil on LinkedIn',
  },
  {
    platform: 'facebook',
    href: 'https://www.facebook.com/',
    ariaLabel: 'Follow Dr. Senthil on Facebook',
  },
];
```

Before implementation, replace placeholder URLs with the correct official profile URLs.

## Thank You Popup Markup Plan

Suggested JSX structure:

```tsx
const modal = (
  <div
    className={styles.overlay}
    role="dialog"
    aria-modal="true"
    aria-labelledby="thank-you-popup-title"
    onClick={(event) => {
      if (event.target === event.currentTarget) onClose();
    }}
  >
    <div className={styles.panel}>
      <button className={styles.closeBtn} onClick={onClose} aria-label="Close thank you popup" type="button">
        ×
      </button>

      <div className={styles.iconWrap} aria-hidden="true">
        <div className={styles.successIcon}>
          <svg viewBox="0 0 24 24">
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </div>
      </div>

      {content.eyebrow && <p className={styles.eyebrow}>{content.eyebrow}</p>}

      <h2 id="thank-you-popup-title" className={styles.title}>
        {content.title}
      </h2>

      <p className={styles.message}>{content.message}</p>

      {content.contactLabel && content.contactHref && (
        <a className={styles.contactLink} href={content.contactHref}>
          {content.contactLabel}
        </a>
      )}

      <p className={styles.followLabel}>{content.followLabel || 'Follow Us'}</p>

      <div className={styles.socialRow}>
        {SOCIAL_LINKS.map((link) => {
          const Icon = ICON_MAP[link.platform];
          return (
            <a key={link.platform} className={styles.socialIcon} href={link.href} target="_blank" rel="noopener noreferrer" aria-label={link.ariaLabel}>
              <Icon />
            </a>
          );
        })}
      </div>
    </div>
  </div>
);
```

## Success Icon Style

Use a clean check mark icon, not an image asset.

Recommended CSS direction:

```css
.iconWrap {
  display: flex;
  justify-content: center;
  margin-bottom: 18px;
}

.successIcon {
  width: 86px;
  height: 86px;
  border-radius: 50%;
  background: rgba(0, 160, 227, 0.1);
  border: 2px solid rgba(0, 160, 227, 0.28);
  color: var(--color-cta-primary);
  display: grid;
  place-items: center;
}

.successIcon svg {
  width: 42px;
  height: 42px;
  fill: none;
  stroke: currentColor;
  stroke-width: 2.8;
  stroke-linecap: round;
  stroke-linejoin: round;
}
```

Optional animation:

- Scale icon from `0.84` to `1`.
- Fade popup from `0` to `1`.
- Slide popup from `20px` down to normal position.

## Thank You Popup CSS Plan

File:

```text
src/components/ui/ThankYouPopup/ThankYouPopup.module.css
```

Recommended classes:

| Class | Purpose |
|-------|---------|
| `.overlay` | Fixed full screen backdrop. |
| `.panel` | Centered white popup card. |
| `.closeBtn` | Top-right close button. |
| `.iconWrap` | Centers the success icon. |
| `.successIcon` | Brand blue circular check icon. |
| `.eyebrow` | Small status label above title. |
| `.title` | Main thank-you heading. |
| `.message` | Dynamic message text. |
| `.contactLink` | Email or phone link. |
| `.followLabel` | Social section label. |
| `.socialRow` | Social icons container. |
| `.socialIcon` | Circular social icon button. |

Responsive requirements:

- Desktop width: `min(560px, 100%)`.
- Mobile width: `100%` minus overlay padding.
- Mobile panel padding: about `28px 20px 24px`.
- Ensure title and message never overflow.
- Keep social icons centered and evenly spaced.

## Accessibility Requirements

The popup should:

- Use `role="dialog"`.
- Use `aria-modal="true"`.
- Use `aria-labelledby` pointing to the popup title.
- Close on Escape key.
- Close on backdrop click.
- Lock body scroll while open.
- Restore body scroll on close.
- Use real anchor tags for social links.
- Use meaningful `aria-label` for each social icon.

## Integration Plan - Practice Consultation Form

File:

```text
src/components/sections/BookConsultation/BookConsultation.tsx
```

Add imports:

```tsx
import { useState } from 'react';
import { ThankYouPopup } from '@/components/ui/ThankYouPopup';
import { THANK_YOU_CONTENT } from '@/components/ui/ThankYouPopup/thankYouContent';
```

Add state:

```tsx
const [isThankYouOpen, setIsThankYouOpen] = useState(false);
```

Update success submit flow:

```tsx
await submitConsultationToGoogleSheet(payload);
helpers.resetForm({ values: consultationInitialValues });

// Old inline success message - commented out because success now opens ThankYouPopup.
// helpers.setStatus({ type: 'success', message: 'Thank you! Your request has been received. We will get back to you shortly.' });

setIsThankYouOpen(true);
```

Keep error status:

```tsx
helpers.setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again or email directly.' });
```

Render the popup near the end of the component:

```tsx
<ThankYouPopup
  isOpen={isThankYouOpen}
  onClose={() => setIsThankYouOpen(false)}
  content={THANK_YOU_CONTENT.consultation}
/>
```

Update inline status rendering so success is not displayed inline:

```tsx
{formik.status?.message && formik.status.type === 'error' && (
  <div className={`${styles.statusText} ${styles.errorText}`}>
    {formik.status.message}
  </div>
)}
```

## Integration Plan - Speaking Slot Modal

File:

```text
src/components/ui/SpeakingModal/SpeakingModal.tsx
```

Add imports:

```tsx
import { ThankYouPopup } from '@/components/ui/ThankYouPopup';
import { THANK_YOU_CONTENT } from '@/components/ui/ThankYouPopup/thankYouContent';
```

Add state:

```tsx
const [isThankYouOpen, setIsThankYouOpen] = useState(false);
```

Update success submit flow:

```tsx
await submitConsultationToGoogleSheet(payload);
helpers.resetForm();

// Old inline success message - commented out because success now opens ThankYouPopup.
// helpers.setStatus({
//   type: 'success',
//   message: 'Thank you! Your speaking slot request has been received. We will get back to you shortly.',
// });

onClose();
setIsThankYouOpen(true);
```

Important:

- Remove or stop using the `setTimeout(() => onClose(), 3000)` success behavior.
- Close the speaking form modal immediately after success.
- Then open the Thank You popup.
- Keep inline error status inside the speaking modal.

Render `ThankYouPopup` from `SpeakingModal` even when the form modal is closed.

To support this, do not return `null` for the entire component before rendering the thank-you popup. Use this pattern:

```tsx
return (
  <>
    {isOpen && mounted && createPortal(speakingModal, document.body)}
    <ThankYouPopup
      isOpen={isThankYouOpen}
      onClose={() => setIsThankYouOpen(false)}
      content={THANK_YOU_CONTENT.speaking}
    />
  </>
);
```

## Integration Plan - Pre-Book Modal

File:

```text
src/components/ui/PreBookModal/PreBookModal.tsx
```

Add imports:

```tsx
import { useEffect, useCallback, useState } from 'react';
import { ThankYouPopup } from '@/components/ui/ThankYouPopup';
import { THANK_YOU_CONTENT } from '@/components/ui/ThankYouPopup/thankYouContent';
```

Add state:

```tsx
const [isThankYouOpen, setIsThankYouOpen] = useState(false);
```

Update success submit flow:

```tsx
await submitConsultationToGoogleSheet(payload);
helpers.resetForm();

// Old inline success message - commented out because success now opens ThankYouPopup.
// helpers.setStatus({
//   type: 'success',
//   message: 'Thank you! Your pre-booking interest has been received. We will share launch updates and pre-booking information with you soon.',
// });

onClose();
setIsThankYouOpen(true);
```

Important:

- Remove or stop using `setTimeout(() => onClose(), 3000)` for success.
- Keep error status inside the form modal.
- Make sure the Thank You popup can render after the pre-book modal closes.

Use this return pattern:

```tsx
return (
  <>
    {isOpen && typeof document !== 'undefined' && createPortal(preBookModal, document.body)}
    <ThankYouPopup
      isOpen={isThankYouOpen}
      onClose={() => setIsThankYouOpen(false)}
      content={THANK_YOU_CONTENT.prebook}
    />
  </>
);
```

## Old Success Message Handling

The user requested old thank-you messages to be commented out.

Recommended handling:

1. Comment out the old `helpers.setStatus({ type: 'success', ... })` block in each form.
2. Keep the old text in comments for future reference.
3. Update JSX so inline status messages only render for errors.
4. Do not comment out error status handling.

Example:

```tsx
// Old inline success message replaced by ThankYouPopup.
// helpers.setStatus({ type: 'success', message: 'Thank you! Your request has been received. We will get back to you shortly.' });
setIsThankYouOpen(true);
```

## State Management Notes

Each form can own its own thank-you popup state.

This is the simplest implementation because:

- No global provider is required.
- Each form passes its own dynamic content.
- Existing form components need only small changes.
- The popup remains reusable.

Alternative future option:

- Create a global `ThankYouProvider` if many more forms are added later.

For the current page, local state is enough.

## File Change Summary

New files:

```text
src/components/ui/ThankYouPopup/ThankYouPopup.tsx
src/components/ui/ThankYouPopup/ThankYouPopup.module.css
src/components/ui/ThankYouPopup/thankYouContent.ts
src/components/ui/ThankYouPopup/index.ts
```

Files to update:

```text
src/components/sections/BookConsultation/BookConsultation.tsx
src/components/ui/SpeakingModal/SpeakingModal.tsx
src/components/ui/PreBookModal/PreBookModal.tsx
```

No changes required in:

```text
src/lib/consultationLead.ts
```

Reason: submission, validation, and payload builders already work. Only success UI behavior changes.

## Testing Checklist

After implementation, test these flows:

### Practice Consultation

- Submit valid consultation form.
- Confirm Google Sheet submission succeeds.
- Confirm inline success message does not display.
- Confirm Thank You popup opens with consultation-specific text.
- Confirm error message still displays inline if submission fails.

### Speaking Slot

- Open speaking modal.
- Submit valid speaking form.
- Confirm speaking form modal closes after success.
- Confirm Thank You popup opens with speaking-specific text.
- Confirm old 3-second inline success flow no longer appears.
- Confirm error message still displays inside speaking modal if submission fails.

### Pre-Book

- Open pre-book modal.
- Submit valid pre-book form.
- Confirm pre-book modal closes after success.
- Confirm Thank You popup opens with Psychology of Medical Practice text.
- Confirm old 3-second inline success flow no longer appears.
- Confirm error message still displays inside pre-book modal if submission fails.

### Popup Behavior

- Close button works.
- Backdrop click works.
- Escape key works.
- Body scroll is locked while popup is open.
- Social icons display correctly.
- Social links open in a new tab.
- Popup is responsive on mobile.
- Popup visually matches existing modal theme.

## Final Implementation Order

1. Create `ThankYouPopup` component folder and export file.
2. Add dynamic thank-you content constants.
3. Add success icon and social icon UI.
4. Add themed CSS matching existing modal styles.
5. Integrate popup into `BookConsultation.tsx`.
6. Integrate popup into `SpeakingModal.tsx`.
7. Integrate popup into `PreBookModal.tsx`.
8. Comment out old inline success messages.
9. Keep inline error messages unchanged.
10. Run lint/build and manually test all three forms.

# Pre-Book Thank You Popup UI Details

This document explains the **Thank You popup UI** created for the **Psychology of Medical Practice pre-book form** and how it connects with the pre-book submission flow.

## Purpose

After a visitor successfully submits the pre-book form, the old inline thank-you message is no longer shown inside the form. Instead, the pre-book modal closes and a separate themed Thank You popup opens.

This creates a cleaner success experience and keeps the popup design consistent with the website theme.

## User Flow

Current pre-book success flow:

1. Visitor opens the Psychology of Medical Practice pre-book popup.
2. Visitor fills the form details.
3. Visitor clicks `Pre-Book Now`.
4. Formik validates the fields.
5. `buildBookPrebookPayload(values)` creates the Google Sheet payload.
6. `submitConsultationToGoogleSheet(payload)` submits the lead.
7. If submission succeeds:
   - Form resets.
   - Old inline success message stays commented out.
   - Pre-book modal closes.
   - Thank You popup opens with pre-book-specific content.
8. If submission fails, the error message still displays inside the pre-book form.

## Files Used

| File | Purpose |
|------|---------|
| `src/components/ui/PreBookModal/PreBookModal.tsx` | Handles the pre-book form submit flow and opens the Thank You popup after success. |
| `src/components/ui/ThankYouPopup/ThankYouPopup.tsx` | Shared reusable Thank You popup UI component. |
| `src/components/ui/ThankYouPopup/ThankYouPopup.module.css` | Styles for the Thank You popup. |
| `src/components/ui/ThankYouPopup/thankYouContent.ts` | Dynamic content for consultation, speaking, and pre-book success popups. |
| `src/components/ui/ThankYouPopup/index.ts` | Exports the shared popup component. |

## Pre-Book Modal Integration

File:

```text
src/components/ui/PreBookModal/PreBookModal.tsx
```

Imports added:

```tsx
import { ThankYouPopup } from '@/components/ui/ThankYouPopup';
import { THANK_YOU_CONTENT } from '@/components/ui/ThankYouPopup/thankYouContent';
```

State added:

```tsx
const [isThankYouOpen, setIsThankYouOpen] = useState(false);
```

Success flow inside `onSubmit`:

```tsx
const payload = buildBookPrebookPayload(values);
await submitConsultationToGoogleSheet(payload);
helpers.resetForm();
helpers.setStatus(undefined);

// Old inline success message replaced by ThankYouPopup.
// helpers.setStatus({
//   type: 'success',
//   message: 'Thank you! Your pre-booking interest has been received. We will share launch updates and pre-booking information with you soon.',
// });

onClose();
setIsThankYouOpen(true);
```

Popup render added after the pre-book modal portal:

```tsx
<ThankYouPopup
  isOpen={isThankYouOpen}
  onClose={() => setIsThankYouOpen(false)}
  content={THANK_YOU_CONTENT.prebook}
/>
```

## Pre-Book Thank You Content

File:

```text
src/components/ui/ThankYouPopup/thankYouContent.ts
```

Current pre-book content:

```ts
prebook: {
  eyebrow: 'Pre-Booking Interest Received',
  title: 'Thank you.',
  message: 'Your interest in Psychology of Medical Practice has been received. We will share launch updates and pre-booking information with you soon.',
  contactLabel: 'senthil@ophthall.in',
  contactHref: 'mailto:senthil@ophthall.in',
  followLabel: 'Follow Dr. Senthil',
}
```

Displayed popup text:

| UI Area | Text |
|---------|------|
| Eyebrow | `Pre-Booking Interest Received` |
| Title | `Thank you.` |
| Message | `Your interest in Psychology of Medical Practice has been received. We will share launch updates and pre-booking information with you soon.` |
| Contact | `senthil@ophthall.in` |
| Follow label | `Follow Dr. Senthil` |

## Popup UI Structure

File:

```text
src/components/ui/ThankYouPopup/ThankYouPopup.tsx
```

Component props:

```tsx
interface ThankYouPopupProps {
  isOpen: boolean;
  onClose: () => void;
  content: ThankYouPopupContent;
}
```

Rendered structure:

```text
overlay
  panel
    close button
    success icon
    eyebrow text
    title
    message
    contact email link
    follow label
    social icons
```

The popup uses `createPortal(popup, document.body)` so it renders above the full page instead of being trapped inside the form layout.

## Theme Styling

File:

```text
src/components/ui/ThankYouPopup/ThankYouPopup.module.css
```

The popup follows the existing website modal style:

| Element | Style |
|---------|-------|
| Overlay | Fixed full-screen dark teal overlay using `rgba(0, 47, 66, 0.68)`. |
| Panel | White card, `24px` radius, centered, soft shadow. |
| Success icon | Circular brand-blue check icon with a soft blue ring. |
| Eyebrow | Blue pill badge matching the site CTA color. |
| Title | Large bold dark teal text. |
| Message | Muted dark teal paragraph text. |
| Email | Rounded pill link with hover accent. |
| Follow label | Normal title case text: `Follow Dr. Senthil`. |
| Social icons | Circular outline icon buttons with brand-blue hover state. |

Important class names:

| Class | Purpose |
|-------|---------|
| `.overlay` | Full-screen backdrop and popup positioning. |
| `.panel` | Main white popup card. |
| `.closeBtn` | Top-right close button. |
| `.iconWrap` | Centers the success icon. |
| `.successIcon` | Circular success check design. |
| `.eyebrow` | Small pre-book status badge. |
| `.title` | Thank-you heading. |
| `.message` | Dynamic success message. |
| `.contactLink` | Email link pill. |
| `.followLabel` | Social section label. |
| `.socialRow` | Social icon row layout. |
| `.socialIcon` | Individual social icon button. |

## Success Icon

The success icon is built with inline SVG, not an image file.

Current SVG path:

```tsx
<svg viewBox="0 0 24 24">
  <path d="M20 6 9 17l-5-5" />
</svg>
```

The CSS gives it:

- circular shape
- brand-blue color
- soft blue radial background
- thin outer ring
- small pop-in animation

## Social Icons

Social icons are inside `ThankYouPopup.tsx`.

Current social links:

| Platform | URL |
|----------|-----|
| Instagram | `https://www.instagram.com/senthilophthall/` |
| YouTube | `https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q` |
| LinkedIn | `https://www.linkedin.com/in/dr-tamilarasan-senthil-b4b7b32/` |
| Facebook | `https://www.facebook.com/ophthall` |

Each social link:

- opens in a new tab
- uses `rel="noopener noreferrer"`
- has an accessible `ariaLabel`
- displays as a circular icon button

## Popup Close Behavior

The Thank You popup can be closed in three ways:

1. Click the close button.
2. Click the overlay background.
3. Press the `Escape` key.

The popup also locks page scrolling while open by setting:

```ts
document.body.style.overflow = 'hidden';
document.documentElement.style.overflow = 'hidden';
```

When the popup closes, previous scroll styles are restored.

## Error Handling

Only success behavior was moved to the Thank You popup.

Pre-book error handling still stays inside `PreBookModal.tsx`:

```tsx
helpers.setStatus({
  type: 'error',
  message: 'Oops! Something went wrong. Please try again or email directly.',
});
```

The inline status area now renders only errors:

```tsx
{formik.status?.message && formik.status.type === 'error' && (
  <div className={`${styles.statusText} ${styles.statusError}`}>
    {formik.status.message}
  </div>
)}
```

## Testing Done

The implementation was validated with:

```text
npm run lint
npm run build
```

Browser validation was also done with mocked successful network responses for the pre-book form. The verified pre-book popup text was:

```text
Pre-Booking Interest Received

Thank you.

Your interest in Psychology of Medical Practice has been received. We will share launch updates and pre-booking information with you soon.

senthil@ophthall.in

Follow Dr. Senthil
```

## Reuse Notes

The same `ThankYouPopup` component is also used for:

- Practice Growth Consultation success
- Speaking Slot success
- Psychology of Medical Practice Pre-Book success

Only the `content` prop changes for each form.

For pre-book, use:

```tsx
content={THANK_YOU_CONTENT.prebook}
```

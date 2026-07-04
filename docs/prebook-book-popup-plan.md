# Psychology of Medical Practice Pre-Book Popup — Implementation Plan

## Overview

Create a page-load popup for the upcoming book **"Psychology of Medical Practice" by Dr. Senthil**. The popup should invite visitors to pre-book interest, collect contact details, and submit the lead through the same validation and Google Sheet submission pattern already used by the consultation and speaking slot forms.

Primary CTA choice: **Pre-Book Now**

Reason: it is the clearest action for this use case. The user is not paying yet, but they are registering pre-booking interest.

---

## Popup Content

### Tag

Use a compact themed tag above the title:

```text
Launching Soon
```

Style direction:
- Reuse the existing tag language from section styles, especially the small pill/card tag pattern used by Partnerships and Awards.
- Keep it aligned with the site theme: navy/brand blue text, soft blue-tinted background, pill or small-radius badge depending on the final modal design.
- Avoid introducing a new color family.

### Title

```text
Be among the first to own Psychology of Medical Practice by Dr. Senthil
```

### Small Message

```text
No payment required at this stage. Simply fill in your details to receive launch updates and pre-booking information.
```

### Submit Button

```text
Pre-Book Now
```

Loading state:

```text
Submitting...
```

Success message:

```text
Thank you! Your pre-booking interest has been received. We will share launch updates and pre-booking information with you soon.
```

Error message:

```text
Oops! Something went wrong. Please try again or email directly.
```

---

## Form Fields

Use the same field UI pattern as `SpeakingModal`: label, themed input, touched/error validation, and full-width submit button.

| Field | Key | Required | Type | Autocomplete | Placeholder |
|------|-----|----------|------|--------------|-------------|
| Full Name | `name` | Yes | `text` | `name` | `Enter your full name` |
| Mobile Number | `mobile` | Yes | `tel` | `tel` | `Enter your 10-digit mobile number` |
| Email Address | `email` | Yes | `email` | `email` | `Enter your email address` |
| City | `city` | Yes | `text` | `address-level2` | `Enter your city` |
| Profession | `profession` | Yes | `text` | `organization-title` | `Enter your profession` |
| Organization/Hospital (Optional) | `organization` | No | `text` | `organization` | `Enter your organization or hospital name` |

Recommended layout on desktop:

```text
[Full Name]          [Mobile Number]
[Email Address]      [City]
[Profession]         [Organization/Hospital (Optional)]
[Pre-Book Now button spans full width]
[Status message spans full width]
```

On mobile, stack all fields in one column.

---

## Image Asset

Requested image path:

```text
/images/prebook_image.png
```

Current repository check found:

```text
public/images/prebook_image.jpeg
```

Implementation must resolve this before coding to avoid a broken image:

| Option | Decision |
|--------|----------|
| Preferred if exact requested path is required | Convert or add the asset as `public/images/prebook_image.png`, then use `/images/prebook_image.png` |
| Fastest with current repo | Use the existing `/images/prebook_image.jpeg` path |

The modal should use `next/image` for the left image panel, with descriptive alt text:

```text
Psychology of Medical Practice book pre-book preview
```

---

## Files To Add / Change

### 1. `src/lib/consultationLead.ts`

Add a new pre-book form block next to the existing consultation and speaking slot blocks.

New interface:

```ts
export interface BookPrebookFormValues {
  name: string;
  mobile: string;
  email: string;
  city: string;
  profession: string;
  organization: string;
}
```

New initial values:

```ts
export const bookPrebookInitialValues: BookPrebookFormValues = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  profession: '',
  organization: '',
};
```

New Yup validation schema:

```ts
export const bookPrebookValidationSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required('Name is required')
    .matches(/^[a-zA-Z ]*$/, 'Enter a valid name'),
  mobile: Yup.string()
    .trim()
    .required('Mobile number is required')
    .matches(/^[0-9]{10}$/, 'Enter a valid 10 digit mobile number'),
  email: Yup.string()
    .trim()
    .required('Email ID is required')
    .email('Enter a valid email ID'),
  city: Yup.string()
    .trim()
    .required('City is required'),
  profession: Yup.string()
    .trim()
    .required('Profession is required'),
  organization: Yup.string().trim(),
});
```

New payload builder:

```ts
export function buildBookPrebookPayload(values: BookPrebookFormValues) {
  const mobile = values.mobile || '';

  return {
    name: values.name || '',
    mobile: mobile ? `+91${mobile}` : '',
    email: values.email || '',
    city: values.city || '',
    profession: values.profession || '',
    organization: values.organization || '',
    service: 'Psychology of Medical Practice Pre-Book',
    form_name: 'Psychology of Medical Practice Pre-Book',
    page_name: 'senthilsir-portfolio',
    utm_source: getUTM('utm_source'),
  };
}
```

Submission should reuse:

```ts
submitConsultationToGoogleSheet(payload)
```

This keeps IP capture, retries, URL encoding, and endpoint behavior consistent with the existing forms.

### 2. `src/components/ui/PreBookModal/PreBookModal.tsx`

Create a new client component based on the existing speaking modal behavior.

Component API:

```ts
interface PreBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

Structure:

```text
overlay
  panel / popup card
    close button
    left visual column
      image: prebook book image
    right form column
      tag: Launching Soon
      h2 title
      small message
      form fields
      submit button
      status message
```

Behavior to match `SpeakingModal`:
- Render through `createPortal` into `document.body`.
- Use a `mounted` state to avoid SSR/client portal mismatch.
- Close on backdrop click.
- Close on Escape key.
- Lock body scroll while open.
- Reset form when manually closed.
- After successful submit, show success status and close after 3 seconds.

Formik setup:

```ts
const formik = useFormik({
  initialValues: bookPrebookInitialValues,
  validationSchema: bookPrebookValidationSchema,
  onSubmit: async (values, helpers) => {
    try {
      const payload = buildBookPrebookPayload(values);
      await submitConsultationToGoogleSheet(payload);
      helpers.resetForm();
      helpers.setStatus({ type: 'success', message: SUCCESS_MESSAGE });
      setTimeout(() => onClose(), 3000);
    } catch {
      helpers.setStatus({ type: 'error', message: ERROR_MESSAGE });
    } finally {
      helpers.setSubmitting(false);
    }
  },
});
```

### 3. `src/components/ui/PreBookModal/PreBookModal.module.css`

Use the `SpeakingModal.module.css` card and field styles as the base, then widen the card and add a two-column layout.

Desktop layout:

```css
.panel {
  width: min(980px, calc(100% - 32px));
  display: grid;
  grid-template-columns: minmax(280px, 0.85fr) minmax(0, 1.15fr);
  padding: 0;
  overflow: hidden;
}
```

Left image column:

```css
.visual {
  position: relative;
  min-height: 560px;
  background: var(--color-section-bg);
}

.bookImage {
  object-fit: cover;
}
```

Right form column:

```css
.content {
  padding: 34px 36px 30px;
}
```

Form grid:

```css
.form {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 14px 16px;
}
```

Mobile behavior:
- Switch `.panel` to one column.
- Put image above the form with a controlled height, around `220px` to `280px`.
- Stack all fields in one column.
- Keep the close button visible and tappable.
- Keep the popup scrollable within the viewport.

### 4. `src/components/ui/PreBookModal/index.ts`

```ts
export { PreBookModal } from './PreBookModal';
```

### 5. `src/components/ui/PreBookPopup/PreBookPopup.tsx`

Create a small client wrapper that opens the modal when the page loads.

Purpose: keep `src/app/page.tsx` as a mostly composition-only server component while putting page-load modal state inside a client component.

```tsx
'use client';

import { useEffect, useState } from 'react';
import { PreBookModal } from '@/components/ui/PreBookModal';

export function PreBookPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(true);
  }, []);

  return <PreBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}
```

Optional enhancement if the popup should only appear once per browser session:

```ts
const key = 'psychology-book-prebook-popup-seen';
```

Use `sessionStorage` to skip reopening after the visitor closes it. Do not add this unless the desired behavior is once-per-session rather than every page load.

### 6. `src/components/ui/PreBookPopup/index.ts`

```ts
export { PreBookPopup } from './PreBookPopup';
```

### 7. `src/app/page.tsx`

Import and render the page-load popup near the top of `<main>`, after `UTMTracker` so UTM values are available before submission.

```tsx
import { PreBookPopup } from '@/components/ui/PreBookPopup';
```

```tsx
<main>
  <UTMTracker />
  <PreBookPopup />
  <Hero ... />
  ...
</main>
```

---

## Data Flow

```text
Homepage mounts
  -> <PreBookPopup /> mounts on client
  -> useEffect opens <PreBookModal />

Visitor fills form
  -> Formik tracks values and touched state
  -> Yup validates required fields
  -> Optional organization is allowed to be empty

Visitor clicks "Pre-Book Now"
  -> buildBookPrebookPayload(values)
  -> submitConsultationToGoogleSheet(payload)
  -> helper appends ip_address and ip
  -> POST to existing Google Apps Script endpoint

Success
  -> reset form
  -> show success status
  -> auto-close after 3 seconds

Failure
  -> show error status
  -> keep popup open so visitor can retry
```

---

## Google Sheet Payload Mapping

| UI Field | Payload Key | Example |
|----------|-------------|---------|
| Full Name | `name` | `Dr. Senthil` |
| Mobile Number | `mobile` | `+919876543210` |
| Email Address | `email` | `name@example.com` |
| City | `city` | `Chennai` |
| Profession | `profession` | `Ophthalmologist` |
| Organization/Hospital (Optional) | `organization` | `ABC Eye Hospital` |
| Static | `service` | `Psychology of Medical Practice Pre-Book` |
| Static | `form_name` | `Psychology of Medical Practice Pre-Book` |
| Static | `page_name` | `senthilsir-portfolio` |
| UTM | `utm_source` | From localStorage |
| Helper-added | `ip_address` | Visitor IP |
| Helper-added | `ip` | Visitor IP |

---

## Accessibility Requirements

- `role="dialog"` and `aria-modal="true"` on the overlay/dialog wrapper.
- `aria-labelledby` connected to the popup title.
- Close button has `aria-label="Close modal"`.
- Inputs use real `<label htmlFor>` pairs.
- Error text uses `aria-describedby` and `aria-invalid` like `SpeakingModal`.
- Escape key closes the popup.
- Backdrop click closes the popup.
- Body scroll is locked only while the modal is open.

Recommended follow-up: add a basic focus trap or initial focus on the first input if the project wants stronger modal accessibility than the current speaking modal.

---

## Validation / QA Checklist

After implementation, run:

```bash
npm run lint
npm run build
```

Manual checks:
- Popup opens automatically on homepage load.
- Close button works.
- Escape key works.
- Backdrop click works.
- Body scroll locks while popup is open and restores after close.
- Left image renders correctly and does not stretch awkwardly.
- Desktop layout shows image left and form right.
- Mobile layout stacks image and form cleanly.
- Required validation appears for name, mobile, email, city, and profession.
- Organization/Hospital can be submitted empty.
- Mobile rejects non-10-digit values.
- Email rejects invalid email values.
- Successful submission posts the expected payload and shows the success message.
- Failed submission shows the error message and keeps the popup open.

---

## Implementation Order

1. Resolve the image asset path: add/convert `public/images/prebook_image.png` or intentionally use the existing `.jpeg` path.
2. Add pre-book values, validation schema, and payload builder in `consultationLead.ts`.
3. Create `PreBookModal` using `SpeakingModal` as the behavior and field-style reference.
4. Add the widened two-column modal CSS with responsive mobile styles.
5. Create `PreBookPopup` wrapper that opens on page load.
6. Render `PreBookPopup` in `src/app/page.tsx` after `UTMTracker`.
7. Run lint/build and perform the manual popup checks.

---

## Future Options

| Option | Description |
|--------|-------------|
| Once-per-session display | Use `sessionStorage` so visitors do not see the popup repeatedly in one session |
| Secondary CTA | Add a subtle close/skip action such as `Maybe later` below the submit button |
| Book metadata | Add short bullets like launch updates, early access, and pre-booking notification if more copy is approved |
| Separate Sheet tab | Route `form_name = Psychology of Medical Practice Pre-Book` to a dedicated tab in the Apps Script |
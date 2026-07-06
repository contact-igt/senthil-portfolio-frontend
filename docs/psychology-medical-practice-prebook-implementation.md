# Psychology of Medical Practice Pre-Book Implementation Guide

This document explains how the **Psychology of Medical Practice Book pre-book popup** was created in this project and how to create the same type of popup and form submission flow on another page.

## Current Flow

The current pre-book implementation works like this:

1. The home page renders `PreBookPopup`.
2. `PreBookPopup` opens automatically when the page loads.
3. `PreBookPopup` renders `PreBookModal` with `isOpen` and `onClose` props.
4. `PreBookModal` shows the book image, pre-book text, form fields, validation messages, and submit button.
5. On submit, Formik validates the form using the pre-book Yup schema.
6. If valid, the form values are converted into a Google Sheet payload.
7. The payload is submitted through the existing Google Sheet helper.
8. On success, the form resets, a success message appears, and the modal closes after 3 seconds.

## Files Used

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Mounts the popup on the page by rendering `<PreBookPopup />`. |
| `src/components/ui/PreBookPopup/PreBookPopup.tsx` | Opens the modal automatically on page load. |
| `src/components/ui/PreBookPopup/index.ts` | Exports the popup component. |
| `src/components/ui/PreBookModal/PreBookModal.tsx` | Contains the modal UI, Formik setup, close behavior, and submit handling. |
| `src/components/ui/PreBookModal/PreBookModal.module.css` | Contains the modal overlay, layout, image, field, button, message, and responsive styles. |
| `src/components/ui/PreBookModal/index.ts` | Exports the modal component. |
| `src/lib/consultationLead.ts` | Contains form value types, initial values, Yup validation, payload builder, IP capture, and Google Sheet submission helper. |
| `public/images/prebook_image.png` | Book image used inside the modal. |

## Page Setup

The popup is added to the page in `src/app/page.tsx`.

Import:

```tsx
import { PreBookPopup } from '@/components/ui/PreBookPopup';
```

Render near the top of the page:

```tsx
export default function Home() {
  return (
    <main>
      <UTMTracker />
      <PreBookPopup />
      <Hero />
      {/* other sections */}
    </main>
  );
}
```

Because `PreBookPopup` is a client component, it can use `useEffect` and browser state to open the modal after the page loads.

## Popup Open Logic

File: `src/components/ui/PreBookPopup/PreBookPopup.tsx`

```tsx
'use client';

import { useEffect, useState } from 'react';
import { PreBookModal } from '@/components/ui/PreBookModal';

export function PreBookPopup() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = window.setTimeout(() => setIsOpen(true), 0);
    return () => window.clearTimeout(timer);
  }, []);

  return <PreBookModal isOpen={isOpen} onClose={() => setIsOpen(false)} />;
}

export default PreBookPopup;
```

Important details:

- `isOpen` controls whether the modal is visible.
- `useEffect` runs only in the browser, so the modal opens after client-side load.
- `setTimeout(..., 0)` opens it immediately after mount.
- To delay the popup, change `0` to another value, for example `3000` for 3 seconds.

## Modal Component

File: `src/components/ui/PreBookModal/PreBookModal.tsx`

The modal receives two props:

```tsx
interface PreBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}
```

Main responsibilities:

- Render the popup through `createPortal(modal, document.body)`.
- Close when the user clicks the overlay background.
- Close when the user presses `Escape`.
- Lock page scroll while the popup is open.
- Reset the form when manually closed.
- Submit validated form data to Google Sheet.
- Show success or error status text.

The modal does not render if it is closed:

```tsx
if (!isOpen || typeof document === 'undefined') return null;
```

## Modal Content

Current popup content:

| UI Area | Text / Value |
|---------|--------------|
| Tag | `Launching Soon` |
| Title | `Be among the first to own Psychology of Medical Practice Book by Dr. Senthil` |
| Submit button | `Pre-Book Now` |
| Loading button | `Submitting...` |
| Message | `No payment required at this stage. Simply fill in your details to receive launch updates and pre-booking information.` |
| Success | `Thank you! Your pre-booking interest has been received. We will share launch updates and pre-booking information with you soon.` |
| Error | `Oops! Something went wrong. Please try again or email directly.` |

## Form Fields

The form fields are defined in the `TEXT_FIELDS` array inside `PreBookModal.tsx`.

| Label | Key | Required | Type | Autocomplete | Placeholder |
|-------|-----|----------|------|--------------|-------------|
| Full Name | `name` | Yes | `text` | `name` | `Enter your full name` |
| Mobile Number | `mobile` | Yes | `tel` | `tel` | `Enter your 10-digit mobile number` |
| Email Address | `email` | Yes | `email` | `email` | `Enter your email address` |
| City | `city` | Yes | `text` | `address-level2` | `Enter your city` |
| Profession | `profession` | Yes | `text` | `organization-title` | `Enter your profession` |
| Organization/Hospital (Optional) | `organization` | No | `text` | `organization` | `Enter your organization or hospital name` |

Desktop layout:

```text
Full Name                Mobile Number
Email Address            City
Profession               full width
Organization/Hospital    full width
Pre-Book Now             full width
Message                  full width
Status                   full width
```

Mobile layout stacks all fields in one column.

## Validation Setup

File: `src/lib/consultationLead.ts`

The pre-book form has its own value interface:

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

Initial values:

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

Validation schema:

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

## Payload Builder

File: `src/lib/consultationLead.ts`

The payload builder converts form values into the fields sent to Google Sheet:

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
    service: 'Psychology of Medical Practice Book ( Pre-Book )',
    form_name: 'Psychology of Medical Practice Book (Pre-Book )',
    page_name: 'senthilsir-portfolio',
    utm_source: getUTM('utm_source'),
  };
}
```

Important details:

- Mobile number is sent with `+91` prefix.
- `service` and `form_name` identify this lead inside Google Sheet.
- `page_name` identifies the source website/page.
- `utm_source` is read from local storage through `getUTM('utm_source')`.

## Form Submission

`PreBookModal.tsx` imports these helpers:

```tsx
import {
  bookPrebookInitialValues,
  bookPrebookValidationSchema,
  buildBookPrebookPayload,
  submitConsultationToGoogleSheet,
} from '@/lib/consultationLead';
```

Formik submit flow:

```tsx
const formik = useFormik({
  initialValues: bookPrebookInitialValues,
  validationSchema: bookPrebookValidationSchema,
  onSubmit: async (values, helpers) => {
    try {
      const payload = buildBookPrebookPayload(values);
      await submitConsultationToGoogleSheet(payload);
      helpers.resetForm();
      helpers.setStatus({
        type: 'success',
        message: 'Thank you! Your pre-booking interest has been received. We will share launch updates and pre-booking information with you soon.',
      });
      setTimeout(() => onClose(), 3000);
    } catch {
      helpers.setStatus({
        type: 'error',
        message: 'Oops! Something went wrong. Please try again or email directly.',
      });
    } finally {
      helpers.setSubmitting(false);
    }
  },
});
```

The shared `submitConsultationToGoogleSheet` helper:

- Fetches the user IP address using `https://api.ipify.org?format=json`.
- Adds both `ip_address` and `ip` to the payload.
- Converts the payload into `URLSearchParams`.
- Sends a `POST` request to the Google Apps Script endpoint.
- Retries failed submissions up to 3 times.
- Throws an error if all retries fail.

## Image Setup

The modal image is loaded from:

```tsx
src="/images/prebook_image.png"
```

The file exists at:

```text
public/images/prebook_image.png
```

For another page, add the image inside `public/images/` and reference it with a public path:

```tsx
src="/images/your-image-name.png"
```

## Styling Setup

File: `src/components/ui/PreBookModal/PreBookModal.module.css`

Main style classes:

| Class | Purpose |
|-------|---------|
| `.overlay` | Fixed full-screen modal background. |
| `.panel` | Main modal card with two-column desktop layout. |
| `.closeBtn` | Close button in the top-right corner. |
| `.visual` | Left image column. |
| `.imageFrame` | Image container for `next/image` fill mode. |
| `.bookImage` | Book image object-fit style. |
| `.content` | Right content and form column. |
| `.tag` | Launching soon badge. |
| `.title` | Modal heading. |
| `.form` | Two-column form grid. |
| `.field` | Individual form field wrapper. |
| `.fieldFull` | Makes a field span full width. |
| `.input` | Input style. |
| `.inputError` | Error border style. |
| `.errorText` | Validation error text. |
| `.submitBtn` | Submit button. |
| `.message` | Small informational text. |
| `.statusText` | Success/error message wrapper. |
| `.statusSuccess` | Success status style. |
| `.statusError` | Error status style. |

Responsive behavior:

- Above `820px`, the popup uses two columns: image left, form right.
- Below `820px`, it becomes one column.
- Below `560px`, padding, image height, title size, input height, and grid spacing are reduced.
- Below `430px`, the image height is adjusted again for small screens.

## How To Create The Same Popup On Another Page

Use this checklist when creating another popup with the same behavior.

### 1. Create New Components

Create a new popup folder:

```text
src/components/ui/NewPreBookPopup/
```

Files:

```text
NewPreBookPopup.tsx
index.ts
```

Create a new modal folder:

```text
src/components/ui/NewPreBookModal/
```

Files:

```text
NewPreBookModal.tsx
NewPreBookModal.module.css
index.ts
```

You can copy the existing pre-book files and rename:

| Existing | New |
|----------|-----|
| `PreBookPopup` | `NewPreBookPopup` |
| `PreBookModal` | `NewPreBookModal` |
| `styles from './PreBookModal.module.css'` | `styles from './NewPreBookModal.module.css'` |
| `prebook-modal-title` | `new-prebook-modal-title` |

### 2. Add Or Reuse Form Helpers

If the new page uses the same fields, you can reuse:

```ts
bookPrebookInitialValues
bookPrebookValidationSchema
buildBookPrebookPayload
submitConsultationToGoogleSheet
```

If the new page needs different fields or a different Google Sheet label, create a new block in `src/lib/consultationLead.ts`:

```ts
export interface NewPrebookFormValues {
  name: string;
  mobile: string;
  email: string;
  city: string;
  profession: string;
  organization: string;
}

export const newPrebookInitialValues: NewPrebookFormValues = {
  name: '',
  mobile: '',
  email: '',
  city: '',
  profession: '',
  organization: '',
};

export const newPrebookValidationSchema = Yup.object({
  name: Yup.string().trim().required('Name is required'),
  mobile: Yup.string().trim().required('Mobile number is required').matches(/^[0-9]{10}$/, 'Enter a valid 10 digit mobile number'),
  email: Yup.string().trim().required('Email ID is required').email('Enter a valid email ID'),
  city: Yup.string().trim().required('City is required'),
  profession: Yup.string().trim().required('Profession is required'),
  organization: Yup.string().trim(),
});

export function buildNewPrebookPayload(values: NewPrebookFormValues) {
  const mobile = values.mobile || '';

  return {
    name: values.name || '',
    mobile: mobile ? `+91${mobile}` : '',
    email: values.email || '',
    city: values.city || '',
    profession: values.profession || '',
    organization: values.organization || '',
    service: 'New Page Pre-Book',
    form_name: 'New Page Pre-Book',
    page_name: 'new-page-name',
    utm_source: getUTM('utm_source'),
  };
}
```

The most important values to update are:

| Field | Why Update It |
|-------|---------------|
| `service` | Used to identify the lead category. |
| `form_name` | Used to identify the exact form submitted. |
| `page_name` | Used to identify which page generated the lead. |

### 3. Update Modal Imports

In the new modal file, import the correct helpers:

```tsx
import {
  newPrebookInitialValues,
  newPrebookValidationSchema,
  buildNewPrebookPayload,
  submitConsultationToGoogleSheet,
} from '@/lib/consultationLead';
```

Then update Formik:

```tsx
const formik = useFormik({
  initialValues: newPrebookInitialValues,
  validationSchema: newPrebookValidationSchema,
  onSubmit: async (values, helpers) => {
    const payload = buildNewPrebookPayload(values);
    await submitConsultationToGoogleSheet(payload);
  },
});
```

Keep the current success/error handling pattern from `PreBookModal.tsx`.

### 4. Update Popup Text

Change these values in the copied modal:

| Area | Example |
|------|---------|
| Tag | `Launching Soon` |
| Title | `Be among the first to pre-book [New Product Name]` |
| Button | `Pre-Book Now` |
| Message | `No payment required at this stage...` |
| Success message | `Thank you! Your pre-booking interest has been received...` |
| Error message | `Oops! Something went wrong...` |

### 5. Update Image

Add the new image to:

```text
public/images/
```

Then update the `Image` component:

```tsx
<Image
  className={styles.bookImage}
  src="/images/new-prebook-image.png"
  alt=""
  fill
  priority
  sizes="(max-width: 768px) 100vw, 390px"
/>
```

### 6. Mount On The New Page

In the page where the popup should appear:

```tsx
import { NewPreBookPopup } from '@/components/ui/NewPreBookPopup';

export default function NewPage() {
  return (
    <main>
      <UTMTracker />
      <NewPreBookPopup />
      {/* page sections */}
    </main>
  );
}
```

If that page does not need UTM tracking, you can omit `UTMTracker`, but keeping it helps capture `utm_source` in the submitted payload.

## Common Changes For Another Page

| Requirement | Where To Change |
|-------------|-----------------|
| Popup opens later | Change timeout in `NewPreBookPopup.tsx`. |
| Popup opens from a button instead of page load | Remove `useEffect`, keep state, and call `setIsOpen(true)` from button click. |
| Different fields | Update `TEXT_FIELDS`, TypeScript interface, initial values, validation schema, and payload builder. |
| Different Google Sheet label | Update `service`, `form_name`, and `page_name` in the payload builder. |
| Different image | Replace image in `public/images/` and update `src`. |
| Different styling | Edit the modal CSS module only. |
| Same form on multiple pages | Reuse the same modal, but pass page-specific labels as props or create separate payload builders. |

## Testing Checklist

After creating the same popup on another page, test these items:

- Page loads without console errors.
- Popup opens at the expected time.
- Close button closes the popup.
- Clicking outside the modal closes the popup.
- Pressing `Escape` closes the popup.
- Background page does not scroll while popup is open.
- Required field errors appear after blur or submit.
- Mobile number accepts only 10 digits.
- Email validation works.
- Submit button shows `Submitting...` while sending.
- Success message appears after successful submission.
- Error message appears if submission fails.
- Modal closes after 3 seconds on success.
- Lead appears in Google Sheet with correct `service`, `form_name`, `page_name`, and `utm_source`.
- Layout works on desktop and mobile.

## Minimal Copy Plan

For the fastest implementation on another page:

1. Copy `PreBookPopup` and rename it.
2. Copy `PreBookModal` and rename it.
3. Copy `PreBookModal.module.css` and rename it.
4. Add exports in both `index.ts` files.
5. Add a new image in `public/images/`.
6. Add or reuse form helper functions in `src/lib/consultationLead.ts`.
7. Update text, image path, `service`, `form_name`, and `page_name`.
8. Import and render the new popup in the target page.
9. Submit a test lead and verify Google Sheet data.

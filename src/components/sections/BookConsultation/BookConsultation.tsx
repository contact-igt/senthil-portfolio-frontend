'use client';

import Image from 'next/image';
import { useFormik } from 'formik';
import {
  buildConsultationPayload,
  consultationInitialValues,
  consultationValidationSchema,
  submitConsultationToGoogleSheet,
} from '@/lib/consultationLead';
import styles from './BookConsultation.module.css';

const fields = [
  { id: 'name', label: 'Full Name', type: 'text', autoComplete: 'name', fullWidth: false },
  { id: 'mobile', label: 'Mobile Number', type: 'tel', autoComplete: 'tel', fullWidth: false },
  { id: 'email', label: 'Email Address', type: 'email', autoComplete: 'email', fullWidth: true },
  { id: 'organization', label: 'Organization / Hospital Name', type: 'text', autoComplete: 'organization', fullWidth: true },
  { id: 'location', label: 'Location (City/State)', type: 'text', autoComplete: 'address-level2', fullWidth: true },
] as const;

interface BookConsultationProps {
  embedded?: boolean;
  showTitle?: boolean;
}

export function BookConsultation({ embedded = false, showTitle = true }: BookConsultationProps) {
  const formik = useFormik({
    initialValues: consultationInitialValues,
    validationSchema: consultationValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const payload = buildConsultationPayload(values);
        await submitConsultationToGoogleSheet(payload);
        helpers.resetForm();
        helpers.setStatus({ type: 'success', message: 'Thank you! Your request has been received. We will get back to you shortly.' });
      } catch {
        helpers.setStatus({ type: 'error', message: 'Oops! Something went wrong. Please try again or email directly.' });
      } finally {
        helpers.setSubmitting(false);
      }
    },
  });

  return (
    <section
      id="contact"
      className={`${styles.wrapper} ${embedded ? styles.embeddedWrapper : ''}`}
      aria-labelledby={showTitle ? 'book-consultation-heading' : undefined}
    >
      <div className={`${styles.section} ${embedded ? styles.embedded : ''}`}>
        {showTitle && (
          <h2 id="book-consultation-heading" className={styles.sectionTitle}>
            Book a Professional Consultation
          </h2>
        )}

        <div className={styles.container}>
          <form
            className={styles.form}
            onSubmit={formik.handleSubmit}
            noValidate
          >
            {fields.map((field) => (
              <div
                key={field.id}
                className={`${styles.field} ${field.fullWidth ? styles.fieldFull : ''}`}
              >
                <label className={styles.label} htmlFor={field.id}>
                  {field.label}
                </label>
                <input
                  className={`${styles.input} ${
                    formik.touched[field.id] && formik.errors[field.id] ? styles.inputError : ''
                  }`}
                  id={field.id}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched[field.id] && formik.errors[field.id])}
                  aria-describedby={`${field.id}-error`}
                  placeholder={`Enter your ${field.label.toLowerCase()}`}
                />
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <p className={styles.errorText} id={`${field.id}-error`}>
                    {formik.errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <button className={styles.submitButton} type="submit" disabled={formik.isSubmitting}>
              {formik.isSubmitting ? 'Sending Request...' : 'Apply Now'}
            </button>

            {formik.status?.message && (
              <div
                className={`${styles.statusText} ${
                  formik.status.type === 'success' ? styles.successText : styles.errorText
                }`}
              >
                {formik.status.message}
              </div>
            )}
          </form>

          <div className={styles.divider} aria-hidden="true" />

          <aside className={styles.contactPanel} aria-label="Consultation contact details">
            <div className={styles.imageFrame}>
              <Image
                src="/images/senthilsir4.JPG"
                alt="Dr. Senthil Tamilarasan"
                fill
                sizes="(max-width: 1024px) 100vw, 420px"
                className={styles.image}
              />
            </div>

            <div className={styles.contactCopy}>
              <a className={styles.email} href="mailto:senthil@ophthall.in">
                senthil@ophthall.in
              </a>
              <p className={styles.summary}>
                Strategizing healthcare growth and business excellence for eye hospitals across India.
              </p>
              <address className={styles.address}>
                <strong>Dr. Senthil Tamilaraasan</strong>
                <br />
                Founder, Ophthall Practice Development
                <br />
                Healthcare Business Strategist
                <br />
                Chennai, India
              </address>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}

export default BookConsultation;

'use client';

import Image from 'next/image';
import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import {
  bookPrebookInitialValues,
  bookPrebookValidationSchema,
  buildBookPrebookPayload,
  submitConsultationToGoogleSheet,
} from '@/lib/consultationLead';
import { ThankYouPopup } from '@/components/ui/ThankYouPopup';
import { THANK_YOU_CONTENT } from '@/components/ui/ThankYouPopup/thankYouContent';
import styles from './PreBookModal.module.css';

interface PreBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEXT_FIELDS = [
  { id: 'name', label: 'Full Name', type: 'text', autoComplete: 'name', placeholder: 'Enter your full name', fullWidth: false },
  { id: 'mobile', label: 'Mobile Number', type: 'tel', autoComplete: 'tel', placeholder: 'Enter your 10-digit mobile number', fullWidth: false },
  { id: 'email', label: 'Email Address', type: 'email', autoComplete: 'email', placeholder: 'Enter your email address', fullWidth: false },
  { id: 'city', label: 'City', type: 'text', autoComplete: 'address-level2', placeholder: 'Enter your city', fullWidth: false },
  { id: 'profession', label: 'Profession', type: 'text', autoComplete: 'organization-title', placeholder: 'Enter your profession', fullWidth: true },
  { id: 'organization', label: 'Organization/Hospital (Optional)', type: 'text', autoComplete: 'organization', placeholder: 'Enter your organization or hospital name', fullWidth: true },
] as const;

export function PreBookModal({ isOpen, onClose }: PreBookModalProps) {
  const [isThankYouOpen, setIsThankYouOpen] = useState(false);

  const formik = useFormik({
    initialValues: bookPrebookInitialValues,
    validationSchema: bookPrebookValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
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

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  useEffect(() => {
    if (!isOpen) return;
    const onKey = (event: KeyboardEvent) => { if (event.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  useEffect(() => {
    if (!isOpen) return;

    const previousBodyOverflow = document.body.style.overflow;
    const previousRootOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = 'hidden';
    document.documentElement.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.documentElement.style.overflow = previousRootOverflow;
    };
  }, [isOpen]);

  if (typeof document === 'undefined') return null;

  const modal = (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="prebook-modal-title"
      onClick={(event) => { if (event.target === event.currentTarget) handleClose(); }}
    >
      <div className={styles.panel}>
        <button
          className={styles.closeBtn}
          onClick={handleClose}
          aria-label="Close modal"
          type="button"
        >
          ×
        </button>

        <div className={styles.visual} aria-hidden="true">
          <div className={styles.imageFrame}>
            <Image
              className={styles.bookImage}
              src="/images/prebook_image.png"
              alt=""
              fill
              priority
              sizes="(max-width: 768px) 100vw, 390px"
            />
          </div>
        </div>

        <div className={styles.content}>
          <span className={styles.tag}>Launching Soon</span>
          <h2 id="prebook-modal-title" className={styles.title}>
            Be among the first to own Psychology of Medical Practice Book by Dr. Senthil
          </h2>

          <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
            {TEXT_FIELDS.map((field) => (
              <div
                key={field.id}
                className={`${styles.field} ${field.fullWidth ? styles.fieldFull : ''}`}
              >
                <label className={styles.label} htmlFor={`pb-${field.id}`}>
                  {field.label}
                </label>
                <input
                  className={`${styles.input} ${
                    formik.touched[field.id] && formik.errors[field.id] ? styles.inputError : ''
                  }`}
                  id={`pb-${field.id}`}
                  name={field.id}
                  type={field.type}
                  autoComplete={field.autoComplete}
                  placeholder={field.placeholder}
                  value={formik.values[field.id]}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  aria-invalid={Boolean(formik.touched[field.id] && formik.errors[field.id])}
                  aria-describedby={`pb-${field.id}-error`}
                />
                {formik.touched[field.id] && formik.errors[field.id] && (
                  <p className={styles.errorText} id={`pb-${field.id}-error`}>
                    {formik.errors[field.id]}
                  </p>
                )}
              </div>
            ))}

            <div className={`${styles.field} ${styles.fieldFull}`}>
              <button
                className={styles.submitBtn}
                type="submit"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? 'Submitting...' : 'Pre-Book Now'}
              </button>
            </div>

            <p className={styles.message}>
              No payment required at this stage. Simply fill in your details to receive launch updates and pre-booking information.
            </p>

            {formik.status?.message && formik.status.type === 'error' && (
              <div
                className={`${styles.statusText} ${styles.statusError}`}
              >
                {formik.status.message}
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {isOpen && createPortal(modal, document.body)}
      <ThankYouPopup
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        content={THANK_YOU_CONTENT.prebook}
      />
    </>
  );
}

export default PreBookModal;
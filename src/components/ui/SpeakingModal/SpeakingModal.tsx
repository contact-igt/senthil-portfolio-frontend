'use client';

import { useEffect, useCallback, useState } from 'react';
import { createPortal } from 'react-dom';
import { useFormik } from 'formik';
import {
  buildSpeakingSlotPayload,
  speakingSlotInitialValues,
  speakingSlotValidationSchema,
  submitConsultationToGoogleSheet,
} from '@/lib/consultationLead';
import styles from './SpeakingModal.module.css';

interface SpeakingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const TEXT_FIELDS = [
  { id: 'name',         label: 'Full Name',                    type: 'text',  autoComplete: 'name',           placeholder: 'Enter your full name',                fullWidth: false },
  { id: 'mobile',       label: 'Mobile Number',                type: 'tel',   autoComplete: 'tel',            placeholder: 'Enter your 10-digit mobile number',   fullWidth: false },
  { id: 'email',        label: 'Email Address',                type: 'email', autoComplete: 'email',          placeholder: 'Enter your email address',            fullWidth: true  },
  { id: 'organization', label: 'Organisation / Hospital Name', type: 'text',  autoComplete: 'organization',   placeholder: 'Enter your organisation or hospital name', fullWidth: true },
  { id: 'location',     label: 'Location (City / State)',      type: 'text',  autoComplete: 'address-level2', placeholder: 'Enter your city or state',            fullWidth: true  },
] as const;

export function SpeakingModal({ isOpen, onClose }: SpeakingModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const formik = useFormik({
    initialValues: speakingSlotInitialValues,
    validationSchema: speakingSlotValidationSchema,
    onSubmit: async (values, helpers) => {
      try {
        const payload = buildSpeakingSlotPayload(values);
        await submitConsultationToGoogleSheet(payload);
        helpers.resetForm();
        helpers.setStatus({
          type: 'success',
          message: 'Thank you! Your speaking slot request has been received. We will get back to you shortly.',
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

  const handleClose = useCallback(() => {
    formik.resetForm();
    onClose();
  }, [formik, onClose]);

  // Escape key closes modal
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') handleClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, handleClose]);

  // Lock body scroll while open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen || !mounted) return null;

  const modal = (
    <div
      className={styles.overlay}
      role="dialog"
      aria-modal="true"
      aria-labelledby="speaking-modal-title"
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
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

        <h2 id="speaking-modal-title" className={styles.title}>
          Book A Speaking Slot
        </h2>

        <form className={styles.form} onSubmit={formik.handleSubmit} noValidate>
          {TEXT_FIELDS.map((field) => (
            <div
              key={field.id}
              className={`${styles.field} ${field.fullWidth ? styles.fieldFull : ''}`}
            >
              <label className={styles.label} htmlFor={`sm-${field.id}`}>
                {field.label}
              </label>
              <input
                className={`${styles.input} ${
                  formik.touched[field.id] && formik.errors[field.id] ? styles.inputError : ''
                }`}
                id={`sm-${field.id}`}
                name={field.id}
                type={field.type}
                autoComplete={field.autoComplete}
                placeholder={field.placeholder}
                value={formik.values[field.id]}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                aria-invalid={Boolean(formik.touched[field.id] && formik.errors[field.id])}
                aria-describedby={`sm-${field.id}-error`}
              />
              {formik.touched[field.id] && formik.errors[field.id] && (
                <p className={styles.errorText} id={`sm-${field.id}-error`}>
                  {formik.errors[field.id]}
                </p>
              )}
            </div>
          ))}

          {/* Message field */}
          <div className={`${styles.field} ${styles.fieldFull}`}>
            <label className={styles.label} htmlFor="sm-message">
              Message
            </label>
            <textarea
              className={`${styles.textarea} ${
                formik.touched.message && formik.errors.message ? styles.inputError : ''
              }`}
              id="sm-message"
              name="message"
              rows={4}
              placeholder="Mention Details about your Organisation | Event Details | Topics Interested"
              value={formik.values.message}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              aria-invalid={Boolean(formik.touched.message && formik.errors.message)}
              aria-describedby="sm-message-error"
            />
            {formik.touched.message && formik.errors.message && (
              <p className={styles.errorText} id="sm-message-error">
                {formik.errors.message}
              </p>
            )}
          </div>

          <div className={`${styles.field} ${styles.fieldFull}`}>
            <button
              className={styles.submitBtn}
              type="submit"
              disabled={formik.isSubmitting}
            >
              {formik.isSubmitting ? 'Sending Request...' : 'Book a Speaking Slot'}
            </button>
          </div>

          {formik.status?.message && (
            <div
              className={`${styles.statusText} ${
                formik.status.type === 'success' ? styles.statusSuccess : styles.statusError
              }`}
            >
              {formik.status.message}
            </div>
          )}
        </form>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

export default SpeakingModal;


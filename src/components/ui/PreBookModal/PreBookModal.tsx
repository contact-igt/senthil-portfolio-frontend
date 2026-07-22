'use client';

import Image from 'next/image';
import { useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import styles from './PreBookModal.module.css';

interface PreBookModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AMAZON_BOOK_URL = 'https://www.amazon.in/dp/B0H9QZGJD6';
const BOOK_PAGE_URL = '/book';

const bookHighlights = [
  'Understand patient psychology, trust, and communication beyond clinical treatment.',
  'Learn practical lessons for doctors, hospital owners, and healthcare leaders.',
  'Apply behavioral insight to ethical practice growth, stronger teams, and better patient experience.',
];

export function PreBookModal({ isOpen, onClose }: PreBookModalProps) {
  const handleClose = useCallback(() => {
    onClose();
  }, [onClose]);

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
          &times;
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
          <span className={styles.tag}>Buy the Book</span>
          <h2 id="prebook-modal-title" className={styles.title}>
            Psychology of Medical Practice Book by Dr. Senthil
          </h2>

          {/* Pre-book form fields and Google Sheet submission are intentionally disabled now that the book is available to buy. */}
          <div className={styles.buyContent}>
            <p className={styles.message}>
              A practical guide to the psychology behind patient trust, communication, leadership and practice growth.
            </p>

            <div className={styles.learnBlock}>
              <h3 className={styles.learnTitle}>Inside This Book</h3>
              <div className={styles.learnGrid}>
                {bookHighlights.map((item) => (
                  <div className={styles.learnItem} key={item}>
                    <Image
                      src="/images/tick icon .png"
                      alt=""
                      width={20}
                      height={20}
                      className={styles.learnIcon}
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={styles.actions}>
              <a className={styles.secondaryBtn} href={BOOK_PAGE_URL}>
                Read More About the Book
              </a>
              <a
                className={styles.submitBtn}
                href={AMAZON_BOOK_URL}
                target="_blank"
                rel="noreferrer"
              >
                Buy the Book
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return <>{isOpen && createPortal(modal, document.body)}</>;
}

export default PreBookModal;

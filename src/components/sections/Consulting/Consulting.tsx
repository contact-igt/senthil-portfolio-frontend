'use client';

import React from 'react';
import Image from 'next/image';
import type { ConsultingProps } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Consulting.module.css';

const DEFAULT_BODY = [
  'For over 2 decades, Dr. Senthil has worked with hospitals, clinics, and healthcare organizations across India, helping them improve growth, operational efficiency, patient experience, team performance, and long-term sustainability.',
  'Through strategic consulting, leadership mentoring, practice development programs, and business transformation initiatives, he has supported hundreds of healthcare institutions in building stronger systems, enhancing profitability, and creating scalable healthcare enterprises while maintaining clinical excellence.',
];

const HIGHLIGHT_TERMS = [
  'over 2 decades',
  'growth',
  'operational efficiency',
  'patient experience',
  'team performance',
  'long-term sustainability',
  'strategic consulting',
  'leadership mentoring',
  'practice development programs',
  'business transformation initiatives',
  'stronger systems',
  'enhancing profitability',
  'scalable healthcare enterprises',
  'clinical excellence',
];

function renderHighlightedText(text: string) {
  const pattern = new RegExp(`(${HIGHLIGHT_TERMS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

  return text.split(pattern).map((part, index) => {
    const isHighlighted = HIGHLIGHT_TERMS.some((term) => term.toLowerCase() === part.toLowerCase());

    return isHighlighted ? (
      <span key={`${part}-${index}`} className={styles.highlightText}>
        {part}
      </span>
    ) : (
      part
    );
  });
}

export function Consulting({
  className = '',
  heading = 'Build stronger, scalable healthcare practices',
  body = DEFAULT_BODY,
  ctaLabel = 'Book a consultation',
  ctaHref = 'mailto:senthil@ophthall.in',
  imageSrc = '/images/img6.jpeg',
  imageAlt = 'Dr. Senthil speaking at an eye care event',
}: ConsultingProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    const copy = container.querySelector('[data-animate="consulting-copy"]');
    const visual = container.querySelector('[data-animate="consulting-visual"]');
    const accents = container.querySelectorAll('[data-animate="consulting-accent"]');

    if (copy) {
      gsap.from(copy, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: copy,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (visual) {
      gsap.from(visual, {
        x: 42,
        opacity: 0,
        duration: 0.85,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: visual,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });
    }

    if (accents.length) {
      gsap.from(accents, {
        scale: 0.92,
        opacity: 0,
        duration: 0.7,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: container,
          start: 'top 78%',
          toggleActions: 'play none none none',
        },
      });
    }
  });

  return (
    <section
      ref={ref}
      id="consulting"
      className={`${styles.section} ${className}`}
      aria-labelledby="consulting-section-heading"
    >
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          <header className={styles.sectionHeader} data-animate="consulting-copy">
            <h2 id="consulting-section-heading" className={styles.sectionTitle}>
              Strategic Healthcare Consulting
            </h2>
          </header>

          <div className={styles.contentGrid}>
            <div className={styles.copyColumn} data-animate="consulting-copy">
              <div className={styles.triangleAccent} aria-hidden="true" data-animate="consulting-accent" />
              <h3 id="consulting-heading" className={styles.heading}>
                {heading}
              </h3>
              <div className={styles.bodyText}>
                {body.map((paragraph) => (
                  <p key={paragraph}>{renderHighlightedText(paragraph)}</p>
                ))}
              </div>
              <a className={styles.ctaButton} href={ctaHref}>
                {ctaLabel}
              </a>
            </div>

            <div className={styles.visualColumn} data-animate="consulting-visual">
              <div className={styles.dotPattern} aria-hidden="true" data-animate="consulting-accent" />
              <div className={styles.imageFrame}>
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  sizes="(max-width: 992px) 100vw, 50vw"
                  className={styles.image}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Consulting;

'use client';

import React from 'react';
import type { PartnerProps } from '@/types';
import { TabletMockup } from './TabletMockup';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Partner.module.css';

/* ── Custom Green Looping Arrow SVG ─────────────────────── */
function LoopingArrow() {
  return (
    <svg
      className={styles.loopingArrow}
      width="96"
      height="80"
      viewBox="0 0 96 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Hand-drawn swirl pathway */}
      <path
        d="M12 22C42 -2, 75 12, 52 35C30 52, 48 72, 78 58"
        stroke="#00a0e3"
        strokeWidth="3.5"
        strokeLinecap="round"
        fill="none"
      />
      {/* Arrow head points downward-right */}
      <path
        d="M68 53L80 59L76 46"
        stroke="#00a0e3"
        strokeWidth="3.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

// Fallback legacy content if no props provided
const DEFAULT_SERVICES = [
  {
    title: 'Launching a new product and feeling stuck?',
    description: 'Creating your online SaaS product can leave you in a state of confusion not knowing where to start or how to articulate a strategy or vision to move forward.',
  },
  {
    title: 'Have an existing product and looking to improve the UX?',
    description: 'You may own your own product right now and have come to realise that poor retention rate and low conversion ultimately leaves you asking questions around the implementation of your platform.',
  },
  {
    title: 'Finally, have you been let down before by other suppliers?',
    description: 'Furthermore, you may have been let down by experienced suppliers or highly expensive agencies leaving your product inconsistent and unusable, making it challenging to navigate for existing users.',
  },
];

/* ── Helper: split period-separated description into bullet list ── */
function BulletList({ text }: { text: string }) {
  const items = text
    .split(/\.\s+/)
    .map(s => s.replace(/\.$/, '').trim())
    .filter(Boolean);
  return (
    <ul className={styles.blockList}>
      {items.map((item, i) => (
        <li key={i} className={styles.blockListItem}>
          <span className={styles.bulletDot} aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

export function Partner({
  heading = 'Strategic UX product partner for ambitious startups',
  subtitle,
  services = DEFAULT_SERVICES,
}: PartnerProps) {
  const eduQual = services.find(s => s.title.includes('Educational')) || services[0];
  const profMem = services.find(s => s.title.includes('Memberships')) || services[1];
  const currPos = services.find(s => s.title.includes('Positions')) || services[2];

  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header centered reveal — immediateRender:false prevents the "stuck at opacity 0" bug
    gsap.from(container.querySelector('[data-animate="partner-header"]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="partner-header"]'),
        start: 'top 95%',
        toggleActions: 'play none none none',
      },
    });

    // Mockup reveal — slides in from left
    gsap.from(container.querySelector('[data-animate="partner-mockup"]'), {
      x: -50,
      opacity: 0,
      duration: 0.9,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="partner-mockup"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Credential cards — stagger bottom-up
    gsap.from(container.querySelectorAll('[data-animate="partner-card"]'), {
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: 'power2.out',
      immediateRender: false,
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="partner-card"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={ref} id="about" className={styles.section} aria-labelledby="partner-section-heading">
      <div className={styles.container}>
        
        {/* Centered Title & Subtitle */}
        <div className={styles.headerCentered} data-animate="partner-header">
          <div className={styles.headingGroup}>
            <h2 id="partner-section-heading" className={styles.heading}>
              {heading}
            </h2>
            <div className={styles.arrowContainer}>
              <LoopingArrow />
            </div>
          </div>
          {subtitle && (
            <p className={styles.subtitle}>{subtitle}</p>
          )}
        </div>

        {/* ── First Row: Split Layout ── */}
        <div className={styles.contentSplit}>
          
          {/* Left Column: Visual Mockup */}
          <div className={styles.visualLeft} data-animate="partner-mockup">
            <TabletMockup />
          </div>

          {/* Right Column: Educational Qualifications */}
          <div className={styles.contentRight} data-animate="partner-card">
            <article className={styles.situationBlock}>
              <h3 className={styles.blockTitle}>{eduQual.title}</h3>
              <BulletList text={eduQual.description} />
            </article>
          </div>
          
        </div>

        {/* ── Second Row: Two Columns ── */}
        <div className={styles.servicesGrid}>
          <article className={styles.situationBlock} data-animate="partner-card">
            <h3 className={styles.blockTitle}>{currPos.title}</h3>
            <BulletList text={currPos.description} />
          </article>
          <article className={styles.situationBlock} data-animate="partner-card">
            <h3 className={styles.blockTitle}>{profMem.title}</h3>
            <BulletList text={profMem.description} />
          </article>
        </div>
      </div>
    </section>
  );
}

export default Partner;

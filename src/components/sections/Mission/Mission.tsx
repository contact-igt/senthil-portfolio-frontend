'use client';

import React from 'react';
import type { MissionProps } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Mission.module.css';

/* ── Concentric Radar-like Circles SVG ─────────────────── */
function ConcentricCircles() {
  return (
    <svg
      className={styles.concentricCircles}
      width="200"
      height="400"
      viewBox="0 0 200 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <circle cx="-50" cy="200" r="120" stroke="var(--color-mission-circles)" strokeWidth="1.8" />
      <circle cx="-50" cy="200" r="160" stroke="var(--color-mission-circles)" strokeWidth="1.8" />
      <circle cx="-50" cy="200" r="200" stroke="var(--color-mission-circles)" strokeWidth="1.8" />
      <circle cx="-50" cy="200" r="240" stroke="var(--color-mission-circles)" strokeWidth="1.8" opacity="0.6" />
    </svg>
  );
}

/* ── Hand-Drawn Downward Orange Arrow SVG ──────────────── */
function LoopingDownwardArrow() {
  return (
    <svg
      className={styles.downwardArrow}
      width="64"
      height="120"
      viewBox="0 0 64 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Curved hand-drawn vertical shaft */}
      <path
        d="M32 10C24 40, 20 80, 32 100"
        stroke="var(--color-mission-arrow)"
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      {/* Downward pointing arrowhead */}
      <path
        d="M20 90L32 104L42 92"
        stroke="var(--color-mission-arrow)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}

/* ── Tilted Solid Yellow Triangle SVG ─────────────────── */
function YellowTriangle() {
  return (
    <svg
      className={styles.yellowTriangle}
      width="34"
      height="34"
      viewBox="0 0 34 34"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M6 6L28 14L10 28Z"
        fill="var(--color-mission-triangle)"
      />
    </svg>
  );
}

export function Mission({
  line1 = 'Transforming',
  line2 = 'unique digital',
  line3 = 'experiences',
  subtext,
}: MissionProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    tl.from(container.querySelector('[data-animate="mission-circles"]'), {
      scale: 0.5,
      opacity: 0,
      duration: 1,
      ease: 'power3.out',
    })
    .from(container.querySelector('[data-animate="mission-triangle"]'), {
      scale: 0,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
    }, '-=0.6')
    .from(container.querySelector('[data-animate="mission-arrow"]'), {
      y: -40,
      opacity: 0,
      duration: 0.7,
      ease: 'back.out(1.5)',
    }, '-=0.4')
    .from(container.querySelectorAll('[data-animate="mission-line"]'), {
      y: 35,
      opacity: 0,
      duration: 0.75,
      stagger: 0.15,
      ease: 'power3.out',
    }, '-=0.5')
    .from(container.querySelector('[data-animate="mission-subtext"]'), {
      y: 20,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, '-=0.35');
  });

  return (
    <section ref={ref} className={styles.section} aria-label="Our Digital Mission">
      
      {/* Left Edge Concentric Circles Decoration */}
      <div data-animate="mission-circles" className={styles.circlesWrapper}>
        <ConcentricCircles />
      </div>

      {/* Top Right Triangle Decoration */}
      <div data-animate="mission-triangle" className={styles.triangleWrapper}>
        <YellowTriangle />
      </div>

      <div className={styles.container}>
        
        {/* Top Center Downward Arrow Decoration */}
        <div className={styles.arrowWrap} data-animate="mission-arrow">
          <LoopingDownwardArrow />
        </div>

        {/* Massive Centered Typography Statement */}
        <h2 className={styles.headline}>
          <span className={styles.headlineLine} data-animate="mission-line">{line1}</span><br />
          <span className={styles.headlineLine} data-animate="mission-line">{line2}</span><br />
          <span className={styles.greenHighlight} data-animate="mission-line">{line3}</span>
        </h2>

        {/* Optional Subtext */}
        {subtext && (
          <p className={styles.subtext} data-animate="mission-subtext">
            {subtext}
          </p>
        )}

      </div>
    </section>
  );
}

export default Mission;

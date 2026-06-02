'use client';

import React from 'react';
import { MobileScreen } from './MobileScreen';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './CaseStudies.module.css';

export function CaseStudies() {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Tablet frame entry
    gsap.from(container.querySelector('.' + styles.tabletFrame), {
      y: 60,
      scale: 0.96,
      opacity: 0,
      duration: 0.85,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.tabletFrame),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Mobile screens stagger
    gsap.from(container.querySelectorAll('[data-animate="case-screen"]'), {
      scale: 0.88,
      y: 80,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.tabletFrame),
        start: 'top 75%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-label="Case Studies Showcase">
      <div className={styles.container}>
        
        {/* Giant Purple Tablet-like Container */}
        <div className={styles.tabletFrame}>
          
          {/* Subtle Grid blueprint pattern overlay */}
          <div className={styles.gridOverlay} aria-hidden="true" />
          
          {/* Overlapping mobile screen mockups */}
          <div className={styles.screensFlex}>
            <MobileScreen variant="welcome" index={0} />
            <MobileScreen variant="dashboard" index={1} />
            <MobileScreen variant="customers" index={2} />
          </div>

          {/* Centered Tablet Home Indicator Pill at the bottom */}
          <div className={styles.tabletHomeBar} aria-hidden="true" />

        </div>

      </div>
    </section>
  );
}

export default CaseStudies;

'use client';

import React from 'react';
import { CaseStudyCard } from './CaseStudyCard';
import { Button } from '@/components/ui/Button';
import type { RecentCaseStudiesProps, CaseStudyData } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './RecentCaseStudies.module.css';

const DEFAULT_CASES: CaseStudyData[] = [
  {
    id: 'cs-grj',
    client: 'Great Rail Journeys',
    headline: 'Reducing friction in travel decision-making',
    mockupVariant: 'grj',
  },
  {
    id: 'cs-twolist',
    client: 'twolist',
    headline: 'Designing a productivity tool for neurodiverse users',
    mockupVariant: 'twolist',
  },
];

export function RecentCaseStudies({
  heading = 'Recent case studies',
  subheading = 'They say it’s all about the detail.. well it is',
  cases = DEFAULT_CASES,
}: RecentCaseStudiesProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    gsap.from(container.querySelector('[data-animate="recent-header"]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="recent-header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Award cards — alternate left/right slide
    const cards = container.querySelectorAll('[data-animate="recent-card"]');
    cards.forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? -50 : 50,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card,
          start: 'top 82%',
          toggleActions: 'play none none none',
        },
      });
    });

    // Bottom CTA
    gsap.from(container.querySelector('[data-animate="recent-cta"]'), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="recent-cta"]'),
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={ref} className={styles.section} aria-labelledby="recent-case-studies-heading">
      <div className={styles.container}>
        {/* Section Header */}
        <div className={styles.header} data-animate="recent-header">
          <h2 id="recent-case-studies-heading" className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.subheading}>
            {subheading}
          </p>
        </div>

        {/* Showcase Grid */}
        <div className={styles.grid}>
          {cases.map((item) => (
            <CaseStudyCard key={item.id} data={item} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className={styles.ctaWrapper} data-animate="recent-cta">
          <Button variant="primary" size="lg" href="#work">
            View all work
          </Button>
        </div>
      </div>
    </section>
  );
}

export default RecentCaseStudies;

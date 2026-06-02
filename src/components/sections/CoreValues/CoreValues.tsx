'use client';

import React from 'react';
import type { CoreValuesProps, CoreValueData } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import { animateCountUp } from '@/lib/countUp';
import styles from './CoreValues.module.css';

/* ── SVG Icon Components ── */
function UserIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function LightbulbIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 18h6" />
      <path d="M10 22h4" />
      <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

const iconMap = {
  person: UserIcon,
  lightbulb: LightbulbIcon,
  lightning: BoltIcon,
  checkmark: CheckIcon,
};

/* ── Default Data ── */
const DEFAULT_VALUES: CoreValueData[] = [
  {
    id: 'user-centric',
    title: 'User-Centric Focus',
    description:
      "At the heart of what I do lies a deep commitment to putting users first. I firmly believe that an outstanding user experience is the cornerstone of any successful digital product.",
    icon: 'person',
  },
  {
    id: 'innovation',
    title: 'Innovation',
    description:
      "I'm a firm believer in the power of innovation. Technology is ever-evolving, and I'm dedicated to staying at the forefront of design trends and emerging technologies. My aim is to infuse fresh, creative ideas into every project to help clients stand out in their industries.",
    icon: 'lightbulb',
  },
  {
    id: 'empowerment',
    title: 'Empowerment',
    description:
      "My goal is to empower you, the founder, to make a difference in your industry. Through my expertise and guidance, I'll ensure that your product not only meets the needs of your target audience but also delights and engages them, setting you apart in the competitive landscape.",
    icon: 'lightning',
  },
  {
    id: 'results',
    title: 'Results',
    description:
      "It's not just about design for design's sake. I'm results-oriented, focusing on achieving your specific business goals. Whether it's increasing user retention, driving revenue, or enhancing brand perception, your success is my priority.",
    icon: 'checkmark',
  },
];

export function CoreValues({
  heading = 'Core values used for every design project',
  subtext = 'The output of my design is based on these principles',
  values = DEFAULT_VALUES,
}: CoreValuesProps) {

  // Dynamically parses and wraps numbers for the count-up animation
  const renderTitle = (title: string) => {
    const match = title.match(/([0-9,]+)(\+)?/);
    if (match) {
      const numberStr = match[1];
      const rawNumber = parseInt(numberStr.replace(/,/g, ''), 10);
      const suffix = match[2] || '';
      const parts = title.split(match[0]);
      return (
        <>
          {parts[0]}
          <span
            data-animate="count-number"
            data-target={rawNumber}
            data-suffix={suffix}
          >
            0
          </span>
          {suffix}
          {parts[1]}
        </>
      );
    }
    
    // Fallback for "Half the Cost" -> Animate 50%
    if (title.toLowerCase().includes('half the cost')) {
      return (
        <>
          Under{' '}
          <span
            data-animate="count-number"
            data-target={50}
            data-suffix="%"
          >
            0
          </span>
          % the Cost of Conventional Care
        </>
      );
    }
    return title;
  };

  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    gsap.from(container.querySelector('[data-animate="core-header"]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="core-header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Cards stagger
    gsap.from(container.querySelectorAll('[data-animate="core-card"]'), {
      y: 45,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.grid),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Count up numbers
    const numberEls = container.querySelectorAll('[data-animate="count-number"]');
    numberEls.forEach((el) => {
      const target = parseInt(el.getAttribute('data-target') || '0', 10);
      const suffix = el.getAttribute('data-suffix') || '';
      
      animateCountUp(el, { target, suffix, duration: 1.8 }, {
        trigger: el,
        start: 'top 88%',
        toggleActions: 'play none none none',
      });
    });
  });

  return (
    <section ref={ref} id="impact" className={styles.section} aria-labelledby="core-values-heading">
      {/* Curved cream panel — same technique as Testimonials section */}
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          {/* Section header */}
          <header className={styles.header} data-animate="core-header">
            <h2 id="core-values-heading" className={styles.heading}>
              {heading}
            </h2>
            <p className={styles.subheading}>
              {subtext}
            </p>
          </header>

          {/* 2×2 grid of value cards */}
          <div className={styles.grid}>
            {values.map(({ id, title, description, icon }) => {
              const IconComponent = iconMap[icon] || UserIcon;
              return (
                <article key={id} className={styles.card} data-animate="core-card">
                  <div className={styles.iconCircle} aria-hidden="true">
                    <IconComponent />
                  </div>
                  <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{renderTitle(title)}</h3>
                    <p className={styles.cardDescription}>{description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

export default CoreValues;

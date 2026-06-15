'use client';

import React from 'react';
import type { AwardItem, AwardsProps } from '@/types';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Awards.module.css';

const DEFAULT_AWARDS: AwardItem[] = [
  {
    id: 'award-2007',
    year: '2007',
    issuer: 'Stanford University',
    title: 'Unite For Sight Volunteer of the Year Award - International Healthcare Convention, USA',
    tags: ['Humanitarian', 'Global Recognition'],
  },
  {
    id: 'award-2014',
    year: '2014-2015',
    issuer: 'Governor of Tamil Nadu',
    title: 'Gold Medal for Excellence in Ophthalmology - State Government Recognition',
    tags: ['Clinical Excellence', 'State Award'],
  },
  {
    id: 'award-2016',
    year: '2016',
    issuer: 'CII India',
    title: 'Healthcare Entrepreneur of the Year - Confederation of Indian Industry',
    tags: ['Entrepreneurship', 'CII'],
  },
  {
    id: 'award-2017',
    year: '2017',
    issuer: 'Smart CEO Magazine',
    title: 'Start-up of the Year Award - India Start-up Ecosystem',
    tags: ['Start-up', 'Innovation'],
  },
];

function formatYear(year: string) {
  const [start, end] = year.split('-');

  if (!end) {
    return year;
  }

  return (
    <>
      {start}-
      <br />
      {end}
    </>
  );
}

export function Awards({
  className = '',
  heading = 'Awards & Honours',
  subheading = 'Recognised across India and internationally for contributions to Ophthalmology, healthcare entrepreneurship, and humanitarian eye care.',
  awards = DEFAULT_AWARDS,
}: AwardsProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    gsap.from(container.querySelector('[data-animate="awards-header"]'), {
      y: 36,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="awards-header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    const activeLine = container.querySelector('.' + styles.timelineProgress);
    if (activeLine) {
      gsap.to(activeLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container.querySelector('.' + styles.timeline),
          start: 'top 70%',
          end: 'bottom 82%',
          scrub: true,
        },
      });
    }

    container.querySelectorAll('[data-animate="award-item"]').forEach((item, index) => {
      const marker = item.querySelector('.' + styles.marker);
      const card = item.querySelector('.' + styles.card);

      if (marker) {
        gsap.from(marker, {
          scale: 0.75,
          opacity: 0,
          duration: 0.45,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }

      if (card) {
        gsap.from(card, {
          x: index % 2 === 0 ? -42 : 42,
          opacity: 0,
          duration: 0.72,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 82%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  });

  return (
    <section
      ref={ref}
      id="awards"
      className={`${styles.section} ${className}`}
      aria-labelledby="awards-heading"
    >
      <div className={styles.container}>
        <header className={styles.header} data-animate="awards-header">
          <h2 id="awards-heading" className={styles.heading}>
            {heading}
          </h2>
          <p className={styles.subheading}>{subheading}</p>
        </header>

        <div className={styles.timeline} role="list">
          <div className={styles.timelineBase} aria-hidden="true" />
          <div className={styles.timelineProgress} aria-hidden="true" />

          {awards.map((award, index) => (
            <article
              key={award.id}
              className={`${styles.item} ${index % 2 === 0 ? styles.itemLeft : styles.itemRight}`}
              role="listitem"
              data-animate="award-item"
            >
              <div className={styles.card}>
                <p className={styles.issuer}>{award.issuer}</p>
                <h3 className={styles.title}>{award.title}</h3>
                {award.tags && award.tags.length > 0 && (
                  <div className={styles.tags} aria-label={`${award.year} award categories`}>
                    {award.tags.map((tag) => (
                      <span key={tag} className={styles.tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className={styles.marker} aria-label={`${award.year} award`}>
                <span className={styles.markerYear}>{formatYear(award.year)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Awards;

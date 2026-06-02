'use client';

import type { PainPointsProps } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ChallengeCard } from './ChallengeCard';
import { DecorativeArrow } from './DecorativeArrow';
import { biographyProps as defaultPainPointsProps, biographyCta as painPointsCta } from '@/lib/content';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './PainPoints.module.css';

/* ── Inline orange star SVG — no external file ──────────────── */
function OrangeStar() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M24 0l6.5 17.5L48 24l-17.5 6.5L24 48l-6.5-17.5L0 24l17.5-6.5z"
        fill="var(--color-star-accent)"
      />
    </svg>
  );
}

export function PainPoints({
  heading1 = defaultPainPointsProps.heading1,
  heading2 = defaultPainPointsProps.heading2,
  frequentChallenges = defaultPainPointsProps.frequentChallenges,
  commonPainPoints = defaultPainPointsProps.commonPainPoints,
}: PainPointsProps = {}) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Heading reveal
    gsap.from(container.querySelector('[data-animate="pain-heading"]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="pain-heading"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Arrow reveal
    gsap.from(container.querySelector('[data-animate="pain-arrow"]'), {
      scale: 0.5,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.5)',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="pain-arrow"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Badges slide + fade
    gsap.from(container.querySelectorAll('[data-animate="pain-badge"]'), {
      x: (i) => i === 0 ? -35 : 35,
      opacity: 0,
      duration: 0.7,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="pain-badge"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Cards stagger
    gsap.from(container.querySelectorAll('[data-animate="pain-card"]'), {
      y: 50,
      opacity: 0,
      duration: 0.75,
      stagger: 0.12,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.cardsGrid),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });

    // Bottom CTA
    gsap.from(container.querySelector('[data-animate="pain-cta"]'), {
      y: 30,
      opacity: 0,
      duration: 0.7,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="pain-cta"]'),
        start: 'top 90%',
        toggleActions: 'play none none none',
      },
    });
  });

  return (
    <section ref={ref} id="about" className={styles.section} aria-labelledby="pain-points-heading">
      {/* Orange star — decorative, top-right */}
      <div className={styles.starDecor}>
        <OrangeStar />
      </div>

      {/* Section heading */}
      <div className={styles.headingWrap} data-animate="pain-heading">
        <h2 id="pain-points-heading" className={styles.heading}>
          {heading1}
          <br />
          {heading2}
        </h2>
      </div>

      {/* Decorative arrow below "solve" */}
      <div className={styles.decorativeWrap} data-animate="pain-arrow">
        <DecorativeArrow />
      </div>

      {/* Badge pills — offset positioning per screenshot */}
      <div className={styles.badgeRow}>
        <div className={styles.badgeLeft} data-animate="pain-badge">
          <Badge variant="blue">Background & Ventures</Badge>
        </div>
        <div className={styles.badgeRight} data-animate="pain-badge">
          <Badge variant="pink">Leadership & Mentorship</Badge>
        </div>
      </div>

      {/* Cards grid — 2 columns */}
      <div className={styles.cardsGrid}>
        {/* Left column — "Frequent challenges" (blue) */}
        <div className={styles.cardColumn}>
          {frequentChallenges?.map((card, index) => (
            <ChallengeCard key={index} {...card} />
          ))}
        </div>

        {/* Right column — "Common pain points" (pink) */}
        <div className={styles.cardColumn}>
          {commonPainPoints?.map((card, index) => (
            <ChallengeCard key={index} {...card} />
          ))}
        </div>
      </div>

      {/* Bottom CTA heading */}
      <div className={styles.ctaSection} data-animate="pain-cta">
        {/* <span className={styles.ctaDecorative} aria-hidden="true">❚</span> */}
        <h3 className={styles.ctaHeading}>
          {painPointsCta.subheading}
        </h3>
        <div className={styles.ctaButtonWrap}>
           <Button variant="primary" size="lg" href={painPointsCta.ctaHref}>
             {painPointsCta.ctaLabel}
           </Button>
        </div>
      </div>
    </section>
  );
}

export default PainPoints;

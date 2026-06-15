// ✓ tokens: --color-white | layout: grid | split: single step card sub-component for Pathway timeline
'use client';

import React from 'react';
import Image from 'next/image';
import type { PathwayStep } from '@/types';
import styles from './Pathway.module.css';
import {
  DiscoveryMockup,
  UXDesignMockup,
  BrandMockup,
  DesignDirectionMockup,
  UIDeliveryMockup,
} from './PathwayGraphics';

/* ── Graphic resolver ── */
const graphicMap: Record<PathwayStep['graphicVariant'], React.FC> = {
  discovery: DiscoveryMockup,
  ux: UXDesignMockup,
  brand: BrandMockup,
  direction: DesignDirectionMockup,
  delivery: UIDeliveryMockup,
};

interface PathwayCardProps {
  step: PathwayStep;
  isLast: boolean;
}

export function PathwayCard({ step, isLast }: PathwayCardProps) {
  const Graphic = graphicMap[step.graphicVariant];

  return (
    <div className={styles.step}>
      {/* Left — visual mockup */}
      <div className={styles.stepLeft}>
        {step.imageSrc ? (
          <div className={`${styles.mockupCard} ${styles.ventureImageCard}`}>
            <Image
              src={step.imageSrc}
              alt={step.imageAlt ?? step.title}
              fill
              sizes="220px"
              className={styles.ventureImage}
            />
          </div>
        ) : (
          <Graphic />
        )}
      </div>

      {/* Centre — step badge */}
      <div className={styles.stepCenter}>
        <div className={styles.stepBadge} aria-label={`Step ${step.stepNumber}`}>
          {step.stepNumber}
        </div>
      </div>

      {/* Right — text content */}
      <div className={styles.stepRight}>
        <h3 className={styles.stepTitle}>{step.title}</h3>
        <p className={styles.stepDescription}>{step.description}</p>

        <ul className={styles.checkList}>
          {step.bullets.map((b, i) => (
            <li key={i} className={styles.checkItem}>{b}</li>
          ))}
        </ul>

        {step.whyNeeded.length > 0 && (
          <>
            <h4 className={styles.whyHeading}>Why is this needed?</h4>
            <ul className={styles.checkList}>
              {step.whyNeeded.map((w, i) => (
                <li key={i} className={styles.checkItem}>{w}</li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}

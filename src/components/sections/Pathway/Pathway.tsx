// ✓ tokens: none | layout: composition | split: main Pathway section with default 5-step data
'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import type { PathwayStep, PathwayProps } from '@/types';
import styles from './Pathway.module.css';
import { PathwayCard } from './PathwayCard';
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

const mobileTitleMap: Record<number, string> = {
  1: 'Discovery',
  2: 'UX Design',
  3: 'Brand',
  4: 'Design Direction',
  5: 'UI Design',
};

/* ── Default 5 steps ── */
const DEFAULT_STEPS: PathwayStep[] = [
  {
    id: 'step-discovery',
    stepNumber: 1,
    title: 'Discovery & Research',
    description:
      'We start every project by mapping the landscape — your market, your users, and your competitors. The goal is to replace assumptions with evidence.',
    bullets: [
      'Stakeholder interviews & goal-setting',
      'User personas and journey mapping',
      'Competitor and market analysis',
      'Technical and content audit',
    ],
    whyNeeded: [
      'Skip discovery and you build on guesswork — leading to costly pivots later.',
      'A strong foundation here means every design decision has a rationale.',
    ],
    graphicVariant: 'discovery',
  },
  {
    id: 'step-ux',
    stepNumber: 2,
    title: 'UX Design & Wireframing',
    description:
      'With research in hand, I create low-fidelity wireframes and user flows that structure information hierarchy and task flows before any visual polish.',
    bullets: [
      'Information architecture & sitemap',
      'Low-fi wireframes (mobile-first)',
      'Interactive prototypes for key flows',
      'Usability testing & iteration',
    ],
    whyNeeded: [
      'Good UX is invisible — bad UX costs conversions. Testing early catches friction before it ships.',
      'Wireframes align stakeholders before expensive visual design begins.',
    ],
    graphicVariant: 'ux',
  },
  {
    id: 'step-brand',
    stepNumber: 3,
    title: 'Brand Identity & Visual Language',
    description:
      'Every brand needs a face. I develop a cohesive visual system — colours, typography, iconography, and imagery — that makes your product instantly recognisable.',
    bullets: [
      'Mood boards & style exploration',
      'Logo mark refinement',
      'Colour palette & typography scale',
      'Iconography and illustration style',
    ],
    whyNeeded: [
      'Inconsistent branding erodes trust. A design system keeps every touchpoint on-brand.',
      'A clear visual language makes marketing, product, and sales speak the same design dialect.',
    ],
    graphicVariant: 'brand',
  },
  {
    id: 'step-direction',
    stepNumber: 4,
    title: 'Design Direction & Review',
    description:
      'I present two to three high-fidelity design directions so you can compare options side-by-side — creative vs. corporate, bold vs. minimal — before committing.',
    bullets: [
      'Hi-fi mockups in multiple directions',
      'Responsive previews (mobile, tablet, desktop)',
      'Stakeholder review sessions',
      'Refinement rounds with tracked feedback',
    ],
    whyNeeded: [
      'Seeing real designs in context removes subjectivity — decisions are faster and more confident.',
      "Multiple directions ensure you don't settle; you choose the strongest option.",
    ],
    graphicVariant: 'direction',
  },
  {
    id: 'step-delivery',
    stepNumber: 5,
    title: 'UI Delivery & Handoff',
    description:
      'Final designs are pixel-polished and documented for developers. I deliver a complete handoff kit with specs, assets, and interaction notes.',
    bullets: [
      'Pixel-perfect UI components',
      'Design token export (colours, spacing, type)',
      'Developer-ready handoff via Figma',
      'Motion specs & micro-interaction guidance',
    ],
    whyNeeded: [
      "A clean handoff eliminates dev guesswork and prevents \"that doesn't look like the mockup\" moments.",
      'Documented tokens and components accelerate future feature development.',
    ],
    graphicVariant: 'delivery',
  },
];

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';

export default function Pathway({
  heading = 'The Product Strategy Pathway',
  subheading = 'A proven five-step process that takes your product from ambiguity to a polished, developer-ready design system.',
  steps = DEFAULT_STEPS,
}: PathwayProps) {
  const [activeStep, setActiveStep] = useState<number | null>(1);

  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    gsap.from(container.querySelectorAll('[data-animate="pathway-header"]'), {
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="pathway-header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Drawing down connector line
    const activeLine = container.querySelector('.' + styles.connectorLine);
    if (activeLine) {
      gsap.to(activeLine, {
        scaleY: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: container.querySelector('.' + styles.timeline),
          start: 'top 65%',
          end: 'bottom 80%',
          scrub: true,
        },
      });
    }

    // Step rows animations
    container.querySelectorAll('.' + styles.step).forEach((stepElement) => {
      // Step badge pop
      const badge = stepElement.querySelector('.' + styles.stepBadge);
      if (badge) {
        gsap.from(badge, {
          scale: 0,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: stepElement,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Left mockup slide-in
      const stepLeft = stepElement.querySelector('.' + styles.stepLeft);
      if (stepLeft) {
        gsap.from(stepLeft, {
          x: -50,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepElement,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }

      // Right text slide-in
      const stepRight = stepElement.querySelector('.' + styles.stepRight);
      if (stepRight) {
        gsap.from(stepRight, {
          x: 50,
          opacity: 0,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: stepElement,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        });
      }
    });
  });

  return (
    <section ref={ref} id="ventures" className={styles.section} aria-labelledby="pathway-heading">
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          {/* Section header */}
          <header className={styles.header}>
            <h2 id="pathway-heading" className={styles.heading} data-animate="pathway-header">
              {heading}
            </h2>
            <p className={styles.subheading} data-animate="pathway-header">{subheading}</p>
          </header>

          {/* Timeline */}
          <div className={styles.timeline} role="list">
            <div className={styles.connectorLine} />
            {steps.map((step, idx) => (
              <PathwayCard key={step.id} step={step} isLast={idx === steps.length - 1} />
            ))}
          </div>

          {/* Mobile Accordion */}
          <div className={styles.mobileAccordion} role="list">
            {steps.map((step) => {
              const Graphic = graphicMap[step.graphicVariant];
              const isOpen = activeStep === step.stepNumber;
              const mobileTitle = step.title;

              return (
                <div key={step.id} className={styles.accordionItem}>
                  <button
                    className={styles.accordionHeader}
                    onClick={() => setActiveStep(isOpen ? null : step.stepNumber)}
                    aria-expanded={isOpen}
                    aria-controls={`panel-${step.stepNumber}`}
                  >
                    <div className={styles.accordionHeaderLeft}>
                      <div className={styles.accordionBadge}>
                        {step.stepNumber}
                      </div>
                      <span className={styles.accordionTitle}>{mobileTitle}</span>
                    </div>
                    <span className={styles.accordionToggleIcon}>
                      {isOpen ? '-' : '+'}
                    </span>
                  </button>
                  <div
                    id={`panel-${step.stepNumber}`}
                    className={`${styles.accordionPanel} ${isOpen ? styles.accordionPanelExpanded : ''}`}
                  >
                    <div className={styles.accordionGraphicWrapper}>
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
                    <div className={styles.accordionTextContent}>
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
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

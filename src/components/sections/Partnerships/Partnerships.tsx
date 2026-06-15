'use client';

import React from 'react';
import Image from 'next/image';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import { PartnershipCard } from './PartnershipCard';
import type { PartnershipsProps, PartnershipItem } from '@/types';
import styles from './Partnerships.module.css';

const DEFAULT_ITEMS: PartnershipItem[] = [
  {
    id: 'pt-1',
    date: '04 Mar 25',
    title: 'Insights from a conversation with Chris Fordy at ActionCOACH York & Leeds',
    tags: ['Advice', 'Business'],
    graphicVariant: 'interview',
    imageSrc: '/images/img1.jpeg',
  },
  {
    id: 'pt-2',
    date: '21 Jun 23',
    title: 'Mastering client communication, essential skill for UX freelance',
    tags: ['Advice', 'Clients', 'Freelance'],
    graphicVariant: 'sofa',
    imageSrc: '/images/img2.jpeg',
  },
  {
    id: 'pt-3',
    date: '27 Apr 23',
    title: 'Zoom call about getting clients with James Morris',
    tags: ['Advice', 'Clients', 'Experience'],
    graphicVariant: 'zoom',
    imageSrc: '/images/img3.jpeg',
  },
  {
    id: 'pt-7',
    date: '14 Nov 23',
    title: 'Leveraging generative AI in your daily design process',
    tags: ['AI', 'Design', 'Experience'],
    graphicVariant: 'ai',
    imageSrc: '/images/img4.jpeg',
  },
  {
    id: 'pt-8',
    date: '08 Oct 23',
    title: 'Designing at scale with advanced Figma component structures',
    tags: ['Figma', 'Design', 'Advice'],
    graphicVariant: 'figma',
    imageSrc: '/images/img5.jpeg',
  },
  {
    id: 'pt-9',
    date: '11 Jul 23',
    title: 'Establishing standard UX deliverables and content strategies',
    tags: ['Content', 'Clients', 'Design'],
    graphicVariant: 'content',
    imageSrc: '/images/img6.jpeg',
  },
  {
    id: 'pt-4',
    date: '16 Jan 23',
    title: 'A few soft skills which will make you a more mature UX designer',
    tags: ['Advice', 'Design'],
    graphicVariant: 'skills',
    imageSrc: '/images/img7.jpeg',
  },
  {
    id: 'pt-5',
    date: '22 Sep 22',
    title: 'Laurence Moreton Burt seeks UX opportunities and advice',
    tags: ['Advice', 'Freelance'],
    graphicVariant: 'laurence',
    imageSrc: '/images/img8.jpeg',
  },
  {
    id: 'pt-6',
    date: '19 Aug 22',
    title: 'Working as UX designer in a company full-time versus freelancing',
    tags: ['Advice', 'Freelance'],
    graphicVariant: 'freelance',
    imageSrc: '/images/img1.jpeg',
  },
];

const SPEAKING_BODY = [
  'Dr. Senthil is a sought-after speaker, trainer, and educator who has delivered keynote talks, workshops, and training programs for doctors, hospitals, healthcare teams, and professional associations across India.',
  'His sessions combine practical healthcare management, leadership, patient psychology, communication, business strategy, and practice growth insights that are rarely taught in medical school. Through conferences, masterclasses, and customized hospital training programs, he has empowered thousands of healthcare professionals to build better practices, stronger teams, enhanced patient experiences, and sustainable healthcare organizations.',
];

const SPEAKING_HIGHLIGHTS = [
  'speaker',
  'trainer',
  'educator',
  'keynote talks',
  'workshops',
  'training programs',
  'doctors',
  'hospitals',
  'healthcare teams',
  'practical healthcare management',
  'leadership',
  'patient psychology',
  'communication',
  'business strategy',
  'practice growth insights',
  'conferences',
  'masterclasses',
  'customized hospital training programs',
  'thousands of healthcare professionals',
  'better practices',
  'stronger teams',
  'enhanced patient experiences',
  'sustainable healthcare organizations',
];

function renderSpeakingText(text: string) {
  const pattern = new RegExp(`(${SPEAKING_HIGHLIGHTS.map((term) => term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');

  return text.split(pattern).map((part, index) => {
    const isHighlighted = SPEAKING_HIGHLIGHTS.some((term) => term.toLowerCase() === part.toLowerCase());

    return isHighlighted ? (
      <span key={`${part}-${index}`} className={styles.speakingHighlight}>
        {part}
      </span>
    ) : (
      part
    );
  });
}

export function Partnerships({
  heading = 'Speaking / Training',
  items = DEFAULT_ITEMS,
}: PartnershipsProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    const headerEls = container.querySelectorAll('[data-animate="header"]');
    const headerTrigger = container.querySelector('[data-animate="header"]');
    if (headerEls.length && headerTrigger) {
      gsap.from(headerEls, {
        y: 35,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerTrigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    const intro = container.querySelector('[data-animate="speaking-intro"]');
    if (intro) {
      gsap.from(intro, {
        y: 36,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: intro,
          start: 'top 84%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Cards staggered entry
    const cardEls = container.querySelectorAll('[data-animate="partnership-card"]');
    const gridTrigger = container.querySelector('.' + styles.grid);
    if (cardEls.length && gridTrigger) {
      gsap.from(cardEls, {
        scale: 0.95,
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.08,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: gridTrigger,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      });
    }

    // Pop the badges inside each card when in view
    const badgeEls = container.querySelectorAll('[data-animate="tag-badge"]');
    if (badgeEls.length && gridTrigger) {
      gsap.from(badgeEls, {
        scale: 0,
        opacity: 0,
        duration: 0.4,
        stagger: 0.04,
        ease: 'back.out(1.7)',
        scrollTrigger: {
          trigger: gridTrigger,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });
    }
  });

  return (
    <section ref={ref} id="speaking-training" className={styles.section} aria-labelledby="partnerships-heading">
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          {/* Section Header */}
          <h2 id="partnerships-heading" className={styles.heading} data-animate="header">
            {heading}
          </h2>

          <div className={styles.speakingIntro} data-animate="speaking-intro">
            <div className={styles.speakingVisual}>
              <div className={styles.speakingImageFrame}>
                <Image
                  src="/images/img8.jpeg"
                  alt="Dr. Senthil delivering a healthcare training session"
                  fill
                  sizes="(max-width: 992px) 100vw, 42vw"
                  className={styles.speakingImage}
                />
              </div>
            </div>

            <div className={styles.speakingCopy}>
              <h3 className={styles.speakingHeading}>
                Practical training for doctors, teams, and healthcare leaders
              </h3>
              {SPEAKING_BODY.map((paragraph) => (
                <p key={paragraph}>{renderSpeakingText(paragraph)}</p>
              ))}
              <a className={styles.speakingButton} href="mailto:senthil@ophthall.in">
                Book a Speaking Slot
              </a>
            </div>
          </div>

          {/* Card Grid */}
          <div className={styles.grid}>
            {items.map((item) => (
              <div key={item.id} data-animate="partnership-card">
                <PartnershipCard data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default Partnerships;

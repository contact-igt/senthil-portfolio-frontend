'use client';

import React, { useState } from 'react';
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
  },
  {
    id: 'pt-2',
    date: '21 Jun 23',
    title: 'Mastering client communication, essential skill for UX freelance',
    tags: ['Advice', 'Clients', 'Freelance'],
    graphicVariant: 'sofa',
  },
  {
    id: 'pt-3',
    date: '27 Apr 23',
    title: 'Zoom call about getting clients with James Morris',
    tags: ['Advice', 'Clients', 'Experience'],
    graphicVariant: 'zoom',
  },
  {
    id: 'pt-7',
    date: '14 Nov 23',
    title: 'Leveraging generative AI in your daily design process',
    tags: ['AI', 'Design', 'Experience'],
    graphicVariant: 'ai',
  },
  {
    id: 'pt-8',
    date: '08 Oct 23',
    title: 'Designing at scale with advanced Figma component structures',
    tags: ['Figma', 'Design', 'Advice'],
    graphicVariant: 'figma',
  },
  {
    id: 'pt-9',
    date: '11 Jul 23',
    title: 'Establishing standard UX deliverables and content strategies',
    tags: ['Content', 'Clients', 'Design'],
    graphicVariant: 'content',
  },
  {
    id: 'pt-4',
    date: '16 Jan 23',
    title: 'A few soft skills which will make you a more mature UX designer',
    tags: ['Advice', 'Design'],
    graphicVariant: 'skills',
  },
  {
    id: 'pt-5',
    date: '22 Sep 22',
    title: 'Laurence Moreton Burt seeks UX opportunities and advice',
    tags: ['Advice', 'Freelance'],
    graphicVariant: 'laurence',
  },
  {
    id: 'pt-6',
    date: '19 Aug 22',
    title: 'Working as UX designer in a company full-time versus freelancing',
    tags: ['Advice', 'Freelance'],
    graphicVariant: 'freelance',
  },
];

const FILTERS = ['All', 'Advice', 'Design', 'Freelance', 'AI'];

export function Partnerships({
  heading = 'Partnerships & Affiliations',
  items = DEFAULT_ITEMS,
}: PartnershipsProps) {
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredItems = activeFilter === 'All'
    ? items
    : items.filter(item => item.tags.includes(activeFilter));

  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    gsap.from(container.querySelectorAll('[data-animate="header"]'), {
      y: 35,
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Filter bar entrance
    gsap.from(container.querySelectorAll('[data-animate="filter-pill"]'), {
      y: 15,
      opacity: 0,
      duration: 0.5,
      stagger: 0.05,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.filterBar),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Cards staggered entry
    gsap.from(container.querySelectorAll('[data-animate="partnership-card"]'), {
      scale: 0.95,
      y: 40,
      opacity: 0,
      duration: 0.6,
      stagger: 0.08,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.grid),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Pop the badges inside each card when in view
    gsap.from(container.querySelectorAll('[data-animate="tag-badge"]'), {
      scale: 0,
      opacity: 0,
      duration: 0.4,
      stagger: 0.04,
      ease: 'back.out(1.7)',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.grid),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  }, [activeFilter]);

  return (
    <section ref={ref} id="partnerships" className={styles.section} aria-labelledby="partnerships-heading">
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          {/* Section Header */}
          <h2 id="partnerships-heading" className={styles.heading} data-animate="header">
            {heading}
          </h2>

          {/* Filter Navigation Bar */}
          <div className={styles.filterBar}>
            {FILTERS.map((filter) => (
              <button
                key={filter}
                className={`${styles.filterPill} ${activeFilter === filter ? styles.active : ''}`}
                onClick={() => setActiveFilter(filter)}
                data-animate="filter-pill"
              >
                {filter}
              </button>
            ))}
          </div>

          {/* Card Grid */}
          <div className={styles.grid}>
            {filteredItems.map((item) => (
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

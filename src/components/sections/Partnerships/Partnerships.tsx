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

    // Filter bar entrance
    const filterEls = container.querySelectorAll('[data-animate="filter-pill"]');
    const filterTrigger = container.querySelector('.' + styles.filterBar);
    if (filterEls.length && filterTrigger) {
      gsap.from(filterEls, {
        y: 15,
        opacity: 0,
        duration: 0.5,
        stagger: 0.05,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: filterTrigger,
          start: 'top 85%',
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

// ✓ tokens: --space-4, --radius-xl | layout: flex, absolute, relative | split: reusable card sub-component
'use strict';

import React from 'react';
import { GreatRailJourneysMockup } from './GreatRailJourneysMockup';
import { TwolistMockup } from './TwolistMockup';
import type { CaseStudyData } from '@/types';
import styles from './RecentCaseStudies.module.css';

interface CaseStudyCardProps {
  data: CaseStudyData;
}

export function CaseStudyCard({ data }: CaseStudyCardProps) {
  const renderMockup = () => {
    if (data.mockupVariant === 'grj') return <GreatRailJourneysMockup />;
    if (data.mockupVariant === 'twolist') return <TwolistMockup />;
    
    // For 'award3' and 'award4', parse the year from tags
    const year = data.tags && data.tags.length > 0 ? data.tags[0] : '2024';
    return (
      <div className={styles.awardYearGraphic}>
        <span className={styles.awardYear}>{year}</span>
        <span className={styles.awardIcon}>🏆</span>
      </div>
    );
  };

  return (
    <article className={styles.card} data-animate="recent-card">
      <div className={`${styles.mockupContainer} ${styles[data.mockupVariant]}`}>
        {renderMockup()}
      </div>
      <div className={styles.cardInfo}>
        <div className={styles.badgeWrapper}>
          <span className={styles.cardBadge}>{data.client}</span>
        </div>
        <h3 className={styles.cardTitle}>{data.headline}</h3>
        {data.tags && data.tags.length > 0 && (
          <div className={styles.tagsWrapper}>
            {data.tags.map((tag, idx) => (
              <span key={idx} className={styles.tagBadge}>{tag}</span>
            ))}
          </div>
        )}
      </div>
    </article>
  );
}

export default CaseStudyCard;

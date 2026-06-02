// ✓ tokens: --color-partnerships-card-border-dashed, --radius-partnerships-card | layout: flex, absolute, relative | split: reusable card sub-component
'use strict';

import React from 'react';
import Image from 'next/image';
import type { PartnershipItem } from '@/types';
import styles from './Partnerships.module.css';

interface PartnershipCardProps {
  data: PartnershipItem;
}

export function PartnershipCard({ data }: PartnershipCardProps) {
  const getImageSrc = (variant: string) => {
    switch (variant) {
      case 'interview':
        return '/images/senthilsir3.JPG';
      case 'sofa':
        return '/images/senthilsir3.JPG';
      case 'freelance':
        return '/images/senthilsir3.JPG';
      case 'zoom':
        return '/images/senthilsir3.JPG';
      case 'skills':
        return '/images/senthilsir3.JPG';
      case 'ai':
        return '/images/senthilsir3.JPG';
      case 'figma':
        return '/images/senthilsir3.JPG';
      case 'content':
        return '/images/senthilsir3.JPG';
      case 'laurence':
        return '/images/senthilsir3.JPG';
      default:
        return '/images/senthilsir1.JPG';
    }
  };

  const imageSrc = getImageSrc(data.graphicVariant);

  return (
    <article className={styles.card}>
      <div className={styles.mediaWrapper}>
        <Image
          src={imageSrc}
          alt={data.title}
          fill
          sizes="(max-width: 768px) 100vw, 350px"
          className={styles.cardImage}
          priority={data.graphicVariant === 'freelance' || data.graphicVariant === 'sofa'}
        />
      </div>
      <div className={styles.cardContent}>
        <time className={styles.date} dateTime={data.date}>
          {data.date}
        </time>
        <h3 className={styles.cardTitle}>{data.title}</h3>
        <div className={styles.dashedDivider} />
        <div className={styles.cardTags}>
          {data.tags.map((tag) => (
            <span key={tag} className={styles.tagBadge} data-animate="tag-badge">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

export default PartnershipCard;

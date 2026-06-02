// ✓ tokens: --color-card-border-left-blue/pink, --color-card-quote, --radius-lg, --shadow-card | layout: block | split: reusable sub-component
import type { ChallengeCardProps } from '@/types';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import styles from './ChallengeCard.module.css';

export function ChallengeCard({
  variant,
  quote,
  headline,
  description,
  avatarSrc,
  avatarAlt,
}: ChallengeCardProps) {
  return (
    <article className={cn(styles.card, styles[variant])} data-animate="pain-card">
      {quote && <p className={styles.quote}>{quote}</p>}
      {headline && <h3 className={styles.headline}>{headline}</h3>}
      <p className={styles.description}>{description}</p>
      {avatarSrc && (
        <div className={styles.avatarWrap}>
          <Image
            src={avatarSrc}
            alt={avatarAlt || 'Team member'}
            width={48}
            height={48}
            sizes="48px"
          />
        </div>
      )}
    </article>
  );
}

export default ChallengeCard;
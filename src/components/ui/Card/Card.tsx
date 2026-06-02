// ✓ tokens: --color-card-bg, --color-card-border-left-blue/pink, --radius-lg, --shadow-card | layout: block | split: variant border via CSS module

import type { CardProps } from '@/types';
import { cn } from '@/lib/utils';
import styles from './Card.module.css';

export function Card({ children, variant, className }: CardProps) {
  return (
    <article className={cn(styles.card, styles[variant], className)}>
      {children}
    </article>
  );
}

export default Card;

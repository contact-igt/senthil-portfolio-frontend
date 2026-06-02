// ✓ tokens: --color-badge-blue, --color-badge-pink, --radius-pill | layout: inline-flex | split: variant via CSS module

import type { BadgeProps } from '@/types';
import { cn } from '@/lib/utils';
import styles from './Badge.module.css';

export function Badge({ children, variant, className }: BadgeProps) {
  return (
    <span className={cn(styles.badge, styles[variant], className)}>
      {children}
    </span>
  );
}

export default Badge;

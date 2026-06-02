// ✓ tokens: --color-cta-primary, --radius-pill, --shadow-btn | layout: inline-flex | split: variant/size via CSS module

import type { ButtonProps } from '@/types';
import { cn } from '@/lib/utils';
import styles from './Button.module.css';

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  onClick,
  href,
  className,
  type = 'button',
}: ButtonProps) {
  const classes = cn(styles.btn, styles[variant], styles[size], className);

  if (href) {
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}

export default Button;

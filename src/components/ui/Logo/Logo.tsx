// ✓ tokens: --color-logo-ring, --color-hero-text | layout: inline SVG | split: SVG inline — no external file

import type { LogoProps } from '@/types';
import { cn } from '@/lib/utils';

export function Logo({ className }: LogoProps) {
  return (
    <div
      className={cn('logo', className)}
      style={{ display: 'inline-flex', alignItems: 'center', gap: 'var(--space-3)' }}
    >
      {/* "Dr. Senthil Tamilarasan" wordmark */}
      <span
        style={{
          color: 'var(--color-logo-ring)',
          fontFamily: 'var(--font-family-primary)',
          fontWeight: 'var(--font-bold)',
          fontSize: '1.25rem',
          letterSpacing: '-0.01em',
          whiteSpace: 'nowrap',
        }}
      >
        Dr. Senthil Tamilarasan
      </span>
    </div>
  );
}

export default Logo;

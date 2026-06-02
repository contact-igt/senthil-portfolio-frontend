// ✓ tokens: --color-section-text | layout: inline SVG | split: decorative element extracted as SVG sub-component

import type { DecorativeArrowProps } from '@/types';

export function DecorativeArrow({ className }: DecorativeArrowProps) {
  return (
    <svg
      className={className}
      width="60"
      height="70"
      viewBox="0 0 60 70"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {/* Handdrawn swirl/arrow pointing downward-right */}
      <path
        d="M30 5c-5 8-8 16-6 28 1 8 6 14 12 18"
        stroke="var(--color-section-text)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M32 48l6 5-2-7"
        stroke="var(--color-section-text)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Small loop/swirl at top */}
      <path
        d="M30 5c4-3 8-1 7 4-1 4-5 5-7 3"
        stroke="var(--color-section-text)"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  );
}

export default DecorativeArrow;

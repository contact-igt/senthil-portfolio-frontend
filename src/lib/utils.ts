// ✓ tokens: none | layout: none | split: classname merge utility

/**
 * Merges class names, filtering out all falsy values.
 * Lightweight alternative to clsx/classnames — zero dependencies.
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

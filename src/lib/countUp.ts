import { gsap } from '@/lib/animations';

interface CountUpOptions {
  target: number;      // end value (e.g. 500000)
  suffix?: string;     // e.g. "+" or "%"
  prefix?: string;     // e.g. "$"
  duration?: number;
  decimals?: number;
}

export function animateCountUp(
  element: Element,
  options: CountUpOptions,
  scrollTrigger: any
) {
  const { target, suffix = '', prefix = '', duration = 2, decimals = 0 } = options;
  const obj = { val: 0 };

  gsap.to(obj, {
    val: target,
    duration,
    ease: 'power1.out',
    onUpdate: () => {
      element.textContent =
        prefix + obj.val.toFixed(decimals) + suffix;
    },
    scrollTrigger,
  });
}

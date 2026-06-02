import { useEffect, useRef, RefObject } from 'react';
import { gsap, ScrollTrigger } from '@/lib/animations';

type AnimationFn = (container: HTMLElement) => void;

export function useScrollAnimation<T extends HTMLElement = HTMLElement>(
  animationFn: AnimationFn,
  deps: unknown[] = []
): RefObject<T | null> {
  const ref = useRef<T>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return; // SSR guard
    if (!ref.current) return;

    // gsap.context scopes all selectors to the container
    // ctx.revert() cleans up every animation + ScrollTrigger on unmount
    const ctx = gsap.context(() => {
      animationFn(ref.current!);
    }, ref);

    ScrollTrigger.refresh();

    return () => ctx.revert();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);

  return ref;
}

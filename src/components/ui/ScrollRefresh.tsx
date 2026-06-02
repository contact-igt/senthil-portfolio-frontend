'use client';

import { useEffect } from 'react';
import { ScrollTrigger } from '@/lib/animations';

export function ScrollRefresh() {
  useEffect(() => {
    // Refresh after fonts + dynamic imports settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  return null;
}

export default ScrollRefresh;

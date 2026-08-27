'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { ScrollTrigger } from '@/lib/animations';

export function ScrollRefresh() {
  const pathname = usePathname();

  useEffect(() => {
    // Refresh after fonts + dynamic imports settle
    const timer = setTimeout(() => {
      ScrollTrigger.refresh();
      
      // Auto-scroll to hash if present in URL
      if (window.location.hash) {
        const el = document.querySelector(window.location.hash);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}

export default ScrollRefresh;

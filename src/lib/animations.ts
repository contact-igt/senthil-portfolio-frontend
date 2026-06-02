import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

// Register once globally on client-side only
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
  
  // Recalculate trigger positions on resize, load, visibility change
  ScrollTrigger.config({
    autoRefreshEvents: 'visibilitychange,DOMContentLoaded,load,resize',
  });
}

export { gsap, ScrollTrigger };

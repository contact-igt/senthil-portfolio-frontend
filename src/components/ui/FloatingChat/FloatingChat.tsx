'use client';

import React, { useEffect, useRef } from 'react';
import { gsap } from '@/lib/animations';
import styles from './FloatingChat.module.css';

export function FloatingChat() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isVisibleRef = useRef(true);
  const lastScrollY = useRef(0);

  useEffect(() => {
    // 1. Spring entrance bounce on load
    if (wrapperRef.current) {
      gsap.fromTo(
        wrapperRef.current,
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.8,
          ease: 'back.out(1.7)',
          delay: 0.6,
        }
      );
    }

    // 2. Scroll listener to show/hide based on scroll direction
    const handleScroll = () => {
      if (typeof window === 'undefined') return;
      const currentScrollY = window.scrollY;

      if (currentScrollY > 150) {
        if (currentScrollY > lastScrollY.current) {
          // Scrolling down -> Hide
          if (isVisibleRef.current) {
            isVisibleRef.current = false;
            gsap.to(wrapperRef.current, {
              y: 120,
              opacity: 0,
              duration: 0.45,
              ease: 'power2.in',
            });
          }
        } else {
          // Scrolling up -> Show
          if (!isVisibleRef.current) {
            isVisibleRef.current = true;
            gsap.to(wrapperRef.current, {
              y: 0,
              opacity: 1,
              duration: 0.45,
              ease: 'power2.out',
            });
          }
        }
      } else {
        // Near top -> always show
        if (!isVisibleRef.current) {
          isVisibleRef.current = true;
          gsap.to(wrapperRef.current, {
            y: 0,
            opacity: 1,
            duration: 0.45,
            ease: 'power2.out',
          });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div ref={wrapperRef} className={styles.chatWrapper}>
      
      {/* Interactive Rotating Outer Dotted Ring */}
      <div className={styles.dottedRing} aria-hidden="true" />
      
      {/* Solid Inner Yellow Contact Button */}
      <button 
        type="button" 
        className={styles.yellowBtn} 
        aria-label="Open Contact Chat"
        onClick={() => {
          // Placeholder click action (e.g. scroll to footer/contact or open form)
          const contactSection = document.getElementById('contact');
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: 'smooth' });
          } else {
            console.log('Floating chat button clicked.');
          }
        }}
      >
        {/* Custom High-Fidelity Speech Bubble SVG */}
        <svg 
          width="26" 
          height="26" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--color-black)" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          {/* Main bubble shape */}
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          
          {/* Subtle triple indicator lines inside */}
          <line x1="9" y1="10" x2="15" y2="10" strokeWidth="1.8" />
          <line x1="9" y1="14" x2="13" y2="14" strokeWidth="1.8" />
        </svg>
      </button>

    </div>
  );
}

export default FloatingChat;

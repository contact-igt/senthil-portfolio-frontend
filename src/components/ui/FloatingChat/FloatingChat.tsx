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
      
      {/* Solid Inner Scheduling Button */}
      <button 
        type="button" 
        className={styles.yellowBtn} 
        aria-label="Book a session"
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
        {/* Calendly-style scheduling icon */}
        <svg 
          width="27" 
          height="27" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="var(--color-black)" 
          strokeWidth="2.1" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <rect x="4" y="5" width="16" height="15" rx="3" />
          <path d="M8 3v4" />
          <path d="M16 3v4" />
          <path d="M4 10h16" />
          <path d="M8.4 14.2l2.1 2.1 5.1-5.1" />
        </svg>
      </button>

    </div>
  );
}

export default FloatingChat;

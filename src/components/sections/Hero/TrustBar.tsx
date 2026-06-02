'use client';

import React, { useEffect, useRef } from 'react';
import type { TrustBarProps } from '@/types';
import { gsap } from '@/lib/animations';
import styles from './TrustBar.module.css';

function HospitalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="#ffffff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M3 21h18" />
      <path d="M5 21V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16" />
      <path d="M9 21v-4a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v4" />
      <path d="M10 9h4" />
      <path d="M12 7v4" />
    </svg>
  );
}

function GoogleLogo() {
  return (
    <div className={styles.googleG}>
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
}

export function TrustBar({
  label = '600+ Eye Hospitals',
  rating = '4.9',
  ratingSource = 'Ophthall Network',
}: TrustBarProps) {
  const badge1Ref = useRef<HTMLDivElement>(null);
  const badge2Ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Floating animation for Badge 1 (Hospitals)
      gsap.to(badge1Ref.current, {
        y: '-=15',
        x: '+=6',
        rotation: '+=1.5',
        duration: 3,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });

      // Floating animation for Badge 2 (Google Rating) - slightly offset speed/height
      gsap.to(badge2Ref.current, {
        y: '+=15',
        x: '-=4',
        rotation: '-=1.5',
        duration: 3.4,
        ease: 'sine.inOut',
        yoyo: true,
        repeat: -1,
      });
    });

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.trustBadgesContainer}>
      {/* Badge 1: Eye Hospitals */}
      <div ref={badge1Ref} className={`${styles.badge} ${styles.badgeLeft}`}>
        <div className={styles.iconCircle}>
          <HospitalIcon />
        </div>
        <div className={styles.textPill}>
          <span className={styles.label}>{label}</span>
        </div>
      </div>

      {/* Badge 2: Google Rating */}
      <div ref={badge2Ref} className={`${styles.badge} ${styles.badgeRight}`}>
        <div className={styles.iconCircle}>
          <GoogleLogo />
        </div>
        <div className={styles.textPill}>
          <span className={styles.ratingText}>
            <span className={styles.rating}>{rating} <span className={styles.stars}>⭐⭐⭐⭐⭐</span></span> on {ratingSource}
          </span>
        </div>
      </div>
    </div>
  );
}

export default TrustBar;

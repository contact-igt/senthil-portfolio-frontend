// ✓ tokens: --color-partner-purple, --color-partner-peach, --color-partner-teal | layout: absolute, flex, grid | split: graphic sub-component
'use strict';

import React from 'react';
import Image from 'next/image';
import styles from './TabletMockup.module.css';

/* ── Inline Crosshair SVG ───────────────────────────────── */
function Crosshair() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="rgba(255, 255, 255, 0.25)"
      strokeWidth="1.5"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <line x1="12" y1="4" x2="12" y2="20" />
      <line x1="4" y1="12" x2="20" y2="12" />
    </svg>
  );
}

/* ── Inline Sparkline graph SVG for Card 1 ──────────────── */
function SparklineOne() {
  return (
    <svg
      viewBox="0 0 100 30"
      width="100%"
      height="30"
      fill="none"
      stroke="var(--color-partner-teal)"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 25 Q 15 5, 30 18 T 60 10 T 90 28 L 100 15"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* ── Inline Sparkline graph SVG for Card 2 ──────────────── */
function SparklineTwo() {
  return (
    <svg
      viewBox="0 0 100 30"
      width="100%"
      height="30"
      fill="none"
      stroke="var(--color-partner-peach)"
      strokeWidth="2"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 10 Q 20 28, 40 12 T 70 24 T 100 5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function TabletMockup() {
  return (
    <div className={styles.visualContainer} aria-hidden="true">
      {/* ── Background Blueprint Grid & Shapes ──────────────── */}
      <div className={styles.gridBlueprint} />
      <div className={styles.purpleBlob} />
      <div className={styles.peachDot} />
      <div className={styles.tealDot} />
      <div className={styles.crosshairWrap}>
        <Crosshair />
      </div>

      {/* ── Tablet Frame ───────────────────────────────────── */}
      <div className={styles.tabletFrame}>
        {/* Glossy overlay screen glare */}
        <div className={styles.screenGlare} />
        
        {/* Tablet Bezel & Camera notch */}
        <div className={styles.bezelHeader}>
          <div className={styles.cameraNotch} />
        </div>

        {/* ── Tablet Screen Image of Dr. Senthil ────────────────── */}
        <div className={styles.imageContainer}>
          <Image
            src="/images/senthilsir2.JPG"
            alt="Dr. T. Senthil Tamilaraasan"
            fill
            sizes="(max-width: 768px) 100vw, 600px"
            className={styles.mockupImage}
            priority
          />
        </div>
      </div>
    </div>
  );
}

export default TabletMockup;

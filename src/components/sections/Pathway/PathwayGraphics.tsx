// ✓ tokens: none | layout: flex, absolute, relative | split: visual graphic sub-components for Pathway section
'use strict';

import React from 'react';
import styles from './Pathway.module.css';

/* ─────────────────────────────────────────────────
   1. Discovery Mockup
   Light blue/grey card with sticky notes, colored
   circles, concentric target rings, envelope shape,
   and sketch cursor lines.
───────────────────────────────────────────────── */
export function DiscoveryMockup() {
  return (
    <div className={`${styles.mockupCard} ${styles.discoveryCard}`} aria-hidden="true">
      {/* Top sticky note (yellow) */}
      <div className={styles.stickyTopRight}>
        <div className={styles.stickyLineShort} />
        <div className={styles.stickyLineLong} />
        <div className={styles.stickyLineShort} />
      </div>

      {/* Typography label "TT" */}
      <div className={styles.discoveryTT}>TT</div>

      {/* Colored dots row */}
      <div className={styles.discoveryDots}>
        <div className={`${styles.dot} ${styles.dotYellow}`} />
        <div className={`${styles.dot} ${styles.dotGreen}`} />
        <div className={`${styles.dot} ${styles.dotPurple}`} />
      </div>

      {/* Concentric circles (target) */}
      <div className={styles.discoveryTarget}>
        <div className={styles.ring3}>
          <div className={styles.ring2}>
            <div className={styles.ring1} />
          </div>
        </div>
      </div>

      {/* Envelope icon */}
      <div className={styles.discoveryEnvelope}>
        <svg width="28" height="22" viewBox="0 0 28 22" fill="none">
          <rect x="1" y="1" width="26" height="20" rx="2" stroke="#9ca3af" strokeWidth="1.5" />
          <path d="M1 4l13 9 13-9" stroke="#9ca3af" strokeWidth="1.5" />
        </svg>
      </div>

      {/* Cursor */}
      <div className={styles.discoveryCursor}>
        <svg width="14" height="18" viewBox="0 0 14 18" fill="none">
          <path d="M1 1l12 9-5.5 1.5L11 17l-2 .5-3.5-5.5L2 15V1z" fill="white" stroke="#9ca3af" strokeWidth="1" />
        </svg>
      </div>

      {/* Bottom sticky note */}
      <div className={styles.stickyBottomLeft}>
        <div className={styles.stickyLineShort} />
        <div className={styles.stickyLineLong} />
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   2. UX Design Mockup
   Warm cream card with user-flow flowchart: pink,
   yellow, purple sticky blocks linked by SVG dashed
   arrows, central blue diamond "User flow" node.
───────────────────────────────────────────────── */
export function UXDesignMockup() {
  return (
    <div className={`${styles.mockupCard} ${styles.uxCard}`} aria-hidden="true">
      <div className={styles.flowChart}>
        {/* Top row: pink block */}
        <div className={`${styles.flowBlock} ${styles.flowBlockPink}`}>
          <div className={styles.flowBlockLine} />
          <div className={styles.flowBlockLine} />
        </div>

        {/* Arrow right to diamond */}
        <svg className={styles.flowArrowH} width="40" height="16" viewBox="0 0 40 16" fill="none">
          <path d="M0 8h30M30 8l-6-5M30 8l-6 5" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>

        {/* Centre diamond */}
        <div className={styles.flowDiamond}>
          <span>User<br />flow</span>
        </div>

        {/* Arrow right to yellow */}
        <svg className={styles.flowArrowH} width="40" height="16" viewBox="0 0 40 16" fill="none">
          <path d="M0 8h30M30 8l-6-5M30 8l-6 5" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>

        {/* Right: yellow block */}
        <div className={`${styles.flowBlock} ${styles.flowBlockYellow}`}>
          <div className={styles.flowBlockLine} />
          <div className={styles.flowBlockLine} />
        </div>

        {/* Bottom purple block with arrow down from diamond */}
        <div className={styles.flowBottomRow}>
          <svg className={styles.flowArrowV} width="16" height="40" viewBox="0 0 16 40" fill="none">
            <path d="M8 0v30M8 30l-5-6M8 30l5-6" stroke="#9ca3af" strokeWidth="1.5" strokeDasharray="4 2" />
          </svg>
          <div className={`${styles.flowBlock} ${styles.flowBlockPurple}`}>
            <div className={styles.flowBlockLine} />
            <div className={styles.flowBlockLine} />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   3. Brand Mockup
   Vibrant yellow card with rotated white paper,
   asterisk burst, red/orange accent blobs, and
   italic "Brand" text with an arrow.
───────────────────────────────────────────────── */
export function BrandMockup() {
  return (
    <div className={`${styles.mockupCard} ${styles.brandCard}`} aria-hidden="true">
      {/* Accent blobs */}
      <div className={styles.brandBlobRed} />
      <div className={styles.brandBlobOrange} />

      {/* Asterisk burst */}
      <div className={styles.brandAsterisk}>
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
          <line x1="16" y1="2" x2="16" y2="30" stroke="#002f42" strokeWidth="2.5" />
          <line x1="2" y1="16" x2="30" y2="16" stroke="#002f42" strokeWidth="2.5" />
          <line x1="5" y1="5" x2="27" y2="27" stroke="#002f42" strokeWidth="2.5" />
          <line x1="27" y1="5" x2="5" y2="27" stroke="#002f42" strokeWidth="2.5" />
        </svg>
      </div>

      {/* Rotated white paper card */}
      <div className={styles.brandPaper}>
        <div className={styles.brandPaperTitle}>Brand</div>
        <div className={styles.brandPaperLines}>
          <div className={styles.brandPaperLine} />
          <div className={styles.brandPaperLine} />
        </div>
        <div className={styles.brandPaperArrow}>
          <svg width="28" height="14" viewBox="0 0 28 14" fill="none">
            <path d="M0 7h22M22 7l-6-5M22 7l-6 5" stroke="#002f42" strokeWidth="2" />
          </svg>
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   4. Design Direction Mockup
   Soft light-grey card showing two vertical phone
   wireframe panels: "Creative" (colourful) and
   "Corporate" (clean professional).
───────────────────────────────────────────────── */
export function DesignDirectionMockup() {
  return (
    <div className={`${styles.mockupCard} ${styles.directionCard}`} aria-hidden="true">
      {/* Creative panel */}
      <div className={styles.directionFrame}>
        <div className={styles.directionFrameLabel}>Creative</div>
        <div className={styles.directionFrameBody}>
          {/* colorful grid accent */}
          <div className={styles.creativeGrid}>
            <div className={`${styles.creativeBlock} ${styles.cbGreen}`} />
            <div className={`${styles.creativeBlock} ${styles.cbBlue}`} />
            <div className={`${styles.creativeBlock} ${styles.cbPurple}`} />
            <div className={`${styles.creativeBlock} ${styles.cbYellow}`} />
          </div>
          <div className={styles.directionLineShort} />
          <div className={styles.directionLineLong} />
          <div className={styles.directionCta} />
        </div>
      </div>

      {/* Corporate panel */}
      <div className={`${styles.directionFrame} ${styles.directionFrameRight}`}>
        <div className={styles.directionFrameLabel}>Corporate</div>
        <div className={styles.directionFrameBody}>
          {/* photo placeholder */}
          <div className={styles.corporatePhoto}>
            <div className={styles.corporatePhotoBg} />
          </div>
          <div className={styles.directionLineShort} />
          <div className={styles.directionLineLong} />
          <div className={`${styles.directionCta} ${styles.directionCtaPurple}`} />
        </div>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────
   5. UI Delivery Mockup
   Deep dark indigo card showing a browser/dashboard
   interface with colourful bar charts, slider,
   and toggle / form fields.
───────────────────────────────────────────────── */
export function UIDeliveryMockup() {
  return (
    <div className={`${styles.mockupCard} ${styles.deliveryCard}`} aria-hidden="true">
      {/* Browser chrome */}
      <div className={styles.deliveryBrowser}>
        <div className={styles.browserDots}>
          <span className={styles.browserDot} style={{ background: '#ff5f57' }} />
          <span className={styles.browserDot} style={{ background: '#febc2e' }} />
          <span className={styles.browserDot} style={{ background: '#28c840' }} />
        </div>
        <div className={styles.browserBar} />
      </div>

      {/* Dashboard content */}
      <div className={styles.deliveryContent}>
        {/* Mini bar chart */}
        <div className={styles.chartRow}>
          <div className={`${styles.chartBar} ${styles.chartBarBlue}`} style={{ height: '45px' }} />
          <div className={`${styles.chartBar} ${styles.chartBarGreen}`} style={{ height: '60px' }} />
          <div className={`${styles.chartBar} ${styles.chartBarPurple}`} style={{ height: '35px' }} />
          <div className={`${styles.chartBar} ${styles.chartBarPink}`} style={{ height: '50px' }} />
          <div className={`${styles.chartBar} ${styles.chartBarBlue}`} style={{ height: '40px' }} />
        </div>

        {/* Slider control */}
        <div className={styles.deliverySlider}>
          <div className={styles.sliderTrack}>
            <div className={styles.sliderFill} />
            <div className={styles.sliderThumb} />
          </div>
        </div>

        {/* Toggle rows */}
        <div className={styles.deliveryToggles}>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabel} />
            <div className={`${styles.togglePill} ${styles.toggleOn}`} />
          </div>
          <div className={styles.toggleRow}>
            <div className={styles.toggleLabel} style={{ width: '55%' }} />
            <div className={styles.togglePill} />
          </div>
        </div>
      </div>
    </div>
  );
}

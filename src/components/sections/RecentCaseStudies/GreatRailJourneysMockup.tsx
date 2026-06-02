// ✓ tokens: --color-recentcasestudies-grj-bg, --radius-lg, --shadow-mockup | layout: flex, grid, absolute | split: custom mockup sub-component
'use strict';

import React from 'react';
import Image from 'next/image';
import styles from './RecentCaseStudies.module.css';

export function GreatRailJourneysMockup() {
  return (
    <div className={styles.grjWrapper} aria-hidden="true">
      {/* Device body */}
      <div className={styles.tabletDevice}>
        {/* Device screen */}
        <div className={styles.tabletScreen}>
          {/* Scenic Background Image */}
          <div className={styles.screenBg}>
            <Image
              src="/images/senthilsir4.JPG"
              alt="River Cruise Scene"
              fill
              sizes="(max-width: 768px) 100vw, 500px"
              priority={false}
              className={styles.bgImage}
            />
            {/* Dark tint overlay to make mock content readable */}
            <div className={styles.imageOverlay} />
          </div>

          {/* Website Content Mock */}
          <div className={styles.webContent}>
            {/* Header */}
            <header className={styles.webHeader}>
              <div className={styles.webLogoRow}>
                <div className={styles.webLogo}>
                  <span className={styles.logoCircle}>GR</span>
                  <span className={styles.logoText}>GREAT RAIL<br />JOURNEYS</span>
                </div>
                <nav className={styles.webNav}>
                  <span>Overview</span>
                  <span>River Tours</span>
                  <span>Cruise Types</span>
                  <span>Luxury Ships</span>
                </nav>
              </div>
              <div className={styles.headerRight}>
                <span className={styles.searchIcon}>🔍</span>
              </div>
            </header>

            {/* Central Hero Form Card */}
            <div className={styles.searchCard}>
              <h4 className={styles.searchHeading}>FIND YOUR PERFECT RIVER CRUISE</h4>
              <p className={styles.searchSub}>EXPLORE BY RAIL, RELAX BY RIVER</p>
              
              <div className={styles.searchForm}>
                <div className={styles.formGroup}>
                  <label>Cruise type</label>
                  <div className={styles.fakeInput}>Select type...</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Passengers</label>
                  <div className={styles.fakeInput}>2 Passengers</div>
                </div>
                <div className={styles.formGroup}>
                  <label>Departure date</label>
                  <div className={styles.fakeInput}>Any Date</div>
                </div>
                <button type="button" className={styles.fakeSearchBtn}>
                  SEARCH
                </button>
              </div>
            </div>
            
            {/* Bottom Content Hint */}
            <div className={styles.bottomHint}>
              <p>OUR RIVER CRUISES ARE COMBINED WITH...</p>
            </div>
          </div>
        </div>
        
        {/* Screen Glare reflection */}
        <div className={styles.screenGlare} />
      </div>
    </div>
  );
}

export default GreatRailJourneysMockup;

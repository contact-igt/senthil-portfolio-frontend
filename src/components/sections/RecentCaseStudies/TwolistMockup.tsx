// ✓ tokens: --color-recentcasestudies-twolist-bg, --radius-lg, --shadow-mockup | layout: flex, absolute, relative | split: custom mockup sub-component
'use strict';

import React from 'react';
import styles from './RecentCaseStudies.module.css';

/* ── Inline Signal Icon ── */
function SignalIcon() {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="8" width="2.5" height="3" rx="0.5" fill="currentColor" />
      <rect x="4.5" y="6" width="2.5" height="5" rx="0.5" fill="currentColor" />
      <rect x="8.5" y="4" width="2.5" height="7" rx="0.5" fill="currentColor" />
      <rect x="12.5" y="1" width="2.5" height="10" rx="0.5" fill="currentColor" opacity="0.4" />
    </svg>
  );
}

/* ── Inline Wifi Icon ── */
function WifiIcon() {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" fill="currentColor" />
      <path d="M1.5 5.5C4.81371 2.18629 10.1863 2.18629 13.5 5.5" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 8C5.933 6.067 9.067 6.067 11 8" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

/* ── Inline Battery Icon ── */
function BatteryIcon() {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke="currentColor" opacity="0.65" />
      <rect x="2.5" y="2.5" width="12" height="6" rx="1.2" fill="currentColor" />
      <path d="M20 3.5V7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Inline Google Icon ── */
function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22c-.22-.66-.35-1.36-.35-2.09z" fill="#FBBC05" />
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
    </svg>
  );
}

/* ── Inline Apple Icon ── */
function AppleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.05 20.28c-.98.95-2.05 1.88-3.08 1.88-1.07 0-1.4-.65-2.61-.65-1.22 0-1.6.63-2.61.67-1.04.04-2.2-.99-3.21-1.96-2.06-2-3.64-5.63-3.64-9.05 0-5.43 3.52-8.3 7-8.3 1.09 0 2.12.67 2.78.67.66 0 1.89-.8 3.2-.67.55.02 2.1.22 3.1 1.68-.08.05-1.85 1.08-1.85 3.22 0 2.56 2.1 3.5 2.13 3.51-.02.05-.33 1.15-1.12 2.29-.68.99-1.39 1.98-2.43 1.97-.04.01-.08 0-.1.02zM14.86 3.25c.58-.7 1.37-1.6 1.2-2.75-1 .04-2.2.67-2.92 1.51-.62.71-1.16 1.63-.98 2.75 1.1.09 2.11-.53 2.7-1.51z" />
    </svg>
  );
}

export function TwolistMockup() {
  return (
    <div className={styles.twolistWrapper} aria-hidden="true">
      {/* Phone chassis */}
      <div className={styles.phoneDevice}>
        {/* Screen */}
        <div className={styles.phoneScreen}>
          {/* Status Bar */}
          <div className={styles.phoneStatusBar}>
            <span className={styles.phoneTime}>9:41</span>
            <div className={styles.phoneIcons}>
              <SignalIcon />
              <WifiIcon />
              <BatteryIcon />
            </div>
          </div>

          {/* Notch */}
          <div className={styles.phoneNotch} />

          {/* Screen Content */}
          <div className={styles.phoneContent}>
            {/* Logo */}
            <div className={styles.appLogoSection}>
              <div className={styles.twolistLogoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </div>
              <h4 className={styles.twolistName}>twolist</h4>
              <p className={styles.twolistSub}>tasks made simple</p>
            </div>

            {/* Checklist Form mockup */}
            <div className={styles.checklistCard}>
              <div className={styles.checkRow}>
                <span className={`${styles.checkCircle} ${styles.checked}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className={styles.fakeCheckText} />
              </div>
              <div className={styles.checkRow}>
                <span className={`${styles.checkCircle} ${styles.checked}`}>
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </span>
                <div className={styles.fakeCheckText} />
              </div>
              <div className={styles.checkRow}>
                <span className={styles.checkCircle} />
                <div className={styles.fakeCheckTextMuted} />
              </div>
              <div className={styles.checkRow}>
                <span className={styles.checkCircle} />
                <div className={styles.fakeCheckTextMuted} />
              </div>
            </div>

            {/* OAuth Buttons */}
            <div className={styles.oauthContainer}>
              <button type="button" className={styles.oauthBtn}>
                <GoogleIcon />
                <span>Continue with Google</span>
              </button>
              <button type="button" className={styles.oauthBtn}>
                <AppleIcon />
                <span>Continue with Apple</span>
              </button>
            </div>
          </div>
        </div>

        {/* Gloss overlay */}
        <div className={styles.phoneGlare} />
      </div>
    </div>
  );
}

export default TwolistMockup;

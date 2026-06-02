// ✓ tokens: --color-casestudies-card-black, --color-casestudies-card-teal, --color-casestudies-card-beige | layout: flex, absolute, relative | reused: none
'use strict';

import React from 'react';
import styles from './MobileScreen.module.css';

/* ── Lightweight Inline Device Status Icons ────────────── */
function SignalIcon({ color }: { color: string }) {
  return (
    <svg width="17" height="11" viewBox="0 0 17 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0.5" y="8" width="2.5" height="3" rx="0.5" fill={color} />
      <rect x="4.5" y="6" width="2.5" height="5" rx="0.5" fill={color} />
      <rect x="8.5" y="4" width="2.5" height="7" rx="0.5" fill={color} />
      <rect x="12.5" y="1" width="2.5" height="10" rx="0.5" fill={color} opacity="0.4" />
    </svg>
  );
}

function WifiIcon({ color }: { color: string }) {
  return (
    <svg width="15" height="11" viewBox="0 0 15 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M7.5 11C8.32843 11 9 10.3284 9 9.5C9 8.67157 8.32843 8 7.5 8C6.67157 8 6 8.67157 6 9.5C6 10.3284 6.67157 11 7.5 11Z" fill={color} />
      <path d="M1.5 5.5C4.81371 2.18629 10.1863 2.18629 13.5 5.5" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
      <path d="M4 8C5.933 6.067 9.067 6.067 11 8" stroke={color} strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BatteryIcon({ color }: { color: string }) {
  return (
    <svg width="22" height="11" viewBox="0 0 22 11" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <rect x="0.5" y="0.5" width="18" height="10" rx="2.5" stroke={color} opacity="0.65" />
      <rect x="2.5" y="2.5" width="12" height="6" rx="1.2" fill={color} />
      <path d="M20 3.5V7.5" stroke={color} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}

/* ── Screen 1: Welcome / Brand Screen ─────────────────── */
function WelcomeScreen() {
  return (
    <div className={styles.welcomeContainer}>
      <div className={styles.brandRow}>
        {/* Stylized R logo */}
        <div className={styles.logoBadge}>
          <span className={styles.logoText}>R</span>
        </div>
        <span className={styles.clientTag}>Hand Picked Hotels</span>
      </div>
      <h3 className={styles.welcomeHeading}>
        Welcome to<br />
        <span className={styles.welcomeTitleAccent}>Really Social.</span><br />
        The hospitality<br />
        app that<br />
        does more.<br />
        <span className={styles.welcomeAccent}>Full of tasty<br />features.</span>
      </h3>
      <div className={styles.footerRow}>
        <button type="button" className={styles.skipBtn}>Skip</button>
      </div>
    </div>
  );
}

/* ── Screen 2: Dashboard Overview Screen ─────────────── */
function DashboardScreen() {
  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashHeader}>
        <svg className={styles.homeIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
          <path d="M3 9.5L12 3L21 9.5V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V9.5Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
        </svg>
        <span className={styles.headerLabel}>Dashboard</span>
      </div>
      <p className={styles.dashSub}>all the information you'll manage your business</p>
      
      {/* Central Stats Card */}
      <div className={styles.statsCard}>
        <div className={styles.cardHeader}>
          <span className={styles.businessName}>Jino Thai restaurant</span>
          <div className={styles.tabBar}>
            <span>1D</span>
            <span className={styles.activeTab}>1W</span>
            <span>1M</span>
          </div>
        </div>

        {/* Stats and Mini Donut Chart */}
        <div className={styles.gridStats}>
          <div className={styles.metricsCol}>
            <div className={styles.metricItem}>
              <span className={styles.statVal}>15k</span>
              <span className={styles.statLabel}>Audience Reached</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.statVal}>10k</span>
              <span className={styles.statLabel}>Engagements</span>
            </div>
            <div className={styles.metricItem}>
              <span className={styles.statVal}>42</span>
              <span className={styles.statLabel}>Campaigns Content</span>
            </div>
          </div>

          <div className={styles.chartCol}>
            <div className={styles.donutRing}>
              <svg width="60" height="60" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#E6E6FA" strokeWidth="3" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="var(--color-casestudies-bg)" strokeWidth="3.2" strokeDasharray="45 55" strokeDashoffset="25" />
                <circle cx="18" cy="18" r="15.915" fill="none" stroke="#3DDC84" strokeWidth="3.2" strokeDasharray="30 70" strokeDashoffset="80" />
              </svg>
              <span className={styles.donutCenter}>45%</span>
            </div>
            <div className={styles.legend}>
              <span className={styles.legendDot} style={{ background: 'var(--color-casestudies-bg)' }} />
              <span className={styles.legendLabel}>Organic</span>
            </div>
          </div>
        </div>

        <button type="button" className={styles.tourBtn}>Take tour</button>
      </div>

      <div className={styles.dashFooter}>
        <button type="button" className={styles.skipBtnDark}>Skip</button>
        <div className={styles.dots}>
          <span className={styles.dotActive} />
          <span className={styles.dot} />
          <span className={styles.dot} />
        </div>
      </div>
    </div>
  );
}

/* ── Screen 3: CRM Customers Screen ──────────────────── */
function CustomersScreen() {
  const customerList = [
    { name: 'John Smith', meta: 'Engagement: High', initial: 'JS', bg: '#00a0e3' },
    { name: 'Lynn Jones', meta: 'New Customer', initial: 'LJ', bg: '#FFAE8A' },
    { name: 'Peter Werth', meta: 'Loyal Client', initial: 'PW', bg: '#7BE5D9' },
    { name: 'Ann Jones', meta: 'Referral Sign-up', initial: 'AJ', bg: '#C084B0' },
  ];

  return (
    <div className={styles.crmContainer}>
      <h3 className={styles.crmTitle}>understand your customers</h3>
      <p className={styles.crmSub}>customer info, create send offers and rewards. coming back for more.</p>

      {/* CRM Card */}
      <div className={styles.crmCard}>
        <div className={styles.crmCardHeader}>
          <span className={styles.crmCardTitle}>Customers</span>
          <div className={styles.crmMetrics}>
            <span><strong>112</strong> repeat</span>
            <span className={styles.dotDivider}>•</span>
            <span><strong>686</strong> total</span>
          </div>
        </div>

        <ul className={styles.customerList}>
          {customerList.map((cust, idx) => (
            <li key={idx} className={styles.customerItem}>
              <div className={styles.avatarCircle} style={{ background: cust.bg }}>
                {cust.initial}
              </div>
              <div className={styles.customerInfo}>
                <span className={styles.custName}>{cust.name}</span>
                <span className={styles.custMeta}>{cust.meta}</span>
              </div>
              <svg className={styles.chevron} width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path d="M9 5L16 12L9 19" stroke="#999" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </li>
          ))}
        </ul>
      </div>

      <div className={styles.crmFooter}>
        <button type="button" className={styles.nextBtn}>Next</button>
      </div>
    </div>
  );
}

/* ── Main Mobile Device Shell Wrapper ─────────────────── */
interface MobileScreenProps {
  variant: 'welcome' | 'dashboard' | 'customers';
  index: number;
}

export function MobileScreen({ variant, index }: MobileScreenProps) {
  const isDark = variant === 'welcome';
  const themeClass = isDark ? styles.deviceDark : styles.deviceLight;
  const statusColor = isDark ? '#FFFFFF' : '#1A1A1A';

  return (
    <div className={`${styles.deviceWrapper} ${themeClass}`} style={{ '--index': index } as React.CSSProperties} data-animate="case-screen">
      <div className={styles.innerFrame}>
        {/* Device Status Bar */}
        <div className={styles.statusBar}>
          <span className={styles.time} style={{ color: statusColor }}>9:41</span>
          <div className={styles.statusIcons}>
            <SignalIcon color={statusColor} />
            <WifiIcon color={statusColor} />
            <BatteryIcon color={statusColor} />
          </div>
        </div>

        {/* Dynamic Inner Screen Screen */}
        <div className={styles.screenContent}>
          {variant === 'welcome' && <WelcomeScreen />}
          {variant === 'dashboard' && <DashboardScreen />}
          {variant === 'customers' && <CustomersScreen />}
        </div>

        {/* Device Home Indicator Pill */}
        <div className={styles.homeIndicator} style={{ background: statusColor }} />
      </div>
    </div>
  );
}

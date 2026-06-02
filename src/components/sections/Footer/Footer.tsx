// ✓ tokens: --color-white, --color-black, --font-family-primary | layout: flex + grid | split: Footer with CTA + links + legal
'use client';

import React from 'react';
import Image from 'next/image';
import styles from './Footer.module.css';
import type { FooterProps } from '@/types';

/* ── LinkedIn SVG ── */
function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.554v-5.57c0-1.328-.025-3.036-1.85-3.036-1.851 0-2.134 1.445-2.134 2.94v5.666H9.357V9h3.413v1.561h.048c.476-.9 1.635-1.85 3.364-1.85 3.6 0 4.267 2.37 4.267 5.454v6.285zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

/* ── X / Twitter SVG ── */
function XIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L2.25 2.25h6.588l4.253 5.622 4.933-5.622h.22zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
    </svg>
  );
}

/* ── Behance SVG ── */
function BehanceIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.938 4.503c.702 0 1.34.06 1.92.188.577.13 1.07.33 1.485.61.41.28.733.65.96 1.12.225.47.34 1.05.34 1.73 0 .74-.17 1.36-.507 1.86-.338.5-.837.9-1.502 1.22.906.26 1.576.72 2.022 1.37.448.66.665 1.45.665 2.36 0 .75-.13 1.39-.41 1.93-.276.54-.67.99-1.16 1.35-.49.35-1.06.61-1.71.78-.64.17-1.32.25-2.03.25H0V4.51h6.938v-.007zM16.94 6.547h5.87v1.44h-5.87V6.55zm.55 8.57c.52 0 .96-.16 1.31-.46.35-.3.52-.78.52-1.43h-3.71c.06.66.26 1.14.62 1.44.36.3.79.46 1.27.46l-.01-.01zm0-7.63c-.45 0-.83.13-1.13.38-.3.25-.48.65-.52 1.21h3.25c-.03-.56-.2-.96-.5-1.21-.3-.25-.67-.38-1.1-.38zm-10.54 3.22c.6 0 1.08-.14 1.44-.44.36-.3.54-.73.54-1.28 0-.57-.18-1-.53-1.29-.35-.29-.84-.43-1.47-.43H2.58v3.44h4.37zm.3 4.96c.68 0 1.21-.16 1.6-.48.38-.32.58-.82.58-1.51 0-.38-.07-.7-.2-.97-.13-.27-.32-.49-.55-.66-.23-.17-.5-.3-.8-.38-.3-.08-.63-.12-.97-.12H2.58v4.12h4.67z" />
    </svg>
  );
}

/* ── YouTube SVG ── */
function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22.54 6.42A2.78 2.78 0 0 0 20.6 4.47C18.88 4 12 4 12 4s-6.88 0-8.6.47A2.78 2.78 0 0 0 1.46 6.42 29.94 29.94 0 0 0 1 12a29.94 29.94 0 0 0 .46 5.58A2.78 2.78 0 0 0 3.4 19.53C5.12 20 12 20 12 20s6.88 0 8.6-.47a2.78 2.78 0 0 0 1.94-1.95A29.94 29.94 0 0 0 23 12a29.94 29.94 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02"/>
    </svg>
  );
}

const SOCIAL_ICON_MAP = {
  linkedin: LinkedInIcon,
  twitter: XIcon,
  behance: BehanceIcon,
  youtube: YouTubeIcon,
};

import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';

export default function Footer({
  heading = 'Ready to work\ntogether?',
  subtext,
  ctaLabel = 'Start a project',
  ctaHref = '#',
  avatarSrc = '/images/Dr. T. Senthil.png',
  avatarAlt = 'Senthil — UX Designer',
  
  column1Heading = 'Latest articles',
  column1Links = [
    { label: 'How founders can validate a SaaS or product idea before building', href: '#' },
    { label: '2025 brought a year of momentum, partnerships and creative growth', href: '#' },
  ],

  column2Heading = 'Have a browse',
  column2Links = [
    { label: 'Work', href: '#' },
    { label: 'Services', href: '#' },
    { label: 'About', href: '#' },
    { label: 'Journal', href: '#' },
    { label: 'Start a project', href: '#' },
    { label: 'Terms and conditions', href: '#', active: true },
    { label: 'Privacy Policy', href: '#' },
  ],

  column3Heading = "Let's talk",
  email = 'senthil@ophthall.in',
  phone = '',
  socialLinks = [
    { platform: 'linkedin', href: 'https://linkedin.com', ariaLabel: 'LinkedIn' },
    { platform: 'twitter', href: 'https://twitter.com', ariaLabel: 'X (Twitter)' },
    { platform: 'behance', href: 'https://behance.net', ariaLabel: 'Behance' },
  ],

  legalText = 'Dr. T. Senthil Tamilaraasan · Ophthalmologist · Healthcare Entrepreneur · Founder, Ophthall · Chennai, India · senthil@ophthall.in · www.ophthall.in',
}: FooterProps) {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: 'top bottom',
        toggleActions: 'play none none none',
      },
    });

    tl.from(container.querySelector('[data-animate="footer-avatar"]'), {
      scale: 0.8,
      opacity: 0,
      duration: 0.6,
      ease: 'back.out(1.7)',
      immediateRender: false,
    })
    .from(container.querySelector('[data-animate="footer-heading"]'), {
      y: 30,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      immediateRender: false,
    }, '-=0.35')
    .from(container.querySelector('[data-animate="footer-cta"]'), {
      y: 20,
      opacity: 0,
      duration: 0.5,
      ease: 'power2.out',
      immediateRender: false,
    }, '-=0.3')
    .from(container.querySelectorAll('[data-animate="footer-col"]'), {
      y: 25,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: 'power2.out',
      immediateRender: false,
    }, '-=0.2')
    .from(container.querySelector('[data-animate="footer-legal"]'), {
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      immediateRender: false,
    }, '-=0.3');
  });

  return (
    <footer ref={ref} className={styles.footer} aria-label="Site footer">
      {/* ── 1. CTA Section ── */}
      <div className={styles.ctaSection}>
        {/* Profile avatar */}
        <div className={styles.ctaAvatar} data-animate="footer-avatar">
          <Image
            src={avatarSrc}
            alt={avatarAlt}
            width={110}
            height={110}
            quality={90}
          />
        </div>

        <h2 className={styles.ctaHeading} data-animate="footer-heading">
          {heading.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              {idx < heading.split('\n').length - 1 && <br />}
            </React.Fragment>
          ))}
        </h2>
        
        {subtext && <p className={styles.ctaSubtext}>{subtext}</p>}

        <a href={ctaHref} className={styles.ctaButton} id="footer-cta-btn" data-animate="footer-cta">
          {ctaLabel}
        </a>
      </div>

      {/* ── 2. Links Section ── */}
      <div className={styles.linksSection}>
        <div className={styles.linksContainer}>
          {/* Col 1 */}
          <div className={styles.articlesCol} data-animate="footer-col">
            <h3 className={styles.colHeading}>{column1Heading}</h3>
            <div className={styles.articleList}>
              {column1Links.map((link, idx) => (
                <React.Fragment key={idx}>
                  <a href={link.href} className={styles.articleItem}>
                    {link.label}
                  </a>
                  {idx < column1Links.length - 1 && <div className={styles.articleDivider} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          {/* Col 2 */}
          <div data-animate="footer-col">
            <h3 className={styles.colHeading}>{column2Heading}</h3>
            <ul className={styles.navList}>
              {column2Links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className={`${styles.navLink} ${link.active ? styles.navLinkActive : ''}`}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3 */}
          <div data-animate="footer-col">
            <h3 className={styles.colHeading}>{column3Heading}</h3>
            {email && (
              <a href={`mailto:${email}`} className={styles.contactEmail}>
                {email}
              </a>
            )}
            {phone && (
              <a href={`tel:${phone.replace(/\s+/g, '')}`} className={`${styles.contactEmail} ${styles.contactPhone}`}>
                {phone}
              </a>
            )}

            {/* Social icons */}
            <div className={styles.socialRow}>
              {socialLinks.map((social, idx) => {
                const IconComponent = SOCIAL_ICON_MAP[social.platform];
                if (!IconComponent) return null;
                return (
                  <a
                    key={idx}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={social.ariaLabel}
                  >
                    <IconComponent />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* ── 3. Legal Bar ── */}
      <div className={styles.legalBar} data-animate="footer-legal">
        <p className={styles.legalText}>
          {legalText}
        </p>
      </div>
    </footer>
  );
}

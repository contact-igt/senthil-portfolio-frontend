'use client';

import React from 'react';
import styles from './Footer.module.css';
import type { FooterProps, FooterSocialLink } from '@/types';

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.554v-5.57c0-1.328-.025-3.036-1.85-3.036-1.851 0-2.134 1.445-2.134 2.94v5.666H9.357V9h3.413v1.561h.048c.476-.9 1.635-1.85 3.364-1.85 3.6 0 4.267 2.37 4.267 5.454v6.285zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function WebsiteIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

const SOCIAL_ICON_MAP: Partial<Record<FooterSocialLink['platform'], React.FC>> = {
  linkedin: LinkedInIcon,
  youtube: YouTubeIcon,
  instagram: InstagramIcon,
  facebook: FacebookIcon,
  // website: WebsiteIcon,
};

function SocialIconRow({ links }: { links?: FooterProps['socialLinks'] }) {
  if (!links?.length) return null;

  return (
    <div className={styles.socialRow}>
      {links.map((social) => {
        const IconComponent = SOCIAL_ICON_MAP[social.platform];
        if (!IconComponent) return null;

        return (
          <a
            key={`${social.platform}-${social.href}`}
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
  );
}

export default function Footer({
  column1Heading = 'Latest articles',
  column1Links = [],
  column2Heading = 'Have a browse',
  column2Links = [],
  column3Heading = "Let's talk",
  email = 'senthil@ophthall.in',
  phone = '',
  socialLinks = [],
  legalText = 'Dr. T. Senthil Tamilaraasan · Ophthalmologist · Healthcare Entrepreneur · Founder, Ophthall · Chennai, India · senthil@ophthall.in · www.ophthall.in',
}: FooterProps) {
  return (
    <footer className={styles.footer} aria-label="Site footer">
      <div className={styles.linksSection}>
        <div className={styles.linksContainer}>
          <div className={styles.articlesCol}>
            <h3 className={styles.colHeading}>{column1Heading}</h3>
            <div className={styles.articleList}>
              {column1Links.map((link, idx) => (
                <React.Fragment key={link.label}>
                  <a href={link.href} className={styles.articleItem}>
                    {link.label}
                  </a>
                  {idx < column1Links.length - 1 && <div className={styles.articleDivider} />}
                </React.Fragment>
              ))}
            </div>
          </div>

          <div>
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

          <div>
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

            <SocialIconRow links={socialLinks} />
          </div>
        </div>
      </div>

      <div className={styles.legalBar}>
        <p className={styles.legalText}>{legalText}</p>
      </div>
    </footer>
  );
}

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { navLinks, navCtaLabel, navCtaHref } from '@/lib/content';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { gsap } from '@/lib/animations';
import styles from './Navbar.module.css';

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Entry animation — slide down on load
    gsap.from(navRef.current, {
      y: -80,
      opacity: 0,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1,
    });

    // Scroll-aware background transition to dark navy blue
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 80) {
        navRef.current.classList.add(styles.scrolled);
      } else {
        navRef.current.classList.remove(styles.scrolled);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav ref={navRef} className={styles.nav} aria-label="Main navigation">
      <Logo />
      
      {/* Desktop Links & CTA */}
      <div className={styles.navRight}>
        <ul className={styles.links} role="list">
          {navLinks.map((link) => (
            <li key={link.label}>
              <a href={link.href} className={styles.link}>
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <Button variant="nav" size="md" href={navCtaHref}>
          {navCtaLabel}
        </Button>
      </div>

      {/* Mobile Hamburger Icon */}
      <button
        className={styles.hamburger}
        onClick={() => setMenuOpen(true)}
        aria-label="Open navigation menu"
      >
        <span className={styles.bar} />
        <span className={styles.bar} />
        <span className={styles.bar} />
      </button>

      {/* Mobile Open Menu Overlay Card */}
      {menuOpen && (
        <div className={styles.menuOverlay} role="dialog" aria-modal="true">
          <div className={styles.menuHeader}>
            <Logo />
            <button
              className={styles.closeButton}
              onClick={() => setMenuOpen(false)}
              aria-label="Close navigation menu"
            >
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          <ul className={styles.mobileLinks} role="list">
            {navLinks.map((link) => (
              <li key={link.label} className={styles.mobileLinkItem}>
                <a
                  href={link.href}
                  className={styles.mobileLink}
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>

          <div className={styles.menuFooter}>
            <a
              href={navCtaHref}
              className={styles.mobileCtaButton}
              onClick={() => setMenuOpen(false)}
            >
              {navCtaLabel}
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

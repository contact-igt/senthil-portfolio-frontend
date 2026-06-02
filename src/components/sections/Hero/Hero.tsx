'use client';
import React, { useEffect, useRef } from 'react';
import type { HeroProps } from '@/types';
import { Navbar } from '@/components/sections/Navbar';
import { Button } from '@/components/ui/Button';
import { TrustBar } from './TrustBar';
import { HeroParticles } from './HeroParticles';
import { heroProps as defaultHeroProps, trustBarProps } from '@/lib/content';
import { gsap } from '@/lib/animations';
import styles from './Hero.module.css';

export function Hero({
  heading1          = defaultHeroProps.heading1,
  heading2Prefix    = defaultHeroProps.heading2Prefix,
  heading2Highlight = defaultHeroProps.heading2Highlight,
  subtext           = defaultHeroProps.subtext,
  ctaLabel          = defaultHeroProps.ctaLabel,
  ctaHref           = defaultHeroProps.ctaHref,
}: HeroProps = {}) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const ctx = gsap.context(() => {
      // Staged entry timeline
      const tl = gsap.timeline({ delay: 0.15 });

      tl.from(`.${styles.headingLine1}`, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      })
      .from(`.${styles.headingLine2}`, {
        y: 30, opacity: 0, duration: 0.7, ease: 'power3.out',
      }, '-=0.45')
      .from(`.${styles.highlightLine}`, {
        y: 24, opacity: 0, scale: 0.96, duration: 0.6, ease: 'power2.out',
      }, '-=0.45')
      .from(`.${styles.subtext}`, {
        y: 20, opacity: 0, duration: 0.6, ease: 'power2.out',
      }, '-=0.35')
      .from(`.${styles.ctaWrap}`, {
        y: 16, opacity: 0, duration: 0.5, ease: 'power2.out',
      }, '-=0.3')
      .from(`.${styles.personImage}`, {
        y: 60, opacity: 0, duration: 0.8, ease: 'power3.out',
      }, '-=0.6');

      // Parallax on image on scroll
      if (imageRef.current) {
        gsap.to(imageRef.current, {
          yPercent: -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top top',
            end: 'bottom top',
            scrub: true,
          },
        });
      }

      // Hero content fades out as user scrolls away
      gsap.to(`.${styles.content}`, {
        opacity: 0,
        y: -30,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: '20% top',
          end: '80% top',
          scrub: true,
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <header ref={sectionRef} className={styles.hero}>
      <HeroParticles />
      <Navbar />

      {/* Person image — absolute positioned left/bottom */}
      {/* <Image
        ref={imageRef}
        src="/images/hero-person.png"
        alt="Dr. Senthil — Ophthalmologist & Healthcare Entrepreneur"
        width={420}
        height={560}
        className={styles.personImage}
        priority={true}
      /> */}

      <div className={styles.content}>
        <h1 className={styles.heading}>
          <span className={styles.headingLine1}>{heading1}</span>
          <br />
          <span className={styles.headingLine2}>{heading2Prefix}</span>
          <span className={styles.highlightLine}>
            {/* Pink highlight = CSS background on <span>, NOT text-decoration */}
            <span className={styles.highlight}>{heading2Highlight}</span>
          </span>
        </h1>

        <p className={styles.subtext}>{subtext}</p>

        <div className={styles.ctaWrap}>
          <Button variant="primary" size="lg" href={ctaHref} className={styles.heroBtn}>
            {ctaLabel}
          </Button>
          {/* Vertical divider line below CTA */}
          <div className={styles.divider} aria-hidden="true" />
        </div>
      </div>

      {/* Credential bar — sub-component of Hero */}
      <TrustBar {...trustBarProps} />
    </header>
  );
}

export default Hero;

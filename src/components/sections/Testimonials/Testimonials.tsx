'use client';

import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Testimonials.module.css';
import { ReviewData } from '@/types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* ── Authentic Multi-Colored Vector Google 'G' Logo SVG ──── */
function GoogleLogo() {
  return (
    <svg
      width="22"
      height="22"
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
  );
}

/* ── Five Gold Stars SVG Renderer ────────────────────────── */
function GoldStars({ rating }: { rating: number }) {
  return (
    <div className={styles.starRow}>
      {Array.from({ length: 5 }).map((_, idx) => (
        <svg
          key={idx}
          width="18"
          height="18"
          viewBox="0 0 24 24"
          fill={idx < rating ? 'var(--color-rating-star)' : 'none'}
          stroke={idx < rating ? 'var(--color-rating-star)' : '#D0D0D0'}
          strokeWidth="1.5"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
        </svg>
      ))}
    </div>
  );
}

/* ── Pre-defined Realistic Google Reviews Data ───────────── */
const DEFAULT_REVIEWS: ReviewData[] = [
  {
    id: 'rev-1',
    name: 'Carlo Cest',
    date: 'February 27, 2026',
    avatarInitials: 'CC',
    avatarColor: '#5D4037', // Deep Brown
    rating: 5,
    text: 'Amazing to work with, highly recommend to anyone wanting a website and a rebrand. Easy to work alongside and very experienced in his field.',
  },
  {
    id: 'rev-2',
    name: 'David Walker',
    date: 'February 26, 2026',
    avatarInitials: 'DW',
    avatarColor: '#1E88E5', // Deep Blue
    rating: 5,
    text: "As a developer, I've really enjoyed collaborating with Rich. We've worked closely across a range of projects, from simple one-page sites to full e-commerce builds. He's approachable, communicates openly, and actively fosters strong collaboration between design and development. That partnership consistently leads to smooth workflows and high-quality results.",
  },
  {
    id: 'rev-3',
    name: 'Raymond',
    date: 'February 25, 2026',
    avatarInitials: 'R',
    avatarColor: '#2E7D32', // Dark Green
    rating: 5,
    text: 'Richard has excellent attention to detail and gets deeply involved in UX design projects. Hiring an independent expert at that time was far more effective for us than going through a typical big agency.',
  },
  {
    id: 'rev-4',
    name: 'David Fortiscue',
    date: 'February 20, 2026',
    avatarInitials: 'DF',
    avatarColor: '#0288D1', // Cyan/Light Blue
    rating: 5,
    text: "I worked with Richard to develop our SaaS platform's brand and UX. He delivered a robust product layout which ensured our users have a flexible, high-converting, and premium experience. It was a pleasure to work with him.",
  },
  {
    id: 'rev-5',
    name: 'Carla Castillo',
    date: 'February 19, 2026',
    avatarInitials: 'CC',
    avatarColor: '#E65100', // Vibrant Orange
    rating: 5,
    text: "Highly recommend working with Richard. He completely redesigned our startup's landing page and customer portal, creating a beautiful design that increased signups by 40% in the first month.",
  },
  {
    id: 'rev-6',
    name: 'Jack Major',
    date: 'February 19, 2026',
    avatarInitials: 'JM',
    avatarColor: '#00695C', // Teal
    rating: 5,
    text: 'It was great to work with Richard on our new app. He has an incredible eye for clean, modern interfaces and has really helped us define our digital design language.',
  },
];

export function Testimonials() {
  const ref = useScrollAnimation<HTMLElement>((container) => {
    // Header reveal
    gsap.from(container.querySelectorAll('[data-animate="test-header"]'), {
      y: 35,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('[data-animate="test-header"]'),
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    });

    // Testimonial sliders entrance
    gsap.from(container.querySelectorAll('[data-animate="test-card-row"]'), {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: container.querySelector('.' + styles.carouselWrapper),
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    });
  });

  // Split reviews and duplicate to ensure gap-free infinite scrolling
  const row1Reviews = [...DEFAULT_REVIEWS.slice(0, 3), ...DEFAULT_REVIEWS.slice(0, 3)];
  const row2Reviews = [...DEFAULT_REVIEWS.slice(3, 6), ...DEFAULT_REVIEWS.slice(3, 6)];

  // Marquee setting constants
  const baseSettings = {
    dots: false,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    speed: 7500, // Slow continuous drift speed
    cssEase: 'linear',
    arrows: false,
    pauseOnHover: true,
    draggable: false,
    swipe: false,
    touchMove: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          speed: 6500,
        },
      },
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 1,
          speed: 5500,
        },
      },
    ],
  };

  const row1Settings = {
    ...baseSettings,
    rtl: true, // Left-to-Right drift in react-slick
  };

  const row2Settings = {
    ...baseSettings,
    rtl: false, // Right-to-Left drift in react-slick
  };

  const renderReviewCard = (review: ReviewData, uniqueId: string) => (
    <div key={uniqueId} className={styles.cardContainer}>
      <div className={styles.card}>
        {/* Top Row: User Avatar details and G Logo */}
        <div className={styles.cardHeader}>
          <div className={styles.userInfo}>
            <div
              className={styles.avatar}
              style={{ backgroundColor: review.avatarColor }}
            >
              {review.avatarInitials}
            </div>
            <div>
              <h3 className={styles.userName}>{review.name}</h3>
              <p className={styles.userDate}>{review.date}</p>
            </div>
          </div>
          <div className={styles.gLogo}>
            <GoogleLogo />
          </div>
        </div>

        {/* Rating Stars inside card */}
        <div className={styles.cardStars}>
          <GoldStars rating={review.rating} />
        </div>

        {/* Review Quote text */}
        <p className={styles.reviewText}>{review.text}</p>
      </div>
    </div>
  );

  return (
    <section ref={ref} className={styles.section} aria-label="Customer Reviews">
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          
          {/* Centered Heading */}
          <h2 className={styles.heading} data-animate="test-header">
            Trusted by Ophthalmologists & Eye Care Leaders
          </h2>

          {/* Centered Google Summary Rating Row */}
          <div className={styles.ratingRow} data-animate="test-header">
            <span className={styles.ratingBold}>5.0</span>
            <GoldStars rating={5} />
            <span className={styles.ratingText}>Rated by clients on Google</span>
            <div className={styles.logoWrap}>
              <GoogleLogo />
            </div>
          </div>

          {/* Dual-Row Testimonials Marquee */}
          <div className={styles.carouselWrapper}>
            
            {/* Row 1: Left to Right scrolling */}
            <div className={styles.rowWrapper} data-animate="test-card-row">
              <Slider {...row1Settings}>
                {row1Reviews.map((review, idx) =>
                  renderReviewCard(review, `${review.id}-row1-${idx}`)
                )}
              </Slider>
            </div>

            {/* Row 2: Right to Left scrolling */}
            <div className={styles.rowWrapper} data-animate="test-card-row">
              <Slider {...row2Settings}>
                {row2Reviews.map((review, idx) =>
                  renderReviewCard(review, `${review.id}-row2-${idx}`)
                )}
              </Slider>
            </div>

            {/* Visual dissolving fade-out masks */}
            <div className={styles.maskLeft} aria-hidden="true" />
            <div className={styles.maskRight} aria-hidden="true" />

          </div>

        </div>
      </div>
    </section>
  );
}

export default Testimonials;

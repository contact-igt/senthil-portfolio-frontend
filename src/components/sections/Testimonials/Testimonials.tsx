'use client';

import React from 'react';
import Slider from 'react-slick';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';
import { gsap } from '@/lib/animations';
import styles from './Testimonials.module.css';
import { ReviewData } from '@/types';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

/* LinkedIn source icon */
function LinkedInLogo() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V8.99h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.03H3.53V8.99H7.1v11.46zM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

/* LinkedIn endorsement source label */
const ENDORSEMENT_LABEL = 'LinkedIn endorsement';

/* Pre-defined LinkedIn endorsement data */
const DEFAULT_REVIEWS: ReviewData[] = [
  {
    id: 'rev-1',
    name: 'Elankumaran Pasupathi',
    date: 'July 15, 2018',
    avatarInitials: 'EP',
    avatarColor: '#5D4037',
    rating: 5,
    text: 'A good ophthalmologist, very good entrepreneur and an excellent human being',
  },
  {
    id: 'rev-2',
    name: 'Nabil Barsom',
    date: 'December 5, 2014',
    avatarInitials: 'NB',
    avatarColor: '#1E88E5',
    rating: 5,
    text: 'Hi Dr.Tamilarasan, I wrote this recommendation of your work that you can include on your profile. Thanks, also i need you to help me to learn phaco and lasik',
  },
  {
    id: 'rev-3',
    name: 'Nagarajan Vadivel',
    date: 'September 15, 2008',
    avatarInitials: 'NV',
    avatarColor: '#2E7D32',
    rating: 5,
    text: 'Dr.Tamilarasan is a highly competent professional with service orientation',
  },
  {
    id: 'rev-4',
    name: 'Sathish Isaac',
    date: 'June 17, 2008',
    avatarInitials: 'SI',
    avatarColor: '#0288D1',
    rating: 5,
    text: 'Dr.Tamilarasan Senthil is a very talented multi skillful Doctor with immense marketing skill. He was in charge of medical tourism promotion for one of my client and he was diligent and was responsible in bringing worlds TOP NGO in eye care to India. Isaac http://www.jasfy.com',
  },
  {
    id: 'rev-5',
    name: 'Alyssa Wostrel',
    date: 'June 16, 2008',
    avatarInitials: 'AW',
    avatarColor: '#E65100',
    rating: 5,
    text: 'Dr. Tamilarasan is an excellent teacher and mentor to the Unite for Sight medical volunteers at Uma Eye Clinic in Chennai, India, and at the mobile eye camps in the surrounding areas and villages. I enjoyed working with him at the eye camps because I earned a great deal about the healthcare delivery system in India.',
  },
  {
    id: 'rev-6',
    name: 'Anurag Shrivastava, MD',
    date: 'June 13, 2008',
    avatarInitials: 'AS',
    avatarColor: '#00695C',
    rating: 5,
    text: 'Dr. Tamilarasan is an excellent surgeon/physician, whose humanitarian efforts along with strong teaching skills, makes him a true asset to the field of ophthalmology. He is a trusted resource, and a wonderful international contact in the field. I look forward to working with Dr. Tamilarasan for many years to come.',
  },
  {
    id: 'rev-7',
    name: 'Kathirvel Natarajan',
    date: 'June 13, 2008',
    avatarInitials: 'KN',
    avatarColor: '#6A1B9A',
    rating: 5,
    text: 'Dr Senthil comes up with lot of innovative ideas for healthcare marketing and practice promotion. We worked together on a Medical Tourism project and put up a great show in Singapore. He is very insightful about the various developments that takes place in Healthcare delivery market.',
  },
  {
    id: 'rev-8',
    name: 'Vivek Shukla',
    date: 'June 10, 2008',
    avatarInitials: 'VS',
    avatarColor: '#455A64',
    rating: 5,
    text: 'Dr Senthil, thinks unlike many other doctors I have met. He is objective and visionary in his thinking. Besides, he is a keen observer and a quick learner. I know he will go a long way ahead in his career.',
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
  const row1Reviews = [...DEFAULT_REVIEWS.slice(0, 4), ...DEFAULT_REVIEWS.slice(0, 4)];
  const row2Reviews = [...DEFAULT_REVIEWS.slice(4, 8), ...DEFAULT_REVIEWS.slice(4, 8)];

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
        {/* Top Row: User avatar details and LinkedIn source */}
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
            <LinkedInLogo />
          </div>
        </div>

        {/* Source label inside card */}
        <div className={styles.cardStars}>
          <span>{ENDORSEMENT_LABEL}</span>
        </div>

        {/* Review Quote text */}
        <p className={styles.reviewText}>{review.text}</p>
      </div>
    </div>
  );

  return (
    <section ref={ref} className={styles.section} aria-label="LinkedIn endorsements">
      <div className={styles.curvedPanel}>
        <div className={styles.container}>
          
          {/* Centered Heading */}
          <h2 className={styles.heading} data-animate="test-header">
             Endorsements from Healthcare Leaders
          </h2>

          {/* Centered LinkedIn source row */}
          <div className={styles.ratingRow} data-animate="test-header">
            {/* <span className={styles.ratingBold}>8</span> */}
            <span className={styles.ratingText}>professional recommendations from LinkedIn</span>
            <div className={styles.logoWrap}>
              <LinkedInLogo />
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

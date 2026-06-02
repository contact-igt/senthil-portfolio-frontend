// ✓ tokens: none | layout: none | split: single source of truth for all user-facing content strings
// Edit this file to update all copy across the site — no component changes needed.

import type { NavLink, HeroProps, TrustBarProps, PainPointsProps } from '@/types';

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */

export const navLinks: NavLink[] = [
  { label: 'About',        href: '#about' },
  { label: 'Ventures',     href: '#ventures' },
  { label: 'Impact',       href: '#impact' },
  { label: 'Partnerships', href: '#partnerships' },
  { label: 'Resources',    href: '#resources' },
];

export const navCtaLabel = 'Book a Session';
export const navCtaHref  = 'mailto:senthil@ophthall.in';

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */

export const heroProps: HeroProps = {
  heading1:          'Ophthalmologist.',
  heading2Prefix:    'Healthcare ',
  heading2Highlight: 'Entrepreneur.',
  subtext:
    "Founder of Ophthall — India's only practice development platform for eye hospitals. " +
    'Helping ophthalmologists scale their practice, improve patient outcomes, ' +
    'and build sustainable, profitable healthcare businesses.',
  ctaLabel: 'Book a Speaking Session',
  ctaHref:  'mailto:senthil@ophthall.in',
};

/* ─────────────────────────────────────────────────────────────
   TRUST / CREDENTIAL BAR  (repurposed from Trustpilot → credentials)
───────────────────────────────────────────────────────────── */

export const trustBarProps: TrustBarProps = {
  ratingNumber: '20+',
  ratingLabel:  'Years in Healthcare',
  starCount:    4,           // maps to 4 national awards
  sourceLabel:  'Stanford · Yale · Duke · CII Awarded',
};

/* ─────────────────────────────────────────────────────────────
   BIOGRAPHY (Formerly Pain Points)
───────────────────────────────────────────────────────────── */

export const biographyProps = {
  heading1: 'Ophthalmologist turned',
  heading2: 'Healthcare Business Strategist.',

  frequentChallenges: [
    {
      variant:     'blue' as const,
      quote:       '"Transforming the business and growth models of eye hospitals."',
      headline:    'Clinical Practice to Healthcare Entrepreneurship',
      description:
        'Dr. T. Senthil Tamilaraasan transitioned from clinical practice to large-scale healthcare entrepreneurship. ' +
        'He is widely recognized for transforming the business and growth models of eye hospitals across India.',
    },
    {
      variant:     'blue' as const,
      quote:       '"Building sustainable, profitable healthcare businesses."',
      headline:    'India\'s First Practice Development Platform',
      description:
        'As the Founder of Ophthall, he helps eye care professionals scale their practices by improving ' +
        'patient experience, increasing surgical conversions, strengthening optical sales, and building sustainable, profitable systems.',
    },
  ],

  commonPainPoints: [
    {
      variant:     'pink' as const,
      quote:       '"Moving from clinical excellence to business success."',
      headline:    'Mentorship & Practice Growth',
      description:
        'A sought-after mentor guiding Ophthalmologists, Optometrists, and Healthcare entrepreneurs ' +
        'on practice growth, patient counselling, optical business expansion, and both digital and offline patient acquisition.',
    },
    {
      variant:     'pink' as const,
      quote:       '"Connecting 260+ centers for Diabetic Retinopathy Screening."',
      headline:    'International Speaker & Tele-Ophthalmology',
      description:
        'An internationally recognized speaker at Yale and Duke, and a pioneer in Tele-Ophthalmology—' +
        'having connected 260+ centers for Diabetic Retinopathy Screening, laying the foundation for scalable healthcare systems.',
    },
  ],
};

export const biographyCta = {
  subheading: 'Ready to scale your practice?',
  ctaLabel:   'Book a Session',
  ctaHref:    'mailto:senthil@ophthall.in',
};

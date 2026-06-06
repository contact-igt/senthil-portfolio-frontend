// ✓ tokens: none | layout: none | split: all shared interfaces & prop types

import type { ReactNode } from 'react';

/* ── UI Primitives ──────────────────────────────────────── */

export interface ButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'nav';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  href?: string;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

export interface BadgeProps {
  children: ReactNode;
  variant: 'blue' | 'pink';
  className?: string;
}

export interface CardProps {
  children: ReactNode;
  variant: 'blue' | 'pink';
  className?: string;
}

export interface LogoProps {
  className?: string;
}

/* ── Navigation ─────────────────────────────────────────── */

export interface NavLink {
  label: string;
  href: string;
}

export interface NavbarProps {
  links?: NavLink[];
}

/* ── Hero Section ───────────────────────────────────────── */

export interface HeroProps {
  heading1?: string;
  heading2Prefix?: string;
  heading2Highlight?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
}

export interface TrustBarProps {
  /** Legacy Trustpilot fields — kept for compat */
  label?: string;
  rating?: string;
  ratingSource?: string;
  /** Credential bar fields for Dr. Senthil */
  ratingNumber?: string;   // e.g. "20+"
  ratingLabel?: string;    // e.g. "Years in Healthcare"
  starCount?: number;      // number of filled stars (max 5)
  sourceLabel?: string;    // e.g. "Stanford · Yale · Duke · CII Awarded"
}

/* ── Pain Points Section ────────────────────────────────── */

export interface ChallengeCardData {
  id: string;
  quote: string;
  description: string;
}

export interface PainPointCardData {
  id: string;
  headline: string;
  description: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

/* ── Partner Section ──────────────────────────────────────── */

export interface ServiceBlock {
  title: string;
  description: string;
}

export interface PartnerProps {
  heading?: string;
  subtitle?: string;
  services?: ServiceBlock[];
}

/* ── Mission Section ──────────────────────────────────────── */

export interface MissionProps {
  line1?: string;
  line2?: string;
  line3?: string;
  subtext?: string;
}

export interface PainPointsProps {
  heading1?: string;
  heading2?: string;
  frequentChallenges?: ChallengeCardProps[];
  commonPainPoints?: ChallengeCardProps[];
}

export interface ChallengeCardProps {
  variant: 'blue' | 'pink';
  quote?: string;
  headline?: string;
  description: string;
  avatarSrc?: string;
  avatarAlt?: string;
}

export interface DecorativeArrowProps {
  className?: string;
}

/* ── Partner Section ────────────────────────────────────── */

export interface ServiceBlock {
  title: string;
  description: string;
}

export interface PartnerProps {
  heading?: string;
  services?: ServiceBlock[];
}

/* ── Case Studies Section ───────────────────────────────── */

export interface CaseStudiesProps {
  className?: string;
}

/* ── Mission Section ───────────────────────────────────── */

export interface MissionProps {
  className?: string;
}

/* ── Floating Chat Component ───────────────────────────── */

export interface FloatingChatProps {
  className?: string;
}

/* ── Testimonials Section ────────────────────────────────── */

export interface ReviewData {
  id: string;
  name: string;
  date: string;
  avatarInitials: string;
  avatarColor: string;
  rating: number;
  text: string;
}

export interface TestimonialsProps {
  heading?: string;
  reviews?: ReviewData[];
}

/* ── Core Values Section ──────────────────────────────────── */

export interface CoreValueData {
  id: string | number;
  title: string;
  description: string;
  icon: 'person' | 'lightbulb' | 'lightning' | 'checkmark';
}

export interface CoreValuesProps {
  heading?: string;
  subtext?: string;
  values?: CoreValueData[];
}

/* ── Recent Case Studies Section ────────────────────────── */

export interface CaseStudyData {
  id: string;
  client: string;
  headline: string;
  mockupVariant: 'grj' | 'twolist' | 'award3' | 'award4';
  tags?: string[];
}

export interface RecentCaseStudiesProps {
  className?: string;
  heading?: string;
  subheading?: string;
  cases?: CaseStudyData[];
}

/* ── Pathway Section ──────────────────────────────────── */

export interface PathwayStep {
  id: string;
  stepNumber: number;
  title: string;
  description: string;
  bullets: string[];
  whyNeeded: string[];
  graphicVariant: 'discovery' | 'ux' | 'brand' | 'direction' | 'delivery';
}

export interface PathwayProps {
  heading?: string;
  subheading?: string;
  steps?: PathwayStep[];
}

/* ── Partnerships Section ──────────────────────────────── */

export interface PartnershipItem {
  id: string;
  date: string;
  title: string;
  tags: string[];
  graphicVariant: 'interview' | 'sofa' | 'zoom' | 'skills' | 'laurence' | 'freelance' | 'ai' | 'figma' | 'content';
  imageSrc?: string;
  imageAlt?: string;
}

export interface PartnershipsProps {
  className?: string;
  heading?: string;
  items?: PartnershipItem[];
}

/* ── Footer Section ──────────────────────────────────────── */

export interface FooterLink {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterSocialLink {
  platform: 'linkedin' | 'youtube' | 'twitter' | 'behance';
  href: string;
  ariaLabel: string;
}

export interface FooterProps {
  heading?: string;
  subtext?: string;
  ctaLabel?: string;
  ctaHref?: string;
  avatarSrc?: string;
  avatarAlt?: string;

  column1Heading?: string;
  column1Links?: FooterLink[];

  column2Heading?: string;
  column2Links?: FooterLink[];

  column3Heading?: string;
  email?: string;
  phone?: string;
  socialLinks?: FooterSocialLink[];

  legalText?: string;
}


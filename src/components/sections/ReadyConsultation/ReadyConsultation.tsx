import Image from 'next/image';
import styles from './ReadyConsultation.module.css';

interface SocialLink {
  platform: 'instagram' | 'youtube' | 'linkedin' | 'facebook';
  href: string;
  ariaLabel: string;
}

interface ReadyConsultationProps {
  ctaHref?: string;
  socialLinks?: SocialLink[];
}

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98C23.986 15.668 24 15.259 24 12c0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z" />
    </svg>
  );
}

function YouTubeIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
      <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.6 12 3.6 12 3.6s-7.5 0-9.4.5A3 3 0 0 0 .5 6.2 31.7 31.7 0 0 0 0 12a31.7 31.7 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.5 9.4.5 9.4.5s7.5 0 9.4-.5a3 3 0 0 0 2.1-2.1A31.7 31.7 0 0 0 24 12a31.7 31.7 0 0 0-.5-5.8zM9.6 15.6V8.4L15.8 12l-6.2 3.6z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
      <path d="M20.45 20.45h-3.554v-5.57c0-1.328-.025-3.036-1.85-3.036-1.851 0-2.134 1.445-2.134 2.94v5.666H9.357V9h3.413v1.561h.048c.476-.9 1.635-1.85 3.364-1.85 3.6 0 4.267 2.37 4.267 5.454v6.285zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="22" height="22">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

const ICON_MAP: Record<SocialLink['platform'], React.FC> = {
  instagram: InstagramIcon,
  youtube: YouTubeIcon,
  linkedin: LinkedInIcon,
  facebook: FacebookIcon,
};

export function ReadyConsultation({
  ctaHref = '#contact',
  socialLinks = [],
}: ReadyConsultationProps) {
  return (
    <section className={styles.wrapper} aria-label="Consultation call to action">
      <div className={styles.ctaSection}>
        <div className={styles.ctaAvatar}>
          <Image
            src="/images/senthilsir5.JPG"
            alt="Dr. T. Senthil Tamilaraasan"
            width={110}
            height={110}
            quality={90}
          />
        </div>

        <h2 className={styles.ctaHeading}>
          Ready to Transform Your Practice?
        </h2>

        <p className={styles.ctaSubtext}>
          Whether you are an ophthalmologist looking to scale, a hospital seeking strategy, or an organiser planning an event — let&apos;s connect.
        </p>

        {socialLinks.length > 0 && (
          <>
            <p className={styles.socialLabel}>
              Follow Dr. Senthil on Instagram, YouTube, LinkedIn &amp; more
            </p>
            <div className={styles.socialRow}>
              {socialLinks.map((link) => {
                const Icon = ICON_MAP[link.platform];
                if (!Icon) return null;
                return (
                  <a
                    key={link.platform}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.socialIcon}
                    aria-label={link.ariaLabel}
                  >
                    <Icon />
                  </a>
                );
              })}
            </div>
          </>
        )}

        <a href={ctaHref} className={styles.ctaButton}>
          Book a Session
        </a>
      </div>
    </section>
  );
}

export default ReadyConsultation;

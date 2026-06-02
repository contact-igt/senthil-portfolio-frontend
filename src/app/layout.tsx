// ✓ tokens: --font-family-primary via Manrope next/font/google | layout: root layout | split: font setup + metadata

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Footer from '@/components/sections/Footer';
import { ScrollRefresh } from '@/components/ui/ScrollRefresh';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  fallback: ['DM Sans', 'Inter', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Dr. Senthil Tamilarasan — Ophthalmologist & Healthcare Entrepreneur',
  description:
    'Dr. T. Senthil Tamilaraasan — Founder of Ophthall, Healthcare Business Strategist, and Speaker. Helping eye hospitals scale sustainably through practice development, mentoring, and innovation.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body>
        <ScrollRefresh />
        {children}
        <Footer
          heading="Ready to Transform Your Practice?"
          subtext="Whether you are an ophthalmologist looking to scale, a hospital seeking strategy, or an organiser planning an event — let's connect."
          ctaLabel="Book a Session"
          ctaHref="mailto:senthil@ophthall.in"
          avatarSrc="/images/senthilsir5.JPG"
          avatarAlt="Dr. T. Senthil Tamilaraasan"
          
          column1Heading="Latest Talks"
          column1Links={[
            { label: 'YouTube — Dr. Senthil Speaks', href: 'https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q' },
            { label: 'LinkedIn Articles', href: 'https://www.linkedin.com/pulse/thinking-out-box-medicine-dr-tamilarasan-senthil' },
          ]}
          
          column2Heading="Explore"
          column2Links={[
            { label: 'About',              href: '#about' },
            { label: 'Ventures',           href: '#ventures' },
            { label: 'Impact',             href: '#impact' },
            { label: 'Partnerships',       href: '#partnerships' },
            { label: 'Resources',          href: '#resources' },
            { label: 'Book a Session',     href: 'mailto:senthil@ophthall.in' },
            { label: 'Ophthall Website',   href: 'https://www.ophthall.co.in' },
            { label: 'Ophthall Community', href: 'https://www.ophthall.in' },
          ]}
          
          column3Heading="Let's Talk"
          email="senthil@ophthall.in"
          phone=""
          socialLinks={[
            { platform: 'linkedin', href: 'https://www.linkedin.com/in/dr-tamilarasan-senthil-b4b7b32/', ariaLabel: 'LinkedIn' },
            { platform: 'youtube',  href: 'https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q',   ariaLabel: 'YouTube' },
          ]}
          
          legalText="Dr. T. Senthil Tamilaraasan · Ophthalmologist · Healthcare Entrepreneur · Founder, Ophthall · Chennai, India · senthil@ophthall.in · www.ophthall.in"
        />
      </body>
    </html>
  );
}

import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import Footer from '@/components/sections/Footer';
import { BookConsultation } from '@/components/sections/BookConsultation';
import { ReadyConsultation } from '@/components/sections/ReadyConsultation';
import { ScrollRefresh } from '@/components/ui/ScrollRefresh';
import { navLinks, navCtaHref } from '@/lib/content';

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-manrope',
  fallback: ['DM Sans', 'Inter', 'sans-serif'],
});

export const metadata: Metadata = {
  title: 'Dr. Senthil Tamilarasan - Ophthalmologist & Healthcare Entrepreneur',
  description:
    'Dr. T. Senthil Tamilaraasan - Founder of Ophthall, Healthcare Business Strategist, and Speaker. Helping eye hospitals scale sustainably through practice development, mentoring, and innovation.',
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
        <ReadyConsultation
          ctaHref={navCtaHref}
          socialLinks={[
            { platform: 'instagram', href: 'https://www.instagram.com/senthilophthall/', ariaLabel: 'Instagram - @senthilophthall' },
            { platform: 'youtube', href: 'https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q', ariaLabel: 'YouTube - Dr. Senthil Speaks' },
            { platform: 'linkedin', href: 'https://www.linkedin.com/in/dr-tamilarasan-senthil-b4b7b32/', ariaLabel: 'LinkedIn' },
            { platform: 'facebook', href: 'https://www.facebook.com/ophthall', ariaLabel: 'Facebook - Ophthall' },
          ]}
        />
        <BookConsultation />
        <Footer
          column1Heading="Latest Talks"
          column1Links={[
            { label: 'YouTube - Dr. Senthil Speaks', href: 'https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q' },
            { label: 'LinkedIn Articles', href: 'https://www.linkedin.com/pulse/thinking-out-box-medicine-dr-tamilarasan-senthil' },
          ]}
          column2Heading="Explore"
          column2Links={[
            ...navLinks,
            { label: 'Book a Session', href: navCtaHref },
            { label: 'Ophthall Website', href: 'https://www.ophthall.co.in' },
            { label: 'Ophthall Community', href: 'https://www.ophthall.in' },
          ]}
          column3Heading="Let's Talk"
          email="senthil@ophthall.in"
          phone=""
          socialLinks={[
            { platform: 'instagram', href: 'https://www.instagram.com/senthilophthall/', ariaLabel: 'Instagram - @senthilophthall' },
            { platform: 'youtube', href: 'https://www.youtube.com/channel/UCi6QnPo-NBCNrUasqnlx__Q', ariaLabel: 'YouTube - Dr. Senthil Speaks' },
            { platform: 'linkedin', href: 'https://www.linkedin.com/in/dr-tamilarasan-senthil-b4b7b32/', ariaLabel: 'LinkedIn' },
            { platform: 'facebook', href: 'https://www.facebook.com/ophthall', ariaLabel: 'Facebook - Ophthall' },
            { platform: 'website', href: 'https://www.ophthall.co.in', ariaLabel: 'Ophthall Website' },
          ]}
          legalText="Dr. T. Senthil Tamilaraasan - Ophthalmologist - Healthcare Entrepreneur - Founder, Ophthall - Chennai, India - senthil@ophthall.in - www.ophthall.in"
        />
      </body>
    </html>
  );
}

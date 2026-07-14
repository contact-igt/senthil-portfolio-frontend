'use client';

import { usePathname } from 'next/navigation';
import { ReadyConsultation } from '@/components/sections/ReadyConsultation';
import { BookConsultation } from '@/components/sections/BookConsultation';
import { navCtaHref } from '@/lib/content';

export function ConditionalSections() {
  const pathname = usePathname();

  // Hide consultation sections on the book landing page
  if (pathname === '/book') {
    return null;
  }

  return (
    <>
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
    </>
  );
}

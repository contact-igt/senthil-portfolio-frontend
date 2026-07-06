export interface ThankYouPopupContent {
  eyebrow?: string;
  title: string;
  message: string;
  contactLabel?: string;
  contactHref?: string;
  followLabel?: string;
}

export const THANK_YOU_CONTENT = {
  consultation: {
    eyebrow: 'Request Received',
    title: 'Thank you.',
    message: 'Your practice growth consultation request has been received. Our team will get back to you shortly.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
  speaking: {
    eyebrow: 'Speaking Request Received',
    title: 'Thank you.',
    message: 'Your speaking slot request has been received. We will review the details and contact you shortly.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
  prebook: {
    eyebrow: 'Pre-Booking Interest Received',
    title: 'Thank you.',
    message: 'Your interest in Psychology of Medical Practice has been received. We will share launch updates and pre-booking information with you soon.',
    contactLabel: 'senthil@ophthall.in',
    contactHref: 'mailto:senthil@ophthall.in',
    followLabel: 'Follow Dr. Senthil',
  },
} satisfies Record<string, ThankYouPopupContent>;

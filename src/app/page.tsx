// ✓ tokens: none | layout: composition only | split: page.tsx has NO logic or styles — composition only

import dynamic from 'next/dynamic';
import { Hero } from '@/components/sections/Hero';
import { FloatingChat } from '@/components/ui/FloatingChat';

/* ── Dynamic imports (below fold) ─────────────────────────── */
const PainPoints = dynamic(
  () => import('@/components/sections/PainPoints'),
  {
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true,
  }
);

const Partner = dynamic(
  () => import('@/components/sections/Partner'),
  {
    loading: () => <SectionSkeleton height="650px" />,
    ssr: true,
  }
);

const CaseStudies = dynamic(
  () => import('@/components/sections/CaseStudies'),
  {
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true,
  }
);

const PARTNERSHIP_IMAGES = [
  '/images/img1.jpeg',
  '/images/img2.jpeg',
  '/images/img3.jpeg',
  '/images/img4.jpeg',
  '/images/img5.jpeg',
  '/images/img6.jpeg',
  '/images/img7.jpeg',
] as const;

const Partnerships = dynamic(
  () => import('@/components/sections/Partnerships'),
  {
    loading: () => <SectionSkeleton height="600px" />,
    ssr: true,
  }
);

const Pathway = dynamic(
  () => import('@/components/sections/Pathway'),
  {
    loading: () => <SectionSkeleton height="800px" />,
    ssr: true,
  }
);

const Blog = dynamic(
  () => import('@/components/sections/Blog'),
  {
    loading: () => <SectionSkeleton height="720px" />,
    ssr: true,
  }
);

const CoreValues = dynamic(
  () => import('@/components/sections/CoreValues'),
  {
    loading: () => <SectionSkeleton height="550px" />,
    ssr: true,
  }
);

const Consulting = dynamic(
  () => import('@/components/sections/Consulting'),
  {
    loading: () => <SectionSkeleton height="720px" />,
    ssr: true,
  }
);

const Awards = dynamic(
  () => import('@/components/sections/Awards'),
  {
    loading: () => <SectionSkeleton height="620px" />,
    ssr: true,
  }
);

const Mission = dynamic(
  () => import('@/components/sections/Mission'),
  {
    loading: () => <SectionSkeleton height="450px" />,
    ssr: true,
  }
);

const Testimonials = dynamic(
  () => import('@/components/sections/Testimonials'),
  {
    loading: () => <SectionSkeleton height="500px" />,
    ssr: true,
  }
);

/* ── Lightweight skeleton for loading state ───────────────── */
function SectionSkeleton({ height }: { height: string }) {
  return (
    <div
      style={{
        width: '100%',
        height,
        background: 'var(--color-section-bg)',
      }}
      aria-hidden="true"
    />
  );
}

export default function Home() {
  return (
    <main>
      {/* Above fold — static imports (critical path) */}
      <Hero
        heading1="Ophthalmologist. Entrepreneur."
        heading2Prefix="Transforming Eye Care"
        heading2Highlight="Globally"
        subtext="Dr. Senthil Tamilarasan — Founder of Ophthall, Healthcare Business Strategist, and Speaker. Helping eye hospitals scale sustainably through practice development, mentoring, and innovation."
        ctaLabel="Book a Session"
        ctaHref="#contact"
      />

      {/* Below fold — dynamic import */}
      <PainPoints />
      <Partner
        heading="Clinical Credentials & Healthcare Leadership"
        subtitle="A career built at the intersection of clinical ophthalmology, healthcare entrepreneurship, and practice development — with recognised memberships and active leadership across India."
        services={[
          {
            title: 'Educational Qualifications',
            description:
              'MBBS — Sri Ramachandra University, Chennai (2000). DO (Diploma in Ophthalmology) — Sri Ramachandra University, Chennai (2003). Trained at Sri Ramachandra Medical College & Research Institute — a Harvard Medical International affiliated institution.',
          },
          {
            title: 'Professional Memberships',
            description:
              'Member — Tamilnadu Medical Council. Member — All India Ophthalmological Society (AIOS). Member — Tamilnadu Ophthalmology Association. Recognised across state and national ophthalmology bodies in India and Abroad.',
          },
          {
            title: 'Current Positions & Roles',
            description:
              'Founder — Ophthall Practice Development & Ophthall Academy of Vision Sciences. Director — Pranav Healthcare Services Pvt Ltd & Welcare Health System Pvt Ltd. Vice President — Telemedicine Society of India, Tamil Nadu Chapter. Organising Chairman — Ophthall Conferences. Managing Trustee — Pranav Foundation.',
          },
        ]}
      />
      {/* <CaseStudies /> */}
      <Mission
        line1="From Clinic to Boardroom."
        line2="From One Patient to"
        line3="2 Million+ Lives Impacted."
        subtext="Dr. Senthil made the rare transition from Ophthalmologist to Healthcare Business Strategist — building scalable systems that help eye hospitals across India grow ethically, sustainably, and profitably."
      />
      <Testimonials />
      <Awards
        heading="Awards & Honours"
        subheading="Recognised across India and internationally for contributions to Ophthalmology, healthcare entrepreneurship, and humanitarian eye care."
        awards={[
          {
            id: 'award-2007',
            year: '2007',
            issuer: 'Stanford University',
            title: 'Unite For Sight Volunteer of the Year Award - International Healthcare Convention, USA',
            tags: ['Humanitarian', 'Global Recognition'],
          },
          {
            id: 'award-2014',
            year: '2014-2015',
            issuer: 'Governor of Tamil Nadu',
            title: 'Gold Medal for Excellence in Ophthalmology - State Government Recognition',
            tags: ['Clinical Excellence', 'State Award'],
          },
          {
            id: 'award-2016',
            year: '2016',
            issuer: 'CII India',
            title: 'Healthcare Entrepreneur of the Year - Confederation of Indian Industry',
            tags: ['Entrepreneurship', 'CII'],
          },
          {
            id: 'award-2017',
            year: '2017',
            issuer: 'Smart CEO Magazine',
            title: 'Start-up of the Year Award - India Start-up Ecosystem',
            tags: ['Start-up', 'Innovation'],
          },
        ]}
      />
      <CoreValues
        heading="Impact & Key Metrics"
        subtext="Numbers that reflect 2 decades of work at the intersection of clinical care, technology, and healthcare entrepreneurship."
        values={[
          {
            id: 1,
            title: '6000+ Ophthalmologists Impacted',
            metric: { end: 6000, suffix: '+', after: ' Ophthalmologists Impacted' },
            description:
              'Ophthall Practice Development — Through conferences, workshops, consulting engagements, masterclasses, webinars, and community initiatives focused on practice growth, leadership, patient experience, and business excellence.',
            icon: 'person',
          },
          {
            id: 2,
            title: '10,000,000+ Rupees Saved for Ophthalmologists',
            metric: { end: 10000000, suffix: '+', separator: ',', after: ' Rupees Saved for Ophthalmologists' },
            description:
              'Ophthall Buying Group — By leveraging collective purchasing power, the Ophthall Buying Group has enabled eye care professionals and hospitals to access better pricing, improved vendor negotiations, and significant cost savings across equipment, consumables, and practice-related investments.',
            icon: 'lightning',
          },
          {
            id: 3,
            title: '20+ Lakh Patients Impacted',
            metric: { end: 20, suffix: '+ Lakh', after: ' Patients Impacted' },
            description:
              'Welcare Vision Screenings — Through vision screening initiatives, awareness programs, and community outreach efforts that have expanded access to eye care and early detection of vision-related problems.',
            icon: 'checkmark',
          },
          {
            id: 4,
            title: 'Thousands of Eye Care Professionals Trained',
            metric: { end: 1000, suffix: '+', separator: ',', after: ' Eye Care Professionals Trained' },
            description:
              'Ophthall Conferences & Education — Through Ophthall Conferences, Ophthall Academy, Master Classes, Optician Training Programs, Patient Counsellor Programs, and Practice Development Workshops that promote continuous learning and professional growth.',
            icon: 'lightbulb',
          },
        ]}
      />
      <Consulting
        eyebrow="Consulting"
        heading="Build stronger, scalable healthcare practices"
        body={[
          'For over 2 decades, Dr. Senthil has worked with hospitals, clinics, and healthcare organizations across India, helping them improve growth, operational efficiency, patient experience, team performance, and long-term sustainability.',
          'Through strategic consulting, leadership mentoring, practice development programs, and business transformation initiatives, he has supported hundreds of healthcare institutions in building stronger systems, enhancing profitability, and creating scalable healthcare enterprises while maintaining clinical excellence.',
        ]}
        ctaLabel="Book a consultation"
        ctaHref="#contact"
        imageSrc={PARTNERSHIP_IMAGES[3]}
        imageAlt="Dr. Senthil speaking at an eye care event"
      />
      <Partnerships
        heading="Speaking / Training"
        items={[
          // {
          //   id: 'p-1',
          //   date: 'Dec 2013',
          //   title: 'Unitus Ventures — Lead Investor, Welcare Health Systems',
          //   tags: ['Investment', 'HealthTech', 'Impact'],
          //   graphicVariant: 'freelance',
          //   imageSrc: PARTNERSHIP_IMAGES[0],
          // },
          // {
          //   id: 'p-2',
          //   date: 'Since 2005',
          //   title: 'Unite For Sight — Chennai Chapter Lead & Partner Eye Clinic',
          //   tags: ['Humanitarian', 'Global Health', 'Community'],
          //   graphicVariant: 'sofa',
          //   imageSrc: PARTNERSHIP_IMAGES[1],
          // },
          {
            id: 'p-1',
            date: 'April 2006',
            title: 'Yale University — Speaker, Unite For Sight Annual Conference',
            tags: ['Speaking', 'International', 'Academia'],
            graphicVariant: 'zoom',
            imageSrc: PARTNERSHIP_IMAGES[2],
          },
          // {
          //   id: 'p-4',
          //   date: '2007',
          //   title: 'Stanford University — Humanitarian Volunteer of the Year Award',
          //   tags: ['Recognition', 'Stanford', 'Global'],
          //   graphicVariant: 'interview',
          //   imageSrc: PARTNERSHIP_IMAGES[3],
          // },
          // {
          //   id: 'p-5',
          //   date: 'Ongoing',
          //   title: 'Duke University — Guest Speaker, Eye Care Innovation',
          //   tags: ['Speaking', 'Academia', 'Innovation'],
          //   graphicVariant: 'skills',
          //   imageSrc: PARTNERSHIP_IMAGES[4],
          // },
          {
            id: 'p-2',
            date: '2024',
            title: 'AIIMS New Delhi — Host, Ophthall Practice Development Conference',
            tags: ['Conference', 'Leadership', 'National'],
            graphicVariant: 'ai',
            imageSrc: PARTNERSHIP_IMAGES[0],
          },
          {
            id: 'p-3',
            date: '2016',
            title: 'CII India — Healthcare Entrepreneur of the Year',
            tags: ['Industry', 'Award', 'Entrepreneurship'],
            graphicVariant: 'figma',
            imageSrc: PARTNERSHIP_IMAGES[1],
          },
          // {
          //   id: 'p-8',
          //   date: 'Ongoing',
          //   title: 'Telemedicine Society of India — Vice President, Tamil Nadu Chapter',
          //   tags: ['Leadership', 'Telemedicine', 'Tamil Nadu'],
          //   graphicVariant: 'content',
          //   imageSrc: PARTNERSHIP_IMAGES[2],
          // },
        ]}
      />

      {/* New Pathway section showcasing product strategy */}
      <Pathway
        heading="Ventures & Investments"
        subheading="Five organisations built across 2 decades — each solving a distinct gap in the Indian eye care ecosystem."
        steps={[
          {
            id: 'v-1',
            stepNumber: 1,
            title: 'Ophthall — Practice Development Platform',
            description:
              "India's first and only practice development conference and community platform exclusively for ophthalmologists — covering finance, HR, marketing, technology, fund-raising, and more.",
            bullets: [
              'Founder & Organising Chairman',
              '600+ eye hospitals in inaugural edition',
              'Conferences across India — AIIMS New Delhi (2024)',
              'Addresses finance, HR, marketing, medico-legal & accreditation',
            ],
            whyNeeded: [
              'Eye hospitals had no structured platform to learn business strategy',
              'Ophthalmologists needed peer learning beyond clinical conferences',
              'Practice development was an unaddressed gap in Indian ophthalmology',
            ],
            graphicVariant: 'discovery',
            imageSrc: '/images/ventureimage3.jpeg',
            imageAlt: 'Ophthall Practice Development logo',
          },
          {
            id: 'v-2',
            stepNumber: 2,
            title: 'Welcare Health Systems — Telemedicine Eye Screening',
            description:
              'Affordable telemedicine-based eye screening company delivering diabetic retinopathy screening at under half the cost of conventional procedures — backed by Unitus Ventures.',
            bullets: [
              'CEO & Co-Founder — Founded 2013, Chennai',
              '500,000+ patients screened to date',
              '160+ diabetes centers connected',
              'Backed by Unitus Ventures (Lead) + Angel investors',
            ],
            whyNeeded: [
              '60 million diabetics in India at risk of preventable blindness',
              'Conventional screening was unaffordable for rural populations',
              'Technology could bridge the ophthalmologist-to-patient gap at scale',
            ],
            graphicVariant: 'ux',
            imageSrc: '/images/ventureimage2.png',
            imageAlt: 'Welcare Health Systems logo',
          },
          // {
          //   id: 'v-3',
          //   stepNumber: 3,
          //   title: 'Pranav Foundation — Free Eye Care for the Underprivileged',
          //   description:
          //     'A charitable trust providing free and subsidised ophthalmic services to economically underprivileged patients in Chennai and surrounding areas — grown from a single-room OPD to a multi-location hospital group.',
          //   bullets: [
          //     'Managing Trustee',
          //     '200,000+ (2 lakh) patients served since inception',
          //     'Started as single-room OPD in 2005',
          //     'Now a multi-location hospital group — Pranav Eye Care',
          //   ],
          //   whyNeeded: [
          //     'Quality eye care remained inaccessible to low-income communities',
          //     'A sustainable non-profit model was needed alongside commercial ventures',
          //     'Ethical healthcare growth must include serving those who cannot pay',
          //   ],
          //   graphicVariant: 'brand',
          // },
          {
            id: 'v-3',
            stepNumber: 3,
            title: 'Ophthall Academy of Vision Sciences — Healthcare Education',
            description:
              'An educational initiative to improve the quality of manpower in healthcare organisations through fellowships and training programmes focused on Optometrists, Opticians, and paramedical professionals.',
            bullets: [
              'Founder',
              'Fellowships for Optometrists & Opticians',
              'Paramedical professional training programmes',
              'Improves manpower quality across eye hospital teams',
            ],
            whyNeeded: [
              'Eye hospitals lacked trained paramedical and optical support staff',
              'No dedicated academy existed for vision science allied health education',
              'Skilled teams are the backbone of any scalable eye care practice',
            ],
            graphicVariant: 'direction',
            imageSrc: '/images/ventureimage1.jpeg',
            imageAlt: 'Ophthall Academy logo',
          },
          {
            id: 'v-4',
            stepNumber: 4,
            title: 'Ophthall Eventology — Conferences & Event Management',
            description:
              'Organiser of Ophthall Conferences and India Ophthalmology Expo — having delivered 20+ physical events across Chennai, Mumbai, Delhi, Hyderabad, and Bangalore over 8 years.',
            bullets: [
              'Partner',
              '20+ physical events organised in 8 years',
              'Cities: Chennai, Mumbai, Delhi, Hyderabad, Bangalore',
              'Organiser of India Ophthalmology Expo',
            ],
            whyNeeded: [
              'Large-scale ophthalmology events needed dedicated end-to-end management',
              'A specialist event company ensures quality and consistency across cities',
              'Eventology operationalises the Ophthall vision at a national scale',
            ],
            graphicVariant: 'delivery',
            imageSrc: '/images/ventureimage4.png',
            imageAlt: 'Ophthall logo',
          },
        ]}
      />
      <Blog title="Blogs" />

      {/* Global premium floating contact button */}
      <FloatingChat />
    </main>
  );
}

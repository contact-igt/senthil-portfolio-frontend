'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useRef, useEffect } from 'react';
import Slider from 'react-slick';
import {
  ShieldCheck,
  HeartHandshake,
  Flame,
  Users,
  TrendingUp,
  Search,
  Check,
  Plus,
  Minus,
  Star,
  ArrowUpRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Logo } from '@/components/ui/Logo';
import { PreBookModal } from '@/components/ui/PreBookModal';
import { SpeakingModal } from '@/components/ui/SpeakingModal';
import styles from './PsychologyMedicalPracticeLanding.module.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
function LinkedInIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.58c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.68H9.34V8.99h3.42v1.57h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.32 7.42a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14zm1.78 13.03H3.53V8.99H7.1v11.46zM22.23 0H1.76C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.76 24h20.47c.97 0 1.77-.77 1.77-1.72V1.72C24 .77 23.2 0 22.23 0z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" stroke="none" />
    </svg>
  );
}

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About the Book', href: '#about-the-book' },
  { label: 'Why This Book?', href: '#why-this-book' },
  { label: 'Inside the Book', href: '#inside-the-book' },
  { label: 'Reviews', href: '#reader-testimonials' },
  { label: 'Author', href: '#author' },
];

const learnItems = [
  'Patient Psychology',
  'Doctor Psychology',
  'Communication',
  'Trust Building',
  'Medical Leadership',
  'Decision Making',
  'Patient Counselling',
  'Managing Difficult Patients',
  'Personal Branding',
  'Hospital Culture',
  'Practice Growth',
  'Systems Thinking',
];

const whyItems = [
  {
    Icon: ShieldCheck,
    title: 'Why do patients trust one doctor instantly?',
    description: 'Trust is built through psychology, not just expertise. Learn the invisible signals that create or destroy patient confidence in seconds.',
  },
  {
    Icon: HeartHandshake,
    title: 'Why do some patients never return?',
    description: 'Excellent treatment is not enough. Discover the emotional and experiential factors that determine patient loyalty and retention.',
  },
  {
    Icon: Flame,
    title: 'Why do doctors experience burnout?',
    description: 'Burnout is a psychological pattern, not a weakness. Understand the mental frameworks that protect doctors who love medicine.',
  },
  {
    Icon: Users,
    title: 'Why is delegation so difficult?',
    description: 'Delegation fails when psychology is ignored. Explore trust, control, and communication patterns that shape great medical teams.',
  },
  {
    Icon: TrendingUp,
    title: 'Why do successful clinics struggle to grow?',
    description: 'Growth stalls without behavioural insight. Understand what drives patient decisions, referrals, and sustainable practice expansion.',
  },
  {
    Icon: Search,
    title: 'Why do patients seek second opinions?',
    description: 'Second opinions reflect unresolved doubt. Learn how communication style and perceived empathy directly influence patient decisions.',
  },
];

const benefits = [
  {
    title: 'Think beyond symptoms',
    description:
      'Understand the emotions, expectations, fears, and decision patterns that shape every patient interaction.',
  },
  {
    title: 'Build trust faster',
    description:
      'Learn practical ways to communicate with patients and families with more clarity, empathy, and confidence.',
  },
  {
    title: 'Lead stronger teams',
    description:
      'Apply behavioral insight to staff motivation, clinic culture, counselling, and day-to-day practice leadership.',
  },
  {
    title: 'Grow ethically',
    description:
      'Connect patient psychology with sustainable practice growth, better counselling, and long-term reputation.',
  },
];

const audiences = [
  {
    title: 'Practicing Doctors',
    description: 'Improve consultations, counselling and patient trust.',
    image: '/images/whois1_1.png',
  },
  {
    title: 'Medical Students',
    description: 'Learn what medical school rarely teaches.',
    image: '/images/whois2.png',
  },
  {
    title: 'Hospital Owners',
    description: 'Build systems that patients trust.',
    image: '/images/whois3.png',
  },
  {
    title: 'Young Consultants',
    description: 'Develop confidence beyond clinical expertise.',
    image: '/images/whois4.png',
  },
  {
    title: 'Healthcare Entrepreneurs',
    description: 'Understand how psychology influences healthcare growth.',
    image: '/images/whois5.png',
  },
];
const chapters = [
  {
    number: '01',
    title: 'The patient mind',
    description:
      'How fear, uncertainty, family influence, past experiences, and expectations affect medical decisions.',
  },
  {
    number: '02',
    title: 'The doctor as communicator',
    description:
      'Why the same diagnosis can be received differently depending on language, timing, tone, and trust.',
  },
  {
    number: '03',
    title: 'Counselling that converts with ethics',
    description:
      'A practical look at explaining value, reducing confusion, and helping patients choose the right care.',
  },
  {
    number: '04',
    title: 'Psychology inside the clinic',
    description:
      'How waiting areas, staff behavior, pricing conversations, and follow-ups change the patient experience.',
  },
  {
    number: '05',
    title: 'Leadership and team behavior',
    description:
      'Methods for building motivated teams that communicate consistently and protect the practice reputation.',
  },
  {
    number: '06',
    title: 'Growth with patient trust',
    description:
      'How modern medical practices can grow through education, experience design, and credibility.',
  },
];

const previews = [
  {
    title: 'Why Patients Trust Some Doctors More Than Others',
    description: 'Trust is rarely built through qualifications alone.',
  },
  {
    title: 'The Hidden Psychology of OPD',
    description: 'Why communication changes as the clinic becomes busier.',
  },
  {
    title: 'Ego, Identity and the Consultation Room',
    description: 'Understanding the emotional side of being a doctor.',
  },
  {
    title: 'The Psychology of Medical Decision Making',
    description: 'Helping patients choose confidently.',
  },
  {
    title: 'Building Organisational Trust',
    description: 'Moving from a doctor-dependent clinic to a trusted institution.',
  },
  {
    title: 'Risk, Growth and Leadership',
    description: 'Why many successful practices stop growing.',
  },
  {
    title: 'Burnout and Emotional Energy',
    description: "Protecting the doctor's most valuable clinical resource.",
  },
  {
    title: 'The Psychology Behind Every Successful Practice',
    description: 'The invisible forces shaping long-term success.',
  },
];


const bookTestimonials = [
  {
    name: 'Prof. Amar Agarwal',
    designation: 'Chairman',
    organization: 'Dr. Agarwals Group of Eye Hospitals',
    location: 'Chennai, India',
    image: '/images/testimonial1.png',
    quote: 'This excellent book offers valuable lessons for every healthcare professional and is a worthwhile read for anyone seeking to build a successful and patient-centred practice.',
  },
  {
    name: 'Dr. G. Bhaktavachalam',
    designation: 'Chairman',
    organization: 'KG Hospitals',
    location: 'Coimbatore',
    image: '/images/testimonial2.png',
    quote: 'This is one book which should be on the table of every doctor. An excellent read.',
  },
  {
    name: 'Vivek Shukla',
    designation: 'Founder & Managing Partner',
    organization: 'SURGE Growth Partners',
    location: 'Dubai',
    image: '/images/testimonial3.png',
    quote: 'A much needed book on a topic that is not taught in any medical college. Practical and highly relevant for modern physicians.',
  },
];

const readerTestimonialItems = [...bookTestimonials, ...bookTestimonials];
const speakingTopics = [
  'Psychology of Medical Practice',
  'Patient Trust',
  'Medical Leadership',
  'Communication',
  'Healthcare Entrepreneurship',
  'Hospital Growth',
  'Practice Management',
];
const faqItems = [
  {
    question: 'Who is this book for?',
    answer: 'Doctors, dentists, surgeons, medical students, hospital administrators and healthcare entrepreneurs.',
  },
  {
    question: 'Is it only for doctors?',
    answer: 'While written primarily for medical professionals, the principles apply across healthcare.',
  },
  {
    question: 'Will students benefit?',
    answer: 'Absolutely. The book introduces practical concepts rarely covered during medical education.',
  },
  {
    question: 'Is it evidence-based?',
    answer: 'Yes. The book combines behavioural science, psychology, healthcare management research and real-world experience.',
  },
  {
    question: 'Does it discuss hospital management?',
    answer: 'Yes. Several chapters explore leadership, culture, systems thinking and organisational growth.',
  },
  {
    question: 'Will Kindle be available?',
    answer: 'Yes.',
  },
  {
    question: 'Are bulk orders available?',
    answer: 'Yes, for hospitals, medical colleges and organisations.',
  },
  {
    question: 'Can I invite Dr. Senthil to speak?',
    answer: 'Yes. Speaking engagements, workshops and keynote sessions are available worldwide.',
  },
];

const testimonialSliderSettings = {
  dots: false,
  infinite: true,
  autoplay: true,
  autoplaySpeed: 2400,
  speed: 700,
  slidesToShow: 3,
  slidesToScroll: 1,
  arrows: false,
  pauseOnHover: true,
  responsive: [
    {
      breakpoint: 1040,
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 680,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};
export function PsychologyMedicalPracticeLanding() {
  const [isPreBookOpen, setIsPreBookOpen] = useState(false);
  const [isBuyBookDisabled, setIsBuyBookDisabled] = useState(false);
  const [isSpeakingModalOpen, setIsSpeakingModalOpen] = useState(false);
  const [openInsideIndex, setOpenInsideIndex] = useState<number | null>(0);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isTrailerPlaying, setIsTrailerPlaying] = useState(false);
  const [trailerStarted, setTrailerStarted] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const trailerRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const handleTrailerToggle = () => {
    const video = trailerRef.current;
    if (!video) return;
    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };

  const openPreBook = () => setIsPreBookOpen(true);

  const handleBuyBookClick = () => {
    setIsBuyBookDisabled(true);
    openPreBook();
  };

  return (
    <div className={styles.page}>
      <header id="home" className={styles.hero}>
        <nav className={`${styles.nav} ${isScrolled ? styles.scrolled : ''}`} aria-label="Psychology of Medical Practice navigation">
          <Link href="/" className={styles.logoLink} aria-label="Go to home page">
            <Logo />
          </Link>
          <div className={styles.navLinks}>
            {navItems.map((item) => (
              <a key={item.label} href={item.href}>
                {item.label}
              </a>
            ))}
          </div>
          <div className={styles.navRightDesktop}>
            <Button variant="nav" size="md" onClick={openPreBook}>
              Pre-Book Now
            </Button>
          </div>

          {/* Mobile Hamburger Icon */}
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
          >
            <span className={styles.bar} />
            <span className={styles.bar} />
            <span className={styles.bar} />
          </button>

          {/* Mobile Open Menu Overlay Card */}
          {menuOpen && (
            <div className={styles.menuOverlay} role="dialog" aria-modal="true">
              <div className={styles.menuHeader}>
                <Logo />
                <button
                  className={styles.closeButton}
                  onClick={() => setMenuOpen(false)}
                  aria-label="Close navigation menu"
                >
                  <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                  </svg>
                </button>
              </div>

              <ul className={styles.mobileLinks} role="list">
                {navItems.map((item) => (
                  <li key={item.label} className={styles.mobileLinkItem}>
                    <a
                      href={item.href}
                      className={styles.mobileLink}
                      onClick={() => setMenuOpen(false)}
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className={styles.menuFooter}>
                <button
                  className={styles.mobileCtaButton}
                  onClick={() => {
                    setMenuOpen(false);
                    openPreBook();
                  }}
                  type="button"
                >
                  Pre-Book Now
                </button>
              </div>
            </div>
          )}
        </nav>

        <div className={styles.heroInner}>
          <div className={styles.heroCopy}>
            <h1>
              Psychology of
              <span>Medical Practice</span>
            </h1>
            <p className={styles.heroKicker}>
              The Business Behavioural and Leadership Lessons Medical Schools Never Taught You.
            </p>
            <p className={styles.heroDescription}>
              Medical science teaches doctors how to diagnose and treat diseases.
              This book explores something rarely taught in medical school -
              the psychology that shapes every consultation, every patient relationship,
              every practice decision and every successful healthcare organisation.
            </p>
            <div className={styles.heroActions}>
              <button className={styles.heroActionPrimary} type="button" onClick={handleBuyBookClick}>Buy the Book</button>
              {/* <a className={styles.heroActionSecondary} href="#read-chapter-one">Read Chapter One Free</a> */}
              <a className={styles.heroActionGhost} href="#book-trailer">Watch the Book Trailer</a>
            </div>
          </div>

          <div className={styles.heroVisual} aria-label="Book preview">
            <div className={styles.bookFrame}>
              <Image
                src="/images/book1.png"
                alt="Psychology of Medical Practice banner preview"
                fill
                priority
                sizes="(max-width: 900px) 90vw, 560px"
                className={styles.bookImage}
              />
            </div>
          </div>
        </div>
      </header>

      {/* ── About the Book ── */}
      <section id="about-the-book" className={`${styles.section} ${styles.whiteBand}`}>
        <div className={styles.container}>
          <div className={styles.aboutGrid}>

            <div className={styles.aboutVisual}>
              <div className={styles.aboutBookFrame}>
                <Image
                  src="/images/about.png"
                  alt="Psychology of Medical Practice book cover"
                  fill
                  sizes="(max-width: 900px) 80vw, 440px"
                  className={styles.aboutBookImage}
                />
              </div>
            </div>

            {/* Right: Text Content */}
            <div className={styles.aboutContent}>
              <h2 className={styles.aboutHeading}>About the Book</h2>
              <p className={styles.aboutTextLead}>
                Every doctor spends years learning how to <strong>diagnose disease</strong>, <strong>interpret investigations</strong> and <strong>perform treatments</strong>.
              </p>
              <p className={styles.aboutText}>
                Very few are taught <strong>why patients trust one doctor over another</strong>, how communication influences treatment
                decisions, <strong>why burnout develops</strong>, <strong>what makes practices grow</strong>, or <strong>how leadership shapes healthcare
                organisations</strong>.
              </p>
              <p className={styles.aboutText}>
                <strong>Psychology of Medical Practice</strong> explores the <strong>invisible human factors</strong> behind successful
                medical practice — bringing together psychology, communication, leadership, patient behaviour and
                practice management into one practical guide for modern healthcare professionals.
              </p>
            </div>

          </div>
        </div>
      </section>

      <section id="why-this-book" className={`${styles.section} ${styles.creamBand}`}>
        <div className={styles.container}>
          <div className={styles.whyHeader}>
            <h2 className={styles.whyHeading}>Why This Book?</h2>
            <p className={styles.whyIntro}>
              Doctors spend years mastering Anatomy, Pathology, Medicine and Surgeries.
              Yet every day they face questions that medicine alone cannot answer.
            </p>
          </div>

          <div className={styles.whyGrid}>
            {whyItems.map((item) => (
              <article className={styles.whyCard} key={item.title}>
                <item.Icon size={56} strokeWidth={2.35} className={styles.whyIcon} />
                <h3 className={styles.whyCardTitle}>{item.title}</h3>
                <p className={styles.whyCardDesc}>{item.description}</p>
              </article>
            ))}
          </div>

          <div className={styles.whyConclusion}>
            <p>The Answers Lie Not In Medicine —</p>
            <p className={styles.whyConclusionAccent}>But In Psychology.</p>
          </div>
        </div>
      </section>

      <section id="who-for" className={styles.audienceSection}>
        <div className={styles.container}>
          <div className={styles.audienceHeader}>
            {/* <span>Section 3</span> */}
            <h2>Who Should Read This Book?</h2>
          </div>

          <div className={styles.audienceGrid}>
            {audiences.map((audience) => (
              <article className={styles.audienceCard} key={audience.title}>
                <div className={styles.audienceImageWrap}>
                  <Image
                    src={audience.image}
                    alt={`${audience.title} illustration`}
                    width={360}
                    height={270}
                    className={styles.audienceImage}
                  />
                </div>
                <h3>{audience.title}</h3>
                <p>{audience.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="what-you-learn" className={styles.learnSection}>
        <div className={styles.container}>
          <div className={styles.learnGridContainer}>

            {/* Left: Book Image */}
            <div className={styles.learnVisual}>
              <div className={styles.learnBookFrame}>
                <Image
                  src="/images/learn.png"
                  alt="What You'll Learn illustration"
                  fill
                  sizes="(max-width: 900px) 70vw, 420px"
                  className={styles.learnBookImage}
                />
              </div>
            </div>

            {/* Right: What You'll Learn Content */}
            <div className={styles.learnContent}>
              <h2 className={styles.learnHeading}>What You&apos;ll Learn</h2>
              <div className={styles.learnGrid}>
                {learnItems.map((item) => (
                  <div className={styles.learnItem} key={item}>
                    <Image src="/images/tick icon .png" alt="" width={30} height={30} className={styles.learnCheckIcon} />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
              <div className={styles.learnCta}>
                <Button variant="primary" size="lg" onClick={openPreBook}>
                  Pre-Book Now
                </Button>
              </div>
            </div>

          </div>
        </div>
      </section>

      <section id="inside-the-book" className={styles.insideBookSection}>
        <div className={styles.container}>
          <div className={styles.insideBookHeader}>
            {/* <span>Inside the Book</span> */}
            <h2>What&apos;s Inside the Book</h2>
            <p>The core themes doctors will explore inside the book.</p>
          </div>

          <div className={styles.insideBookCard}>
            {previews.map((preview, index) => {
              const isOpen = openInsideIndex === index;

              return (
                <article
                  className={`${styles.insideThemeRow} ${isOpen ? styles.insideThemeRowOpen : ''}`}
                  key={preview.title}
                >
                  <button
                    className={styles.insideThemeButton}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenInsideIndex(isOpen ? null : index)}
                  >
                    <span className={styles.insideThemeTitle}>{preview.title}</span>
                    <span className={styles.insideThemeIcon} aria-hidden="true">
                      {isOpen ? <Minus size={24} strokeWidth={1.9} /> : <Plus size={24} strokeWidth={1.9} />}
                    </span>
                  </button>
                  <div className={`${styles.insideThemeAnswerWrap} ${isOpen ? styles.insideThemeAnswerOpen : ''}`}>
                    <p className={styles.insideThemePanel}>{preview.description}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* <section id="read-chapter-one" className={styles.freeChapterSection}>
        <div className={styles.container}>
          <div className={styles.freeChapterGrid}>
            <div className={styles.freeChapterCopy}>
              <span className={styles.freeChapterEyebrow}>Read Chapter One Free</span>
              <h2>Start with the chapter that changes how doctors see trust.</h2>
              <p>
                Get a focused preview of the book through one complete chapter.
                It introduces the central idea behind the book: medical success is
                not shaped by clinical skill alone, but by the psychology behind
                every patient conversation.
              </p>

              <div className={styles.freeChapterPoints}>
                {[
                  'A complete first-chapter reading experience',
                  'Built around patient trust and consultation psychology',
                  'Designed for doctors, clinic owners, and healthcare teams',
                ].map((point) => (
                  <div className={styles.freeChapterPoint} key={point}>
                    <Check size={20} strokeWidth={2.6} />
                    <span>{point}</span>
                  </div>
                ))}
              </div>

              <Button variant="primary" size="lg" onClick={openPreBook}>
                Read Chapter One Free
              </Button>
            </div>

            <div className={styles.freeChapterPreview} aria-label="Chapter one preview">
              <div className={styles.chapterPage}>
                <span>Chapter 01</span>
                <h3>Why Patients Trust Some Doctors More Than Others</h3>
                <p>
                  Trust is rarely built through qualifications alone. Patients decide
                  whether they feel safe, understood, and confident through a series
                  of subtle signals long before a treatment plan is accepted.
                </p>
                <div className={styles.chapterLines} aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                </div>
              </div>
              <div className={styles.chapterNote}>
                <strong>Free sample</strong>
                <span>One full chapter preview</span>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      <section id="reader-testimonials" className={styles.readerTestimonialsSection}>
        <div className={styles.container}>
          <div className={styles.readerTestimonialsHeader}>
            <h2>What Readers Are Saying</h2>
            <p>Endorsements from respected healthcare leaders and practice-growth professionals.</p>
          </div>

          <div className={styles.readerTestimonialsCarousel}>
            <Slider {...testimonialSliderSettings} className={styles.readerTestimonialsSlider}>
              {readerTestimonialItems.map((testimonial, index) => (
                <div className={styles.readerTestimonialSlide} key={`${testimonial.name}-${index}`}>
                  <article className={styles.readerTestimonialCard}>
                    <div className={styles.readerAvatar}>
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={68}
                        height={68}
                        className={styles.readerAvatarImg}
                      />
                    </div>
                    <div className={styles.readerStars} aria-label="5 star rating">
                      {Array.from({ length: 5 }, (_, starIndex) => (
                        <Star key={starIndex} size={16} fill="currentColor" strokeWidth={0} />
                      ))}
                    </div>
                    <p>{testimonial.quote}</p>
                    <div className={styles.readerMeta}>
                      <strong>{testimonial.name}</strong>
                      <span className={styles.readerDesignation}>{`${testimonial.designation}`}</span>
                      <span className={styles.readerLocation}>{testimonial.location}</span>
                      <span className={styles.readerOrg}>{testimonial.organization}</span>
                    </div>
                  </article>
                </div>
              ))}
            </Slider>
          </div>
        </div>
      </section>

      <section id="author" className={styles.authorSection}>
        <div className={`${styles.container} ${styles.authorGrid}`}>
          <div className={styles.authorImageWrap}>
            <Image
              src="/images/profile.png"
              alt="Dr. Senthil"
              width={520}
              height={520}
              className={styles.authorImage}
            />
          </div>

          <div className={styles.authorCopy}>
            <h2>About the Author</h2>
            <h3 className={styles.authorName}>Dr. Senthil</h3>
            <p className={styles.authorRole}>
              Ophthalmologist | Healthcare Entrepreneur | Practice Development Consultant | Founder, Ophthall
            </p>
            <div className={styles.authorBio}>
              <p>
                For more than two decades, <strong>Dr. Senthil has worked with doctors, hospitals and healthcare organisations across India</strong>, helping them build patient-centred practices, stronger systems and sustainable growth.
              </p>
              <p>
                His work spans <strong>clinical practice, healthcare entrepreneurship, leadership development, hospital strategy, communication training and practice transformation</strong>. Through Ophthall, he has conducted conferences, workshops and consulting programmes that have helped thousands of healthcare professionals improve both patient care and organisational performance.
              </p>
              {/* <p>
                Drawing on years of clinical experience and close collaboration with medical professionals, he combines <strong>psychology, communication, leadership and practice management</strong> in a way that is practical, evidence-informed and immediately applicable.
              </p> */}
              <p>
                <strong>Psychology of Medical Practice is his first book</strong> and reflects his belief that understanding people is just as important as understanding disease.
              </p>
            </div>

            <div className={styles.authorActions}>
              <a href="https://senthil.ophthall.in/" target="_blank" rel="noreferrer">
                <ArrowUpRight size={20} strokeWidth={2.3} />
                <span>Visit Personal Website</span>
              </a>
              <a href="https://www.linkedin.com/in/dr-tamilarasan-senthil-b4b7b32/" target="_blank" rel="noreferrer">
                <LinkedInIcon />
                <span>LinkedIn</span>
              </a>
              <a href="https://www.instagram.com/senthilophthall/" target="_blank" rel="noreferrer">
                <InstagramIcon />
                <span>Instagram</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section id="book-trailer" className={styles.trailerSection}>
        <div className={styles.container}>
          <div className={styles.trailerHeader}>
            <h2>Watch the Book Trailer</h2>
          </div>

          <div className={styles.trailerPlayerWrap}>
            <video
              ref={trailerRef}
              src="/images/book_trailer.mp4"
              title="Psychology of Medical Practice book trailer"
              playsInline
              preload="metadata"
              controls={trailerStarted}
              className={styles.trailerPlayer}
              onPlay={() => { setIsTrailerPlaying(true); setTrailerStarted(true); }}
              onPause={() => setIsTrailerPlaying(false)}
              onEnded={() => setIsTrailerPlaying(false)}
            />
            {!trailerStarted && (
              <button
                className={styles.trailerPlayBtn}
                onClick={handleTrailerToggle}
                aria-label="Play video"
                type="button"
              >
                <span className={styles.trailerPlayIcon}>
                  <svg width="28" height="32" viewBox="0 0 28 32" fill="none" aria-hidden="true">
                    <path d="M2 2L26 16L2 30V2Z" fill="white" stroke="white" strokeWidth="2" strokeLinejoin="round" />
                  </svg>
                </span>
              </button>
            )}
          </div>
        </div>
      </section>

      <section id="faq" className={styles.faqSection}>
        <div className={styles.container}>
          <div className={styles.faqHeader}>
            <h2>Frequently Asked Questions</h2>
          </div>

          <div className={styles.faqCard}>
            {faqItems.map((item, index) => {
              const isOpen = openFaqIndex === index;

              return (
                <article className={`${styles.faqRow} ${isOpen ? styles.faqRowOpen : ''}`} key={item.question}>
                  <button
                    className={styles.faqButton}
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenFaqIndex(isOpen ? null : index)}
                  >
                    <span>{item.question}</span>
                    <span className={styles.faqIcon} aria-hidden="true">
                      {isOpen ? <Minus size={22} strokeWidth={2} /> : <Plus size={22} strokeWidth={2} />}
                    </span>
                  </button>
                  <div className={styles.faqAnswerWrap} aria-hidden={!isOpen}>
                    <p className={styles.faqAnswer}>{item.answer}</p>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section id="invite-speaking" className={styles.speakingInviteSection}>
        <div className={styles.speakingInvitePanel}>
          <div className={styles.speakingInviteAvatar}>
            <Image
              src="/images/senthilsir5.JPG"
              alt="Dr. Senthil"
              width={116}
              height={116}
              quality={90}
            />
          </div>

          {/* <span className={styles.speakingInviteEyebrow}>Speaking / Training</span> */}
          <h2>Invite Dr. Senthil to Speak</h2>
          <p>
            Bring practical lessons from psychology, communication, leadership and healthcare growth to your medical conference, hospital team or professional forum.
          </p>

          <div className={styles.speakingTopicsGrid} aria-label="Speaking topics">
            {speakingTopics.map((topic) => (
              <span className={styles.speakingTopicPill} key={topic}>
                {topic}
              </span>
            ))}
          </div>

          <button
            type="button"
            className={styles.speakingInviteButton}
            onClick={() => setIsSpeakingModalOpen(true)}
          >
            Invite for a Talk
          </button>
        </div>
      </section>

      <SpeakingModal
        isOpen={isSpeakingModalOpen}
        onClose={() => setIsSpeakingModalOpen(false)}
      />
      <PreBookModal
        isOpen={isPreBookOpen}
        onClose={() => setIsPreBookOpen(false)}
      />
    </div>
  );
}

export default PsychologyMedicalPracticeLanding;

































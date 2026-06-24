import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './Blog.module.css';

interface BlogPost {
  id: string;
  date: string;
  title: string;
  categories: string[];
  href: string;
  imageSrc?: string;
  imageAlt?: string;
  graphicVariant?: 'validate' | 'ux' | 'video';
}

interface BlogProps {
  title?: string;
  posts?: BlogPost[];
}

const DEFAULT_POSTS: BlogPost[] = [
    {
    id: 'blog-1',
    date: '23 June 26',
    title: 'Why Every Eye Hospital Needs a CRM: The Missing Link Between Clinical Excellence and Practice Growth',
    categories: ['CRM', 'Eye Hospital', 'Practice Growth'],
    href: 'https://www.linkedin.com/pulse/why-every-eye-hospital-needs-crm-missing-link-between-senthil-njgxe/',
    imageSrc: '/images/blog3.png',
    imageAlt: 'Why Every Eye Hospital Needs a CRM: The Missing Link Between Clinical Excellence and Practice Growth',
  },
  {
    id: 'blog-2',
    date: '11 May 26',
    title: 'Why Every Child Must Learn the Value of Money Early',
    categories: ['Money', 'Children', 'Learning'],
    href: 'https://www.linkedin.com/pulse/why-every-child-must-learn-value-money-early-dr-tamilarasan-senthil-bu5qc/',
    imageSrc: '/images/blog1.png',
    imageAlt: 'Blog artwork about children learning the value of money early',
  },
  {
    id: 'blog-3',
    date: '08 May 26',
    title: 'The Barbeque Nation Problem in Eye Hospital Expansion',
    categories: ['Eye Hospitals', 'Expansion', 'Strategy'],
    href: 'https://www.linkedin.com/pulse/barbeque-nation-problem-eye-hospital-expansion-dr-tamilarasan-senthil-vswrc/',
    imageSrc: '/images/blog2.png',
    imageAlt: 'Blog artwork about the Barbeque Nation problem in eye hospital expansion',
  },
  // {
  //   id: 'blog-3',
  //   date: '17 Apr 26',
  //   title: 'Start a Orthoptics and Vision Therapy Clinic',
  //   categories: ['Orthoptics', 'Vision Therapy', 'Clinic'],
  //   imageSrc: '/images/blog3.png',
  //   imageAlt: 'Blog artwork about starting an orthoptics and vision therapy clinic',
  // },
  {
    id: 'blog-4',
    date: '08 Apr 26',
    title: 'Success Vs Significance',
    categories: ['Success', 'Purpose', 'Leadership'],
    href: 'https://www.linkedin.com/pulse/success-vs-significance-dr-tamilarasan-senthil-aam8c/',
    imageSrc: '/images/blog4.png',
    imageAlt: 'Blog artwork about success versus significance',
  },
  {
    id: 'blog-5',
    date: '24 Mar 26',
    title: '12 Mental Models for a succesful Medical Practice',
    categories: ['Mental Models', 'Medical Practice', 'Growth'],
    href: 'https://www.linkedin.com/pulse/12-mental-models-succesful-medical-practice-dr-tamilarasan-senthil-uwvac/',
    imageSrc: '/images/blog5.png',
    imageAlt: 'Blog artwork about mental models for a successful medical practice',
  },
  {
    id: 'blog-6',
    date: '18 Mar 26',
    title: 'Why Doctors Build Practices... But Rarely Build a Legacy',
    categories: ['Doctors', 'Practice', 'Legacy'],
    href: 'https://www.linkedin.com/pulse/why-doctors-build-practices-rarely-legacy-dr-tamilarasan-senthil-l1f6c/',
    imageSrc: '/images/blog6.png',
    imageAlt: 'Blog artwork about doctors building practices and legacy',
  },
];

function BlogGraphic({ variant = 'ux' }: { variant?: BlogPost['graphicVariant'] }) {
  if (variant === 'validate') {
    return (
      <div className={styles.validateGraphic} aria-hidden="true">
        <span className={styles.validateSpark} />
        <span className={styles.validateEyebrow}>How hospitals can</span>
        <span className={styles.validateTitle}>Validate ideas</span>
        <span className={styles.validateConnector} />
        <span className={styles.validatePillOne}>Patients</span>
        <span className={styles.validatePillTwo}>Demand</span>
        <span className={styles.validatePillThree}>Systems</span>
        <span className={styles.validateCheck}>✓</span>
        <span className={styles.validateCrossOne}>×</span>
        <span className={styles.validateCrossTwo}>×</span>
      </div>
    );
  }

  if (variant === 'video') {
    return (
      <div className={styles.videoGraphic} aria-hidden="true">
        <span className={styles.videoScreen} />
        <span className={styles.videoPersonOne} />
        <span className={styles.videoPersonTwo} />
      </div>
    );
  }

  return (
    <div className={styles.uxGraphic} aria-hidden="true">
      <span className={styles.uxDocument}>
        <span />
        <span />
        <span />
      </span>
      <span className={styles.uxBadge} />
      <span className={styles.uxLock} />
      <span className={styles.uxCard} />
      <span className={styles.uxTitle}>Healthcare mentoring</span>
    </div>
  );
}

export function Blog({ title = 'Blogs', posts = DEFAULT_POSTS }: BlogProps) {
  return (
    <section id="blog" className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.container}>
        <h2 id="blog-heading" className={styles.heading}>
          {title}
        </h2>

        <div className={styles.grid}>
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.href}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.card}
              aria-label={post.title}
            >
              <div className={styles.media}>
                {post.imageSrc ? (
                  <Image
                    src={post.imageSrc}
                    alt={post.imageAlt ?? post.title}
                    fill
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                    className={styles.image}
                  />
                ) : (
                  <BlogGraphic variant={post.graphicVariant} />
                )}
              </div>

              <time className={styles.date}>{post.date}</time>
              <h3 className={styles.cardTitle}>
                {post.title}
              </h3>
              <div className={styles.divider} aria-hidden="true" />
              <p className={styles.bottomCategories}>{post.categories.join(' | ')}</p>
            </a>
          ))}
        </div>

        <div className={styles.exploreWrap}>
          <Button
      href="https://www.linkedin.com/in/senthilophthall/recent-activity/articles/"
            target="_blank"
            rel="noopener noreferrer"
            variant="primary"
            size="lg"
            className={styles.exploreBtn}
          >
            Explore More Articles
          </Button>
        </div>
      </div>
    </section>
  );
}

export default Blog;

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
}

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

async function fetchBlogs(): Promise<BlogPost[]> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${apiUrl}/blogs`, { next: { revalidate: 60 } });
    if (!res.ok) {
      console.error('Failed to fetch blogs');
      return [];
    }
    const json = await res.json();
    if (json.data && Array.isArray(json.data)) {
      return json.data.map((blog: any) => ({
        id: blog.id.toString(),
        date: blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: '2-digit' }) : '',
        title: blog.title,
        categories: blog.categories || [], // API might not have categories, default to empty
        href: `/blog/${blog.slug}`,
        imageSrc: blog.cover_img_url || null,
        imageAlt: blog.title,
      }));
    }
    return [];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

export async function Blog({ title = 'Blogs' }: BlogProps) {
  const posts = await fetchBlogs();

  return (
    <section id="blog" className={styles.section} aria-labelledby="blog-heading">
      <div className={styles.container}>
        <h2 id="blog-heading" className={styles.heading}>
          {title}
        </h2>

        {posts.length > 0 ? (
          <div className={styles.grid}>
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.href}
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
                      style={{ objectFit: 'cover' }}
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
        ) : (
          <p style={{ textAlign: 'center', margin: '2rem 0', color: 'var(--color-text-muted)' }}>No blogs available at the moment.</p>
        )}

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

import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import styles from './BlogDetail.module.css';

interface BlogSection {
  id: number;
  section_order: number;
  layout: string;
  text_content: string;
  image_url: string;
}

interface BlogData {
  id: number;
  title: string;
  slug: string;
  author_title: string;
  author_name: string;
  author_img_url: string;
  cover_img_url: string;
  overview: string;
  content: string;
  ispublished: string;
  published_at: string;
  sections: BlogSection[];
}

async function getBlog(slug: string): Promise<BlogData | null> {
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/v1';
    const res = await fetch(`${apiUrl}/blog/${slug}`, { next: { revalidate: 60 } });
    if (!res.ok) {
      return null;
    }
    const json = await res.json();
    return json.data || null;
  } catch (error) {
    console.error('Failed to fetch blog:', error);
    return null;
  }
}

export default async function BlogPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  const blog = await getBlog(resolvedParams.slug);

  if (!blog) {
    notFound();
  }

  const formattedDate = blog.published_at 
    ? new Date(blog.published_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })
    : '';

  return (
    <>
      <main className={styles.container}>
      <Link href="/#blog" className={styles.backLink}>
        ← Back to Home
      </Link>

      <article>
        <header className={styles.header}>
          <h1 className={styles.title}>{blog.title}</h1>
          <div className={styles.meta}>
            <div className={styles.author}>
              {blog.author_img_url && (
                <Image 
                  src={blog.author_img_url} 
                  alt={blog.author_name} 
                  width={40} 
                  height={40} 
                  className={styles.authorImage} 
                />
              )}
              <span className={styles.authorName}>
                {blog.author_title} {blog.author_name}
              </span>
            </div>
            {formattedDate && <time>{formattedDate}</time>}
          </div>
        </header>

        {blog.cover_img_url && (
          <div className={styles.coverImageWrapper}>
            <Image
              src={blog.cover_img_url}
              alt={blog.title}
              fill
              priority
              className={styles.coverImage}
            />
          </div>
        )}

        {blog.overview && (
          <div className={styles.overview} dangerouslySetInnerHTML={{ __html: blog.overview }} />
        )}

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: blog.content }} />

        {blog.sections && blog.sections.length > 0 && (
          <div className={styles.sections}>
            {blog.sections.sort((a, b) => a.section_order - b.section_order).map((section) => (
              <section key={section.id} className={styles.section}>
                {section.image_url && (
                  <div className={styles.sectionImageWrapper}>
                    <Image
                      src={section.image_url}
                      alt={`Section ${section.section_order}`}
                      fill
                      className={styles.coverImage}
                    />
                  </div>
                )}
                {section.text_content && (
                  <div className={styles.sectionText} dangerouslySetInnerHTML={{ __html: section.text_content }} />
                )}
              </section>
            ))}
          </div>
        )}
      </article>
    </main>
    </>
  );
}

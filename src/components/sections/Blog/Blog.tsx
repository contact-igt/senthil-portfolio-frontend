import Image from 'next/image';
import { Button } from '@/components/ui/Button';
import styles from './Blog.module.css';

interface BlogPost {
  id: string;
  date: string;
  title: string;
  author: string;
  excerpt: string;
  href: string;
}

interface BlogProps {
  title?: string;
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
      return json.data.map((blog: any) => {
        let snippet = blog.overview || (blog.content ? blog.content.replace(/<[^>]+>/g, '') : '');
        if (snippet.length > 150) snippet = snippet.substring(0, 150) + '...';
        
        return {
          id: blog.id.toString(),
          date: blog.published_at ? new Date(blog.published_at).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }).toUpperCase() : '',
          title: blog.title,
          author: blog.author_name ? blog.author_name.toUpperCase() : 'ADMIN',
          excerpt: snippet,
          href: `/blog/${blog.slug}`,
        };
      });
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
          <div className={styles.list}>
            {posts.map((post) => (
              <a
                key={post.id}
                href={post.href}
                className={styles.listItem}
                aria-label={post.title}
              >
                <h3 className={styles.itemTitle}>
                  {post.title}
                </h3>
                <p className={styles.itemExcerpt}>
                  “{post.excerpt}”
                </p>
                <div className={styles.itemFooter}>
                  <span className={styles.itemMeta}>
                    by {post.author} — {post.date}
                  </span>
                  <span className={styles.itemReadMore}>
                    READ MORE &rarr;
                  </span>
                </div>
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

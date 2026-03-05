'use client';

import { useEffect, useState } from 'react';

interface PostItem {
  id: number;
  title: {
    rendered: string;
  };
  excerpt: {
    rendered: string;
  };
  slug: string;
  date: string;
  featured_image?: number;
}

export default function Home() {
  const [posts, setPosts] = useState<PostItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch('/api/posts');
        
        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`);
        }

        const result = await response.json();
        
        if (result.error) {
          throw new Error(result.error);
        }

        setPosts(result.data || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
        console.error('Error fetching posts:', err);
      } finally {
        setLoading(false);
      }
    };

    loadPosts();
  }, []);

  return (
    <div>
      <h1>Hello World! 👋</h1>
      <p>Welcome to GynecomastiadMD - Built with Next.js</p>

      <section
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#f5f5f5',
          borderRadius: '8px',
        }}
      >
        <h2>REST API Connection Test</h2>

        {loading && <p>🔄 Loading posts from WordPress...</p>}

        {error && (
          <div
            style={{
              color: '#d32f2f',
              padding: '1rem',
              backgroundColor: '#ffebee',
              borderRadius: '4px',
            }}
          >
            <p>
              <strong>❌ Error:</strong> {error}
            </p>
            <details>
              <summary>View details</summary>
              <pre
                style={{
                  marginTop: '0.5rem',
                  fontSize: '0.85rem',
                  overflow: 'auto',
                }}
              >
                Make sure that:
                1. The API route /api/posts is working
                2. Environment variables are configured in Vercel
                3. The WordPress REST API endpoint is accessible
              </pre>
            </details>
          </div>
        )}

        {posts && posts.length > 0 && (
          <div style={{ color: '#2e7d32' }}>
            <p>✅ Successfully connected to WordPress REST API</p>
            <div
              style={{
                marginTop: '1rem',
                padding: '1rem',
                backgroundColor: '#fff',
                borderRadius: '4px',
                border: '1px solid #4caf50',
              }}
            >
              <h3>Recent Posts ({posts.length})</h3>
              <ul style={{ listStyle: 'none', padding: 0 }}>
                {posts.map((post) => (
                  <li
                    key={post.id}
                    style={{
                      padding: '0.5rem 0',
                      borderBottom: '1px solid #eee',
                    }}
                  >
                    <strong>{post.title.rendered}</strong>
                    <p style={{ margin: '0.25rem 0', fontSize: '0.9rem', color: '#666' }}>
                      {post.slug} - {new Date(post.date).toLocaleDateString('en-US')}
                    </p>
                    <p
                      style={{
                        margin: '0.25rem 0',
                        fontSize: '0.85rem',
                        color: '#555',
                      }}
                      dangerouslySetInnerHTML={{
                        __html: post.excerpt.rendered.slice(0, 150) + '...',
                      }}
                    />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <p>ℹ️ No posts available on the site</p>
        )}
      </section>

      <section style={{ marginTop: '2rem' }}>
        <h2>Next Steps</h2>
        <ul>
          <li>✅ Next.js project with TypeScript configured</li>
          <li>✅ REST API client ready for queries</li>
          <li>✅ WordPress REST API connection working</li>
          <li>✅ Deployed to Vercel</li>
          <li>⏳ Create components for individual posts</li>
          <li>⏳ Implement dynamic pages</li>
          <li>⏳ Add search and filters</li>
        </ul>
      </section>
    </div>
  );
}

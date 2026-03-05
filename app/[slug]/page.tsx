'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

interface Content {
  id: number | string;
  title: string;
  content: string;
  slug: string;
  type: 'page' | 'post' | 'local';
}

export default function ContentPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [content, setContent] = useState<Content | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        setLoading(true);
        setError(null);

        // First check local pages via API
        const localPageResponse = await fetch(`/api/local-pages?slug=${slug}`);
        const localPageData = await localPageResponse.json();
        
        if (localPageData.data) {
          setContent({
            ...localPageData.data,
            type: 'local',
          });
          return;
        }

        // If not a local page, try to fetch from WordPress pages
        const pagesResponse = await fetch('/api/pages');
        const pagesData = await pagesResponse.json();
        
        if (pagesData.data) {
          const page = Array.isArray(pagesData.data) 
            ? pagesData.data.find((p: any) => p.slug === slug)
            : null;

          if (page) {
            // Fetch full page content
            const fullPageResponse = await fetch(`/api/pages/${page.id}`);
            const fullPageData = await fullPageResponse.json();
            
            setContent({
              ...fullPageData.data,
              type: 'page',
            });
            return;
          }
        }

        // If not a page, try posts from WordPress
        const postsResponse = await fetch('/api/posts');
        const postsData = await postsResponse.json();
        
        if (postsData.data) {
          const post = Array.isArray(postsData.data)
            ? postsData.data.find((p: any) => p.slug === slug)
            : null;

          if (post) {
            // Fetch full post content
            const fullPostResponse = await fetch(`/api/posts/${post.id}`);
            const fullPostData = await fullPostResponse.json();
            
            setContent({
              ...fullPostData.data,
              type: 'post',
            });
            return;
          }
        }

        setError('Content not found');
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    if (slug) {
      fetchContent();
    }
  }, [slug]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error || !content) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">Not Found</h1>
          <p className="text-gray-600 mb-6">
            {error || 'The page you are looking for does not exist.'}
          </p>
          <a
            href="/"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Go Home
          </a>
        </div>
      </div>
    );
  }

  return (
    <article className="max-w-4xl mx-auto py-12 px-4">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{content.title}</h1>
        <p className="text-gray-500 text-sm">
          {content.type === 'post' ? 'Blog Post' : 'Page'}
        </p>
      </header>

      <div
        className="prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: content.content }}
      />
    </article>
  );
}

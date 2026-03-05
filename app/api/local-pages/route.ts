export const dynamic = 'force-dynamic';

import { getAllPages, getPageBySlug } from '@/lib/pages';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const slug = searchParams.get('slug');

    if (slug) {
      // Get a specific page by slug
      const page = getPageBySlug(slug);
      if (page) {
        return Response.json({ data: page, error: null });
      }
      return Response.json(
        { data: null, error: 'Page not found' },
        { status: 404 }
      );
    }

    // Get all pages
    const pages = getAllPages();
    return Response.json({ data: pages, error: null });
  } catch (error) {
    console.error('Error fetching local pages:', error);
    return Response.json(
      {
        error: 'Failed to fetch pages',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

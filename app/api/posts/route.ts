import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS } from '@/lib/queries';

export const dynamic = 'force-dynamic';

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

export async function GET() {
  try {
    const queryParams = new URLSearchParams();
    queryParams.append('per_page', '5');
    queryParams.append('orderby', 'date');
    queryParams.append('order', 'desc');

    const data = await fetchWordPressAPI<PostItem[]>(
      `${ENDPOINTS.POSTS}?${queryParams.toString()}`
    );

    return Response.json({ data, error: null });
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    console.error('Error fetching posts:', error);
    return Response.json(
      { data: null, error: errorMessage },
      { status: 500 }
    );
  }
}

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
    // Debug: Log environment variables
    console.log('=== API Route Debug ===');
    console.log('NEXT_PUBLIC_API_ENDPOINT:', process.env.NEXT_PUBLIC_API_ENDPOINT);
    console.log('API_USERNAME present:', !!process.env.API_USERNAME);
    console.log('API_PASSWORD present:', !!process.env.API_PASSWORD);
    
    if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
      throw new Error('NEXT_PUBLIC_API_ENDPOINT is not configured');
    }
    
    if (!process.env.API_USERNAME || !process.env.API_PASSWORD) {
      throw new Error('API credentials are not configured');
    }

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

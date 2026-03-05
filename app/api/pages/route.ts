import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS, PAGE_QUERY_PARAMS } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    if (!process.env.NEXT_PUBLIC_API_ENDPOINT) {
      throw new Error('NEXT_PUBLIC_API_ENDPOINT is not configured');
    }

    const queryParams = new URLSearchParams();
    Object.entries(PAGE_QUERY_PARAMS).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else {
        queryParams.append(key, String(value));
      }
    });

    const data = await fetchWordPressAPI(
      `${ENDPOINTS.PAGES}?${queryParams.toString()}`
    );

    return Response.json({ data, error: null });
  } catch (error) {
    console.error('Error fetching pages:', error);
    return Response.json(
      {
        error: 'Failed to fetch pages',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

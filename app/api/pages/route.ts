import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS, PAGE_QUERY_PARAMS } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;

    if (!apiEndpoint) {
      return Response.json(
        { error: 'API endpoint not configured' },
        { status: 500 }
      );
    }

    const pages = await fetchWordPressAPI(
      `${apiEndpoint}${ENDPOINTS.PAGES}`,
      PAGE_QUERY_PARAMS
    );

    return Response.json({ data: pages, error: null });
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

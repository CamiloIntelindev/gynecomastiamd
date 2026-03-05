import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS, SINGLE_POST_QUERY_PARAMS } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const apiEndpoint = process.env.NEXT_PUBLIC_API_ENDPOINT;
    const id = params.id;

    if (!apiEndpoint) {
      return Response.json(
        { error: 'API endpoint not configured' },
        { status: 500 }
      );
    }

    const post = await fetchWordPressAPI(
      `${apiEndpoint}${ENDPOINTS.POSTS}/${id}`,
      SINGLE_POST_QUERY_PARAMS
    );

    return Response.json({ data: post, error: null });
  } catch (error) {
    console.error('Error fetching post:', error);
    return Response.json(
      {
        error: 'Failed to fetch post',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

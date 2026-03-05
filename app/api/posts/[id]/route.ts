import { fetchWordPressAPI } from '@/lib/graphql';
import { ENDPOINTS, SINGLE_POST_QUERY_PARAMS } from '@/lib/queries';

export const dynamic = 'force-dynamic';

export async function GET(
  _request: Request,
  props: { params: Promise<{ id: string }> }
) {
  try {
    const params = await props.params;
    const id = params.id;

    const queryParams = new URLSearchParams();
    Object.entries(SINGLE_POST_QUERY_PARAMS).forEach(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach(v => queryParams.append(key, v));
      } else {
        queryParams.append(key, String(value));
      }
    });

    const data = await fetchWordPressAPI(
      `${ENDPOINTS.POSTS}/${id}?${queryParams.toString()}`
    );

    return Response.json({ data, error: null });
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

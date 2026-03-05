/**
 * Cliente GraphQL para consultar WPGraphQL
 */

interface GraphQLResponse<T> {
  data?: T;
  errors?: Array<{ message: string }>;
}

export async function fetchGraphQL<T>(
  query: string,
  variables?: Record<string, any>
): Promise<T> {
  const endpoint = process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT;
  
  if (!endpoint) {
    throw new Error('NEXT_PUBLIC_GRAPHQL_ENDPOINT is not defined');
  }

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // Agregar autenticación Basic si están disponibles las credenciales
  if (process.env.GRAPHQL_USERNAME && process.env.GRAPHQL_PASSWORD) {
    const credentials = btoa(
      `${process.env.GRAPHQL_USERNAME}:${process.env.GRAPHQL_PASSWORD}`
    );
    headers['Authorization'] = `Basic ${credentials}`;
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables: variables || {},
    }),
  });

  if (!response.ok) {
    throw new Error(
      `GraphQL request failed with status ${response.status}: ${response.statusText}`
    );
  }

  const result: GraphQLResponse<T> = await response.json();

  if (result.errors) {
    console.error('GraphQL errors:', result.errors);
    throw new Error(
      `GraphQL error: ${result.errors.map((e) => e.message).join(', ')}`
    );
  }

  if (!result.data) {
    throw new Error('No data returned from GraphQL query');
  }

  return result.data;
}

/**
 * WordPress REST API client for fetching posts, pages and other content
 */

export interface WordPressError {
  code: string;
  message: string;
  data?: {
    status: number;
  };
}

export interface WordPressResponse<T> {
  data?: T;
  error?: WordPressError;
}

/**
 * Make a request to the WordPress REST API with Basic authentication
 */
export async function fetchWordPressAPI<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const apiBase = process.env.NEXT_PUBLIC_API_ENDPOINT;

  if (!apiBase) {
    throw new Error('NEXT_PUBLIC_API_ENDPOINT is not defined');
  }

  const url = `${apiBase}${endpoint}`;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(options.headers as Record<string, string>),
  };

  // Add Basic authentication if credentials are available
  if (process.env.API_USERNAME && process.env.API_PASSWORD) {
    const credentials = btoa(`${process.env.API_USERNAME}:${process.env.API_PASSWORD}`);
    headers['Authorization'] = `Basic ${credentials}`;
  }

  try {
    const response = await fetch(url, {
      ...options,
      headers,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        `API request failed with status ${response.status}: ${
          errorData.message || response.statusText
        }`
      );
    }

    const data = await response.json();
    return data as T;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    throw error;
  }
}


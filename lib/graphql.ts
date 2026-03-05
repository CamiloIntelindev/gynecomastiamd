/**
 * Cliente REST API de WordPress para consumir posts, páginas y otros contenidos
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
 * Hacer una request a la API REST de WordPress con autenticación Basic
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

  // Agregar autenticación Basic si están disponibles las credenciales
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


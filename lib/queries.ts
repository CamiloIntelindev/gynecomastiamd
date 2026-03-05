/**
 * Endpoints y parámetros de la API REST de WordPress
 */

export const ENDPOINTS = {
  POSTS: '/posts',
  PAGES: '/pages',
  CATEGORIES: '/categories',
  SITE: '/settings',
};

/**
 * Parámetros comunes para queries de posts
 */
export const POST_QUERY_PARAMS = {
  per_page: 10,
  orderby: 'date',
  order: 'desc',
  _fields: ['id', 'title', 'excerpt', 'slug', 'date', 'featured_image', 'status'],
};

/**
 * Parámetros para obtener un post individual
 */
export const SINGLE_POST_QUERY_PARAMS = {
  _fields: [
    'id',
    'title',
    'content',
    'excerpt',
    'slug',
    'date',
    'featured_image',
    'author',
    'categories',
    'tags',
  ],
};


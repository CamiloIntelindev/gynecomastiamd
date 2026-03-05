/**
 * Endpoints and parameters for the WordPress REST API
 */

export const ENDPOINTS = {
  POSTS: '/posts',
  PAGES: '/pages',
  CATEGORIES: '/categories',
  SITE: '/settings',
};

/**
 * Common parameters for posts queries
 */
export const POST_QUERY_PARAMS = {
  per_page: 10,
  orderby: 'date',
  order: 'desc',
  _fields: ['id', 'title', 'excerpt', 'slug', 'date', 'featured_image', 'status'],
};

/**
 * Parameters for fetching a single post
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


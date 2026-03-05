import fs from 'fs';
import path from 'path';

export interface LocalPage {
  id: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  order: number;
  published: boolean;
}

const PAGES_DIRECTORY = path.join(process.cwd(), 'content', 'pages');

/**
 * Get all published pages sorted by order
 */
export function getAllPages(): LocalPage[] {
  try {
    if (!fs.existsSync(PAGES_DIRECTORY)) {
      return [];
    }

    const files = fs.readdirSync(PAGES_DIRECTORY);
    const pages: LocalPage[] = [];

    files.forEach((file) => {
      if (file.endsWith('.json')) {
        const filePath = path.join(PAGES_DIRECTORY, file);
        const fileContent = fs.readFileSync(filePath, 'utf-8');
        const page: LocalPage = JSON.parse(fileContent);

        if (page.published) {
          pages.push(page);
        }
      }
    });

    // Sort by order
    pages.sort((a, b) => a.order - b.order);
    return pages;
  } catch (error) {
    console.error('Error reading pages:', error);
    return [];
  }
}

/**
 * Get a single page by slug
 */
export function getPageBySlug(slug: string): LocalPage | null {
  try {
    const pages = getAllPages();
    return pages.find((page) => page.slug === slug) || null;
  } catch (error) {
    console.error('Error finding page:', error);
    return null;
  }
}

/**
 * Get page by id
 */
export function getPageById(id: string): LocalPage | null {
  try {
    const filePath = path.join(PAGES_DIRECTORY, `${id}.json`);
    if (!fs.existsSync(filePath)) {
      return null;
    }

    const fileContent = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading page:', error);
    return null;
  }
}

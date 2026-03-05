export const dynamic = 'force-dynamic';

import { getAllPages } from '@/lib/pages';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

export async function GET() {
  try {
    // Get local pages
    const pages = getAllPages();

    // Convert pages to menu items
    const menuItems: MenuItem[] = [
      { id: 'home', label: 'Home', href: '/' },
      ...pages.map((page) => ({
        id: page.id,
        label: page.title,
        href: `/${page.slug}`,
      })),
    ];

    // Add hardcoded items that don't have local pages (yet)
    const specialItems: MenuItem[] = [
      { id: 'gallery', label: 'Gallery', href: '/gallery' },
      { id: 'blog', label: 'Blog', href: '/blog' },
    ];

    // Merge and remove duplicates
    const allItems = [...menuItems];
    specialItems.forEach((item) => {
      if (!allItems.find((m) => m.id === item.id)) {
        allItems.push(item);
      }
    });

    return Response.json({ data: allItems, error: null });
  } catch (error) {
    console.error('Error fetching menu:', error);
    return Response.json(
      {
        error: 'Failed to fetch menu',
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

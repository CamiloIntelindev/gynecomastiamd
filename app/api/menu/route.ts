export const dynamic = 'force-dynamic';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

export async function GET() {
  try {
    // Menu items based on WordPress Main menu structure
    // Can be dynamically fetched from WordPress menu API in the future
    const menuItems: MenuItem[] = [
      { id: '1', label: 'Home', href: '/' },
      { id: '2', label: 'Gallery', href: '/gallery' },
      { id: '3', label: 'ChestSculpt®', href: '/chestsculpt' },
      { id: '4', label: 'Bodybuilder Gynecomastia', href: '/bodybuilder-gynecomastia' },
      { id: '5', label: 'Gynecomastia FAQ', href: '/gynecomastia-faq' },
      { id: '6', label: 'Male Puffy Nipples', href: '/male-puffy-nipples' },
      { id: '7', label: 'Pseudogynecomastia', href: '/pseudogynecomastia' },
      { id: '8', label: 'Teenage Gynecomastia', href: '/teenage-gynecomastia' },
      { id: '9', label: 'Gynecomastia Videos', href: '/gynecomastia-videos' },
      {
        id: '10',
        label: 'About Us',
        href: '#',
        children: [
          { id: '10.1', label: 'Dr. Marc A. Adajar', href: '/dr-marc-a-adajar' },
          { id: '10.2', label: 'Dr. Anh-Tuan Truong', href: '/dr-anh-tuan-truong' },
        ],
      },
      { id: '11', label: 'Contact Us', href: '/contact-us' },
      { id: '12', label: 'Privacy Policy', href: '/privacy-policy' },
    ];

    return Response.json({ data: menuItems, error: null });
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

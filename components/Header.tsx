'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

interface MenuItem {
  id: string;
  label: string;
  href: string;
  children?: MenuItem[];
}

export default function Header() {
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await fetch('/api/menu');
        const data = await response.json();
        if (data.data) {
          setMenuItems(data.data);
        }
      } catch (error) {
        console.error('Error fetching menu:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);

  return (
    <header className="bg-blue-600 text-white sticky top-0 z-50 shadow-lg">
      <nav className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="font-bold text-xl hover:text-blue-100">
            Gynecomastia MD
          </Link>

          {/* Desktop Menu */}
          <ul className="hidden md:flex gap-1">
            {loading ? (
              <li className="text-sm text-blue-100">Loading...</li>
            ) : (
              menuItems.map((item) => (
                <li key={item.id} className="relative group">
                  <Link
                    href={item.href}
                    className="px-4 py-2 rounded hover:bg-blue-700 transition-colors whitespace-nowrap flex items-center gap-2"
                  >
                    {item.label}
                    {item.children && item.children.length > 0 && (
                      <span className="text-xs">▼</span>
                    )}
                  </Link>

                  {/* Dropdown submenu */}
                  {item.children && item.children.length > 0 && (
                    <ul className="absolute left-0 mt-0 w-max bg-blue-700 rounded shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                      {item.children.map((child) => (
                        <li key={child.id}>
                          <Link
                            href={child.href}
                            className="block px-4 py-2 hover:bg-blue-800 transition-colors whitespace-nowrap"
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))
            )}
          </ul>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-xl">☰</button>
        </div>
      </nav>
    </header>
  );
}

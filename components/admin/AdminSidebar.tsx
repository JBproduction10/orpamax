'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, ChevronUp } from 'lucide-react';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (section: string) => {
    setOpenDropdown(prev => (prev === section ? null : section));
  };

  const navItems = [
    {
      title: 'Edit Translation Services',
      key: 'translation',
      links: [
        { href: '/admin/dashboard/translation-services/hero', label: 'Hero Section' },
        { href: '/admin/dashboard/translation-services/faq', label: 'Manage Translation FAQ' },
        { href: '/admin/dashboard/translation-services/languages', label: 'Manage Languages' },
        { href: '/admin/dashboard/translation-services/services', label: 'Manage Services' },
        { href: '/admin/dashboard/translation-services/translation-options', label: 'Manage Translation Options' },
      ],
    },
    {
      title: 'Edit Cleaning Services',
      key: 'cleaning',
      links: [
        { href: '/admin/dashboard/cleaning-services/hero', label: 'Hero Section' },
        { href: '/admin/dashboard/cleaning-services/checklist', label: 'Checklist' },
        { href: '/admin/dashboard/cleaning-services/packages', label: 'Packages' },
        { href: '/admin/dashboard/cleaning-services/services', label: 'Services' },
      ],
    },
    {
      title: 'Edit About Us',
      key: 'about',
      links: [
        { href: '/admin/dashboard/about-us', label: 'About Us' },
      ],
    },
    {
      title: 'Edit Contact Section',
      key: 'contact',
      links: [
        { href: '/admin/dashboard/contact-us/contact-info', label: 'Manage Contact Info' },
        { href: '/admin/dashboard/contact-us/business-info', label: 'Manage Business Info' },
      ],
    },
    {
      title: 'Site Settings',
      key: 'settings',
      links: [
        { href: '/admin/dashboard/home/hero', label: 'Home Hero Section' },
        { href: '/admin/dashboard/home/home-services', label: 'Home Our Services Section' },
        { href: '/admin/dashboard/footer', label: 'Footer Section' },
      ],
    },
  ];

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-gray-900 text-white p-2 h-10">
        {/* <h1 className="text-lg font-semibold">Dashboard</h1> */}
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={24} />
        </button>
      </div>

      {/* Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-transparent md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed top-0 left-0 z-50 h-screen w-64 bg-gray-900 text-white transform transition-transform duration-300 ease-in-out
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:static md:block
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-700 md:hidden">
          <span className="text-xl font-semibold">Menu</span>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        {/* Desktop title */}
        <div className="hidden md:block px-6 py-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Admin Dashboard</h2>
        </div>

        {/* Nav Items */}
        <ul className="mt-4 space-y-2 px-4 pb-10">
          {navItems.map(({ title, key, links }) => (
            <li key={key}>
              <button
                onClick={() => toggleDropdown(key)}
                className="flex justify-between items-center w-full text-left text-sm font-medium hover:text-blue-400 focus:outline-none"
              >
                <span>{title}</span>
                {openDropdown === key ? (
                  <ChevronUp size={16} />
                ) : (
                  <ChevronDown size={16} />
                )}
              </button>
              <ul
                className={`mt-2 pl-4 space-y-1 overflow-hidden transition-all duration-300 ease-in-out ${openDropdown === key ? 'max-h-40' : 'max-h-0'
                  }`}
              >
                {links.map(({ href, label }) => (
                  <li key={href}>
                    <Link
                      href={href}
                      className="block py-1 text-sm text-gray-300 hover:text-blue-400 transition-colors"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default Sidebar;

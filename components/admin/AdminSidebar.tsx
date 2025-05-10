'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleDropdown = (section: string) => {
    setOpenDropdown(prev => (prev === section ? null : section));
  };

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 h-full bg-gray-800 text-white flex justify-between items-center">
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`
          fixed md:static top-0 left-0 h-full w-64 bg-gray-800 text-white p-6 z-50 transform transition-transform duration-300
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
          md:translate-x-0 md:block md:h-dvh
        `}
      >
        {/* Mobile Close */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-8 hidden md:block">Admin Dashboard</h2>
        <ul>
         {/* Edit translation Section */}
         <li className="mb-6">
            <button
              onClick={() => toggleDropdown('translation')}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Edit Translation Services {openDropdown === 'translation' ? '▲' : '▼'}
            </button>
            {openDropdown === 'translation' && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/translation-services" className="text-white hover:text-blue-400">Translation Services</Link>
                </li>
              </ul>
            )}
          </li>
          {/* Edit Cleaning services Section */}
          <li className="mb-6">
            <button
              onClick={() => toggleDropdown('cleaning')}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Edit Cleaning Services {openDropdown === 'cleaning' ? '▲' : '▼'}
            </button>
            {openDropdown === 'cleaning' && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/cleaning-services" className="text-white hover:text-blue-400">Cleaning Services</Link>
                </li>
              </ul>
            )}
          </li>
          {/* Edit About Section */}
          <li className="mb-6">
            <button
              onClick={() => toggleDropdown('about')}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Edit About Us {openDropdown === 'about' ? '▲' : '▼'}
            </button>
            {openDropdown === 'about' && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/about-us" className="text-white hover:text-blue-400">About Us</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Edit Contact Section */}
          <li className="mb-6">
            <button
              onClick={() => toggleDropdown('contact')}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Edit Contact Section {openDropdown === 'contact' ? '▲' : '▼'}
            </button>
            {openDropdown === 'contact' && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/contact-us" className="text-white hover:text-blue-400">Contact Us</Link>
                </li>
              </ul>
            )}
          </li>

          {/* Site Settings */}
          <li className="mb-2">
            <button
              onClick={() => toggleDropdown('settings')}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Site Settings {openDropdown === 'settings' ? '▲' : '▼'}
            </button>
            {openDropdown === 'settings' && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/home/hero" className="text-sm text-white hover:text-blue-400">Edit Home Hero Section</Link>
                </li>
                <li>
                  <Link href="/admin/dashboard/footer" className="text-sm text-white hover:text-blue-400">Edit Footer Section</Link>
                </li>
                {/* <li>
                  <Link href="/settings/security" className="text-sm text-white hover:text-blue-400">Security</Link>
                </li> */}
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

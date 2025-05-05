'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const Sidebar = () => {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden p-4 h-full bg-gray-800 text-white flex justify-between items-center">
        {/* <h2 className="text-xl font-bold">Admin Dashboard</h2> */}
        <button onClick={() => setIsSidebarOpen(true)}>
          <Menu size={12} />
        </button>
      </div>

      {/* Mobile Backdrop */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden"
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
        {/* Close Button (Mobile Only) */}
        <div className="flex justify-between items-center md:hidden mb-6">
          <h2 className="text-xl font-bold">Menu</h2>
          <button onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <h2 className="text-xl font-bold mb-8 hidden md:block">Admin Dashboard</h2>
        <ul>
          <li className="mb-6">
            <Link href="/admin/dashboard/translation-services" className="text-white hover:text-blue-400">Translation Services</Link>
          </li>
          <li className="mb-6">
            <Link href="/admin/dashboard/cleaning-services" className="text-white hover:text-blue-400">Cleaning Services</Link>
          </li>
          <li className="mb-6">
            <Link href="/products" className="text-white hover:text-blue-400">Products</Link>
          </li>
          <li className="mb-6">
            <Link href="/admin/dashboard/contact-us" className="text-white hover:text-blue-400">Contact Us</Link>
          </li>
          <li className="mb-2">
            <button
              onClick={() => setIsSettingsOpen(prev => !prev)}
              className="w-full text-left text-white hover:text-blue-400 focus:outline-none"
            >
              Site Settings {isSettingsOpen ? '▲' : '▼'}
            </button>
            {isSettingsOpen && (
              <ul className="mt-2 ml-4 space-y-2">
                <li>
                  <Link href="/admin/dashboard/home/hero" className="text-sm text-white hover:text-blue-400">Edit Home Hero Section</Link>
                </li>
                <li>
                  <Link href="/admin/dashboard/home/footer" className="text-sm text-white hover:text-blue-400">Edit Footer Section</Link>
                </li>
                <li>
                  <Link href="/settings/security" className="text-sm text-white hover:text-blue-400">Security</Link>
                </li>
              </ul>
            )}
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;

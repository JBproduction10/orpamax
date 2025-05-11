'use client'
// components/Header.tsx
import Link from 'next/link';
import React from 'react';
import { signOut } from 'next-auth/react';

const Header = () => {
  return (
    <div className="bg-white shadow-md p-4 flex justify-between items-center">
      <div className="text-2xl font-semibold md:flex hidden">Admin Panel</div>
      <div className="flex items-center space-x-4">
        <Link href="/" className="text-gray-600 hover:text-gray-900">Home</Link>
        <Link href="/translation-services" className="text-gray-600 hover:text-gray-900">Translation Services</Link>
        <Link href="/cleaning-services" className="text-gray-600 hover:text-gray-900">Cleaning Services</Link>
        <Link href="/contact-us" className="text-gray-600 hover:text-gray-900">Contact Us</Link>
        {/* <button className="text-gray-600 hover:text-gray-900">Notifications</button>
        <button className="text-gray-600 hover:text-gray-900">Profile</button> */}
        <button 
          onClick={() => signOut({ callbackUrl: '/' })}
          className="text-gray-600 hover:text-gray-900"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Header;

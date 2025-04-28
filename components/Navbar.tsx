"use client";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@radix-ui/react-select';
import React, { useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { usePathname } from "next/navigation";

const Navbar = () => {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };
      
    return (
        <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
            <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                <div className="flex items-center">
                    <Link href="/">
                        <Image
                            src="/orpamax/fulllogo_transparent.png"
                            alt="Company Logo"
                            width={200}
                            height={200}
                            quality={100}
                        />
                    </Link>
                    <Link href="/"><h1 className="text-xl font-bold text-blue-600">ORPAMAX</h1></Link>
                </div>
                {/* Nav Links */}
                <div className="hidden md:flex items-center space-x-6 text-lg">
                    <Link href="/" className={`${pathname === "/" ? "text-blue-700" : "text-gray-700"}`}>
                        Home
                    </Link>
                    <Link href="/translation-services" className={`${pathname === "/translation-services" ? "text-blue-700" : "text-gray-700"}`}>
                        Translation Services
                    </Link>
                    <Link href="/cleaning-services" className={`${pathname === "/cleaning-services" ? "text-blue-700" : "text-gray-700"}`}>
                        Cleaning Services
                    </Link>
                    <Link href="/contact-us" className={`${pathname === "/contact-us" ? "text-blue-700" : "text-gray-700"}`}>
                        Contact-Us
                    </Link>
                </div>
                {/* Language + Menu */}
                <div className="flex items-center space-x-4">
                    <Select defaultValue="english">
                        <SelectTrigger className="w-[120px] !rounded-button">
                            <SelectValue placeholder="Language" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="english">English</SelectItem>
                            <SelectItem value="spanish">Español</SelectItem>
                            <SelectItem value="french">Français</SelectItem>
                            <SelectItem value="german">Deutsch</SelectItem>
                            <SelectItem value="chinese">中文</SelectItem>
                        </SelectContent>
                    </Select>
                    <Button
                        variant="outline"
                        size="icon"
                        className="md:hidden !rounded-button whitespace-nowrap"
                        onClick={toggleMobileMenu}
                        id="mobile-menu-button"
                    >
                        <FaBars />
                    </Button>
                    {isMobileMenuOpen && (
                        <div className="absolute top-full left-0 right-0 bg-white shadow-lg md:hidden z-50">
                            <div className="p-4 space-y-2">
                                <Link
                                    href="/"
                                    data-readdy="true"
                                    className="block px-4 py-2 text-gray-600 hover:bg-blue-50 rounded-md transition-colors"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    Home
                                </Link>
                                <Link href="/translation-services"
                                    className="w-full justify-start rounded whitespace-nowrap"
                                >
                                    Translation Services
                                </Link>
                                <Link href="/cleaning-services"
                                    className="w-full justify-start !rounded-button whitespace-nowrap"
                                >
                                    Cleaning Services
                                </Link>
                                <Link href="/quotes"
                                    className="w-full justify-start !rounded-button whitespace-nowrap"
                                >
                                    Get A Quote
                                </Link>
                                <Link href="/contact-us"
                                    className="w-full justify-start !rounded-button whitespace-nowrap"
                                >
                                    Contact Us
                                </Link>
                            </div>
                            </div>
                    )}
                </div>
            </div>
        </header>
    );
};

export default Navbar;

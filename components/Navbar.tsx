"use client";

import { useSession, signIn, signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FaBars } from "react-icons/fa";
import { Button } from "./ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@radix-ui/react-select";

const Navbar = () => {
  const pathname = usePathname();
  const { data: session } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session?.user) {
      if (pathname === "/sign-in" || pathname === "/login") {
        router.replace(session.user.role === "admin" ? "/admin/dashboard" : "/");
      }
    }
  }, [session, pathname, router]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/translation-services", label: "Translation Services" },
    { href: "/cleaning-services", label: "Cleaning Services" },
    { href: "/quotes", label: "Get A Quote" },
    { href: "/contact-us", label: "Contact Us" },
    { href: "/about-us", label: "About Us" },
  ];

  const toggleMobileMenu = () => setIsMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setIsMobileMenuOpen(false);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-2">
          <Link href="/">
            <Image
              src="/orpamax/fulllogo_transparent.png"
              alt="Company Logo"
              width={160}
              height={160}
            />
          </Link>
          <Link href="/">
            <h1 className="text-xl font-bold text-blue-600">ORPAMAX</h1>
          </Link>
        </div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6 text-lg">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`${
                pathname === href ? "text-blue-700 font-semibold" : "text-gray-700"
              } hover:text-blue-500 transition-colors`}
            >
              {label}
            </Link>
          ))}

          {/* User Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setShowDropdown(true)}
            onMouseLeave={() => setShowDropdown(false)}
          >
            <span className="text-gray-700 hover:text-blue-500 cursor-pointer">Account</span>
            {showDropdown && (
              <div className="absolute right-0 mt-0 w-40 bg-white border rounded shadow-lg z-50">
                {session ? (
                  <>
                    <Link
                      href={session.user.role === "admin" ? "/admin/dashboard" : "/profile"}
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => signOut()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      onClick={() => signIn()}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      Login
                    </button>
                    <Link
                      href="/sign-in"
                      className="block px-4 py-2 hover:bg-gray-100"
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
        </div>

        {/* Language Selector + Mobile Menu Button */}
        <div className="flex items-center space-x-4">
          <Select defaultValue="english">
            <SelectTrigger className="w-[120px] rounded-md border-gray-300">
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
            className="md:hidden rounded-md"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg border-t">
          <div className="flex flex-col p-4 space-y-2">
            {navLinks.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={closeMobileMenu}
                className={`block px-4 py-2 rounded-md text-base ${
                  pathname === href
                    ? "text-blue-700 font-semibold bg-blue-50"
                    : "text-gray-700"
                } hover:bg-blue-100 transition-colors`}
              >
                {label}
              </Link>
            ))}

            <div className="border-t mt-2 pt-2">
              {session ? (
                <>
                  <Link
                    href={session.user.role === "admin" ? "/admin/dashboard" : "/profile"}
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Profile
                  </Link>
                  <button
                    onClick={() => {
                      signOut({ callbackUrl: "/" });
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      signIn();
                      closeMobileMenu();
                    }}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                  >
                    Login
                  </button>
                  <Link
                    href="/sign-up"
                    onClick={closeMobileMenu}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import logo from "../../../SharedImages/icon.png";
import config from "../../../config.js";

const links = [
  {
    href: "/2_user-profile",
    label: "Profile",
  },
  {
    href: "/3_search-tool",
    label: "Search Tool",
  },
];

const UserProfileMain = () => {
  const searchParams = useSearchParams();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [searchParams]);

  return (
    <div className="flex h-screen bg-base-300">
      {/* Collapsible Sidebar */}
      <div className={`w-64 flex-shrink-0 ${isOpen ? "block" : "hidden"} lg:block`}>
        <div className="flex flex-col h-full bg-base-200">
          {/* Logo */}
          <div className="flex items-center justify-center h-16 mt-10 mb-5 px-6 bg-base-200">
            <Image src={logo} alt={`${config.appName} logo`} className="w-8" placeholder="blur" priority={true} />
            <span className="ml-3 text-2xl font-semibold">{config.appName}</span>
          </div>

          {/* Navigation Links */}
          <ul className="flex-1 px-6 py-4 overflow-y-auto">
            {links.map((link) => (
              <li key={link.href} className="mb-2">
                <Link href={link.href} className="block px-4 py-2 rounded hover:bg-base-300">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="flex items-center justify-between px-6 py-4 bg-base-300">
          <button
            type="button"
            className="lg:hidden p-2 rounded-md"
            onClick={() => setIsOpen(!isOpen)}
          >
            <span className="sr-only">Toggle navigation</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </button>
        </header>
        {/* Rest of your main content */}
      </div>
    </div>
  );
};

export default UserProfileMain;

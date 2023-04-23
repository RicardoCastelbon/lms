// components/Sidebar.tsx

import React, { useState } from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOutIcon, Settings, Menu, X, MenuIcon } from "lucide-react";


const Sidebar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };
  return (
    <>
      {/* Hamburger menu button */}
      <button
        className="fixed top-4 left-4 z-50 text-black md:hidden"
        onClick={toggleSidebar}
      >
        {/* <Menu size={24} /> */}
        <span className="sr-only">Menu</span>
        <svg
          className="h-6 w-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4 6h16M4 12h16M4 18h16"
          />
        </svg>
      </button>
      {/* Sidebar */}
      <div
        className={`fixed w-full h-full top-0 left-0 bg-white z-40 overflow-y-auto ${
          showSidebar ? "" : "hidden"
        } md:block md:w-1/5 md:h-auto`}
      >
        <div className="md:bg-purple-200 md:h-full md:pt-4 md:pb-6 md:px-4">
          <h2 className="text-lg font-semibold mb-4 mt-0 md:hidden">Admin Dashboard</h2>
          <ul className="flex flex-col gap-2 flex-grow mt-0">
            <li>
              <Link
                href="/admin/create-education"
                className="link text-black hover:text-purple-600 md:text-white md:hover:text-white"
              >
                Utbildning
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create-course"
                className="link text-black hover:text-white md:text-white md:hover:text-white"
              >
                Kurser
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create-module"
                className="link text-black hover:text-white md:text-white md:hover:text-white"
              >
                Moduler
              </Link>
            </li>
            <li>
              <Link
                href="/admin/create-exercise"
                className="link text-black hover:text-white md:text-white md:hover:text-white"
              >
                Tester
              </Link>
            </li>
          </ul>
          <div className="mt-auto flex flex-col">
            <div className="flex items-center mb-2">
              <Settings />
              <button className="btn btn-secondary ml-2">
                Inställningar
              </button>
            </div>
            <div className="flex items-center">
              <LogOutIcon />
              <button
                className="btn btn-secondary ml-2"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Logga ut
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Dark purple sidebar on desktop */}
      <div className="hidden md:block bg-purple-200 w-1/5 h-screen absolute top-0 left-0"></div>
    </>
  );
};

export default Sidebar;
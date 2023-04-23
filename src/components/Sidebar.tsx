// components/Sidebar.tsx

import React from "react";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { LogOutIcon, Settings } from "lucide-react";

const Sidebar = () => {
  return (
    <div className="bg-purple-200 w-full sm:w-1/5 p-4 flex flex-col h-screen">
      <h2 className="text-lg font-semibold mb-4 mt-0">Admin Dashboard</h2>
      <ul className="flex flex-col gap-2 flex-grow mt-0">
        <li>
          <Link href="/admin/create-education" className="link text-black hover:text-purple-600">
            Utbildning
          </Link>
        </li>
        <li>
          <Link href="/admin/create-course" className="link text-black hover:text-white">
            Kurser
          </Link>
        </li>
        <li>
          <Link href="/admin/create-module" className="link text-black hover:text-white">
            Moduler
          </Link>
        </li>
        <li>
          <Link href="/admin/create-exercise" className="link text-black hover:text-white">
            Tester
          </Link>
        </li>
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
      </ul>
    </div>
  );
};

export default Sidebar;

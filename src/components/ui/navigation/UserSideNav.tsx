import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Role } from "@prisma/client";
import { FileText, Users, BarChart2, Settings, LogOut } from "lucide-react";
type Props = {
  sideBarClass: boolean;
  role?: string | undefined | null; // Add this line
  admin?: string | null;
  education?: string | null;
};

const UserSideNav = ({ sideBarClass, role, education }: Props) => {
  // console.log(role);

  return (
    <nav
      /* h-[calc(100vh-2rem)] w-2/6 max-w-[364px] */
      className={` w-2/6 max-w-[364px] md:w-1/6 h-[calc(100vh-70px)] z-10 flex flex-col justify-between fixed -left-full  md:left-4 ${
        sideBarClass ? "left-0 top-[70px] p-4 h-[calc(100vh-70px)]" : ""
      } transition-left ease-in-out bg-primary md:bg-inherit md:text-secondary-foreground text-white`}
    >
      {/* nav top items */}
      <div className="flex flex-col gap-4">
        {role === Role.ADMIN ? (
          <>
            {/* Add links specific to the Admin role here */}
            <Link href="/admin/dashboard">Admin Dashboard</Link>
            <Link href="/admin/educations">Educations</Link>
            <Link href="/admin/courses">Courses</Link>
            <Link href="/admin/modules">Moduler</Link>
            <Link href="/admin/exercises">Exerscises</Link>
            {/* Add more links as needed */}
          </>
        ) : (
          <>
            <Link
              className="flex gap-2 items-center hover:text-primary"
              href={`/dashboard`}
            >
              <FileText />
              <span className="text-sm">Kurser</span>
            </Link>
            <Link
              className="flex gap-2 items-center hover:text-primary"
              href={`/dashboard`}
            >
              <Users />
              <span className="text-sm">Personer</span>
            </Link>
            {role === Role.STUDENT && (
              <Link
                className="flex gap-2 items-center hover:text-primary"
                href={`/dashboard`}
              >
                <BarChart2 />
                <span className="text-sm">Omdömen</span>
              </Link>
            )}
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-self-end">
        <Link
          className="flex gap-2 items-center hover:text-primary"
          href={`/dashboard`}
        >
          <Settings />
          <span className="text-sm">Inställningar</span>
        </Link>
        <button
          className=" flex items-center gap-2 border-none text-left hover:text-primary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          <LogOut />
          <span className="text-sm">Logga ut</span>
        </button>
      </div>
    </nav>
  );
};

export default UserSideNav;

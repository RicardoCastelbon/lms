import { signOut } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Role } from "@prisma/client";
type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;

};

const UserSideNav = ({ sideBarClass, role }: Props) => {
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
            <Link href="/admin/dashboard">
              Admin Dashboard
            </Link>
            <Link href="/admin/educations">
              Educations
            </Link>
            <Link href="/admin/courses">
              Courses
            </Link>
            <Link href="/admin/modules">
              Moduler
            </Link>
            <Link href="/admin/exercises">
              Exerscises
            </Link>
            {/* Add more links as needed */}
          </>
        ) : (
          <>
            <Link className="" href="/dashboard">
              Kurser
            </Link>
            <Link className="" href="/dashboard">
              Personer
            </Link>
            <Link className="" href="/dashboard">
              Omdömen
            </Link>
          </>
        )}
      </div>
      <div className="flex flex-col gap-4 justify-self-end">
        <Link className="" href="/dashboard">
          Inställningar
        </Link>
        <button
          className="border-none text-left"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logga ut
        </button>
        {/* <Link className="" href="/dashboard">
          Logga ut
        </Link> */}
      </div>
    </nav>
  );
};

export default UserSideNav;

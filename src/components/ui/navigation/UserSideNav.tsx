import Link from "next/link";
import React from "react";

type Props = {
  sideBarClass: boolean;
};

const UserSideNav = ({ sideBarClass }: Props) => {
  return (
    <nav
      /* h-[calc(100vh-2rem)] w-2/6 max-w-[364px] */
      className={` w-2/6 max-w-[364px] md:w-1/6 h-[calc(100vh-70px)] z-10 flex flex-col justify-between fixed -left-full  md:left-4 ${
        sideBarClass ? "left-0 top-[70px] p-4 h-[calc(100vh-70px)]" : ""
      } transition-left ease-in-out bg-primary md:bg-inherit md:text-secondary-foreground text-white`}
    >
      {/* nav top items */}
      <div className="flex flex-col gap-4">
        <Link className="" href="/dashboard">
          Kurser
        </Link>
        <Link className="" href="/dashboard">
          Personer
        </Link>
        <Link className="" href="/dashboard">
          Omdömen
        </Link>
      </div>
      {/* nav bottom items */}
      <div className="flex flex-col gap-4 justify-self-end">
        <Link className="" href="/dashboard">
          Inställningar
        </Link>
        <Link className="" href="/dashboard">
          Logga ut
        </Link>
      </div>
    </nav>
  );
};

export default UserSideNav;

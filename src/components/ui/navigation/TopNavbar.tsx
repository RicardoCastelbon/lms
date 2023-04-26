import { Menu } from "lucide-react";
import Link from "next/link";
import { Session } from "next-auth";
import React, { Dispatch, SetStateAction } from "react";

type Props = {
  session: Session | null;
  //   sideBarClass: boolean;
  setSideBarClass: Dispatch<SetStateAction<boolean>>;
};

const TopNavbar = ({ session, setSideBarClass }: Props) => {
  const menuClickHandler = () => {
    setSideBarClass((prev) => !prev);
  };
  return (
    <nav className="w-full h-[70px] z-10 flex justify-between fixed top-0 left-0 items-center px-4 md:hidden bg-primary">
      {/* Not sure the logo link has to be conditional - niclas */}
      {session?.user ? (
        <Link href="/dashboard">
          <h2>Logo</h2>
        </Link>
      ) : (
        <Link href="/">
          <h2>Logo</h2>
        </Link>
      )}
      <Menu
        className="hover:cursor-pointer"
        color="white"
        size={32}
        onClick={menuClickHandler}
      />
    </nav>
  );
};

export default TopNavbar;

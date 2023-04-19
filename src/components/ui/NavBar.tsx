import Link from "next/link";
import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className="w-full h-[70px] bg-primary text-primary-foreground px-8">
      <div className="h-full flex flex-row items-center justify-between">
        {/* Logo */}
        <div>
          <h3 className="font-mont">Logo goes here</h3>
        </div>

        {/* menu items */}
        <div className="flex gap-4">
          <Link className="font-popp hover:text-muted" href="/login">
            Login
          </Link>
          <Link className="font-popp hover:text-muted" href="/sign-up">
            Become a member
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

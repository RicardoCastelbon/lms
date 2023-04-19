import Link from "next/link";
import React from "react";

type Props = {};

const NavBar = (props: Props) => {
  return (
    <nav className="">
      <div className="">
        {/* Logo */}
        <div>Logo goes here</div>

        {/* menu items */}
        <div>
          <Link href="/login">Login</Link>
          <Link href="/signup">Become a member</Link>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;

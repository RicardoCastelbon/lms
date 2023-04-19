import React from "react";
import NavBar from "./NavBar";
import Footer from "./Footer";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return (
    <>
      <NavBar />
      <div className="w-full h-full">{children}</div>
      <Footer />
    </>
  );
};

export default Layout;

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
      <main className=" flex flex-col w-full min-h-screen font-popp">
        {children}
      </main>
      <Footer />
    </>
  );
};

export default Layout;

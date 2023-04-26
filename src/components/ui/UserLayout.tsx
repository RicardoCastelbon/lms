import React, { ReactNode, useEffect, useState } from "react";
import TopNavbar from "./navigation/TopNavbar";
import { useSession } from "next-auth/react";
import UserSideNav from "./navigation/UserSideNav";
import InnerMenu from "./navigation/InnerMenu";

type Props = {
  children: ReactNode;
  role?: string; // Add this line
};

const UserLayout = ({ children, role }: Props) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data: session } = useSession();

  //Remove open state for sidenav when screen width > 768px
  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        setScreenWidth(window.innerWidth);

        if (window.innerWidth > 768) {
          setSideBarClass(false);
        }
      }
    }
    window.addEventListener("resize", getScreenSize);

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenWidth]);
  return (
    <div className="w-full flex flex-col md:flex-row md:p-4 bg-layout font-mont">
      <TopNavbar session={session} setSideBarClass={setSideBarClass} />
      {/* sidenav */}
      <div className="h-[calc(100vh-2rem)] w-2/6 max-w-[364px] md:w-1/6">
        {/* Pass the role prop to the UserSideNav component */}
        <UserSideNav sideBarClass={sideBarClass} role={role} />
      </div>
      <main className="md:flex-1 absolute top-[70px] md:top-0 md:relative bg-white rounded-lg w-full p-4">
        {session?.user.role !== "ADMIN" && <InnerMenu />}
        {children}
      </main>
    </div>
  );
};

export default UserLayout;

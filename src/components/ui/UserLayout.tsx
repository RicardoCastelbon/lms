import React, { ReactNode, useEffect, useState } from "react";
import TopNavbar from "./navigation/TopNavbar";
import { useSession } from "next-auth/react";
import Link from "next/link";
import UserSideNav from "./navigation/UserSideNav";
import { User } from "lucide-react";
import InnerMenu from "./navigation/InnerMenu";

type Props = {
  children: ReactNode;
};

const UserLayout = ({ children }: Props) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data } = useSession();

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
      <TopNavbar data={data} setSideBarClass={setSideBarClass} />
      {/* sidenav */}
      <div className="h-[calc(100vh-2rem)] w-2/6 max-w-[364px] md:w-1/6">
        <UserSideNav sideBarClass={sideBarClass} />
      </div>
      <main className="md:flex-1 absolute top-[70px] md:top-0 md:relative bg-white rounded-lg h-[1500px] w-full p-4">
        <InnerMenu />
        {/* <nav className="w-full flex justify-between items-center border-b mb-4">
          <div className="flex gap-2">
            <Link className="hover:text-primary" href="">
              <h2>Uppgifter</h2>
            </Link>
            <Link className="hover:text-primary" href="students">
              <h2>Personer</h2>
            </Link>
            <Link className="hover:text-primary" href="course-info">
              <h2>Kursinformation</h2>
            </Link>
          </div>
          Profile icon + text
          <div className="flex items-center gap-2">
            <div className=" border-[1px] rounded-full p-1">
              <User height="24px" width="24px" strokeWidth="1" />
            </div>
            <div>
              <p className="text-sm font-medium">John Doe</p>
              <span className="text-xs">Student</span>
            </div>
          </div>
        </nav> */}
        {children}
      </main>
    </div>
  );
};

export default UserLayout;

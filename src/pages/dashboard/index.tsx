import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";
import Link from "next/link";
import { Menu } from "lucide-react";
import { log } from "console";
import { useEffect, useState } from "react";

/* export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
}); */

const Dashboard: NextPage = () => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data } = useSession();
  console.log(data);

  useEffect(() => {
    console.log("sidebarclass", sideBarClass);
  }, [sideBarClass]);

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

  const menuClickHandler = () => {
    setSideBarClass((prev) => !prev);
  };

  return (
    <>
      {/* pagewrapper */}
      <div className="w-full flex flex-col md:flex-row md:p-4 bg-layout font-mont">
        {/* sidebar wrapper */}
        {/* <div className=""> */}
        {/* mobile nav */}
        <nav className="w-full h-[70px] flex justify-between items-center px-4 md:hidden bg-primary">
          {/* Not sure the logo link has to be conditional - niclas */}
          {data?.user ? (
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
        {/* sidenav */}
        <nav
          className={`h-[calc(100vh-2rem)] w-1/6 max-w-[364px] flex flex-col justify-between fixed -left-full md:relative md:left-0 ${
            sideBarClass ? "left-0 top-[70px] p-4 h-[calc(100vh-70px)]" : ""
          } transition-left ease-in-out`}
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
        {/* </div> */}
        {/* main content */}
        <main className="flex-1 bg-white rounded-lg h-[1500px] w-full"></main>
      </div>
      {/*  <button
              className="btn btn-secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button> */}
    </>
  );
};

export default Dashboard;

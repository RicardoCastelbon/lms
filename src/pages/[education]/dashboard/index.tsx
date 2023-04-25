import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { useEffect, useState } from "react";
// import TopNavbar from "@/src/components/ui/navigation/TopNavbar";
import UserLayout from "@/src/components/ui/UserLayout";

const Dashboard: NextPage = () => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data } = useSession();
  // console.log(data);

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

  return (
    <UserLayout>
      <h1>I am page</h1>
    </UserLayout>
  );
};

/* getServerSideProps */
export default Dashboard;

import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { IconContext } from "react-icons";

import { Context, useEffect, useState } from "react";
// import TopNavbar from "@/src/components/ui/navigation/TopNavbar";
import UserLayout from "@/src/components/ui/UserLayout";
import { useRouter } from "next/router";
import { AuthOptions, Session, getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
import { Button } from "@/src/components/ui/button";
import { FaHtml5 } from "react-icons/fa";

const Dashboard: NextPage = () => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data: session } = useSession();
  const router = useRouter();
  // console.log(session);

  useEffect(() => {
    console.log(session);

    // console.log("sidebarclass", sideBarClass);
    if (!session) {
      router.push("/401");
    }
  }, [session]);

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
    <IconContext.Provider value={{ className: "text-primary " }}>
      <UserLayout>
        <div className="w-full flex">
          {/* Main content */}
          <div className="w-full flex-col md:flex-row md:flex-wrap md:w-4/6 h-full bg-blue">
            {/* course card */}
            <div className="w-[232px] h-[300px] shadow-lg flex flex-col rounded-lg p-2">
              {/* card header */}
              <div className="flex flex-1 justify-center items-center">
                <FaHtml5 size="4em" />
              </div>
              {/* card body */}
              <div className="flex flex-col gap-2">
                <h2>Frontend-utveckling</h2>
                <p>Uppgifter</p>
                <p>14</p>
                <Button className="pointer-cursor">Till kurs</Button>
              </div>
            </div>
          </div>
          {/* Aside right */}
          <aside className="flex-1 bg-green"></aside>
        </div>
      </UserLayout>
    </IconContext.Provider>
  );
};

/* getServerSideProps */
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        nextAuthOptions
      ),
    },
  };
};
export default Dashboard;

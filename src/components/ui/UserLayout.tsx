import React, { ReactNode, useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import UserSideNav from "./navigation/UserSideNav";
import InnerMenu from "./navigation/InnerMenu";
import TopNavbar from "./navigation/TopNavbar";
import { serverRouter } from "@/src/server/routers";
import { trpc } from "@/src/common/trpc";
import { getEducationById } from "@/src/lib/services/education";

type Props = {
  children: ReactNode;
  role?: string | undefined | null; // Add this line
};

const UserLayout = ({ children, role }: Props) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [eduName, setEduName] = useState<string>("");
  const { data: session } = useSession();

  //Fetch education info
  const educationId = String(session?.user?.educationId);
  const { data, error, isLoading } = trpc.education.getOne.useQuery({
    educationId,
  });

  useEffect(() => {
    //Do something if loading is true
    if (isLoading) {
      console.log("query is loading");
    } else {
      //check if an error has occured
      if (error) {
        console.log(error);
      }
      //else check if data is present, if so do something with it.
      if (data) {
        setEduName(data?.education?.name); //Why is education optional?
      }
    }
  }, [data, error, isLoading]);

  useEffect(() => {
    console.log(eduName);
  }, [eduName]);
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
        <UserSideNav
          sideBarClass={sideBarClass}
          role={role}
          education={eduName}
        />
      </div>
      <main className="md:flex-1 absolute top-[70px] md:top-0 md:relative bg-white rounded-lg w-full p-4">
        {session?.user?.role !== "ADMIN" && (
          <InnerMenu educationName={eduName} />
        )}
        {children}
      </main>
    </div>
  );
};
export default UserLayout;

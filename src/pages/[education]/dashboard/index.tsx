import type { GetServerSideProps, NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { Context, useEffect, useState } from "react";
// import TopNavbar from "@/src/components/ui/navigation/TopNavbar";
import UserLayout from "@/src/components/ui/UserLayout";
import { useRouter } from "next/router";
import { AuthOptions, Session, getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";

const Dashboard: NextPage = ({ session }: any) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data } = useSession();
  const router = useRouter();
  console.log(session);

  useEffect(() => {
    console.log(data);

    // console.log("sidebarclass", sideBarClass);
    /*  if (!data) {
      router.push("/401");
    } */
  }, [data]);

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
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );
  console.log(session);

  return {
    props: {
      /* session: await getServerSession(
        context.req,
        context.res,
        nextAuthOptions
      ), */
    },
  };
};
export default Dashboard;

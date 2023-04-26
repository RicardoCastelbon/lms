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
import Link from "next/link";
import CourseCard from "@/src/components/ui/cards/CourseCard";
const courses = [
  {
    id: 1,
    name: "Frontend-utveckling",
    exercises: 14,
    slug: "frontend-utveckling",
  },
  {
    id: 2,
    name: "Backend-utveckling",
    exercises: 12,
    slug: "backend-utveckling",
  },
  {
    id: 3,
    name: "UX-Design",
    exercises: 14,
    slug: "ux-design",
  },
];
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
          <div className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-5/6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
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

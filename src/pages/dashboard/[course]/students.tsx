import UserLayout from "@/src/components/ui/UserLayout";
import { GetServerSideProps } from "next";
import { createContext } from "@/src/server/context";
import { serverRouter } from "@/src/server/routers";
import React, { useEffect, useState } from "react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { User } from "@prisma/client";
import { getSession, useSession } from "next-auth/react";
import { UserCheck } from "lucide-react";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
type Props = {
  users: User[];
};

const students = ({ users }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();

  const { data: session } = useSession();

  useEffect(() => {
    if (window.innerWidth > 768) {
      setdesktopVersion(true);
    } else {
      setdesktopVersion(false);
    }
  }, []);

  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        if (window.innerWidth > 768) {
          setdesktopVersion(true);
        } else {
          setdesktopVersion(false);
        }
      }
    }
    window.addEventListener("resize", getScreenSize);
    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenWidth]);

  return (
    <UserLayout role={session?.user?.role}>
      <div className="flex flex-col">
        <h1 className="text-2xl font-bold mb-4">Student översikt</h1>

        {/*  Teacher view */}
        {session?.user?.role === "TEACHER" && (
          <section className="">
            <div className="w-full mb-3">
              <ul className="flex font-medium text-slate-400">
                <li className="md:w-56 pl-2">Namn</li>
                {desktopVersion && (
                  <li className="w-56">Inlämningsuppgifter</li>
                )}
                {desktopVersion && <li className="w-56">Övningar</li>}
                {desktopVersion && <li className="w-32">Slutprov</li>}
                {desktopVersion && <li>Betyg</li>}
              </ul>
            </div>
            {users &&
              users.map((user: User) => (
                <ul
                  key={user.id}
                  className="flex font-medium py-5 pl-2 cursor-pointer hover:bg-purple-100"
                >
                  <li className="md:w-56">
                    {user.firstName} {user.lastName}
                  </li>
                  {desktopVersion && (
                    <li className="w-56 flex gap-5">
                      <div className="w-28 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                      <span>3/5</span>
                    </li>
                  )}
                  {desktopVersion && (
                    <li className="w-56 flex gap-5">
                      <div className="w-28 h-6 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700"></div>
                      <span>3/5</span>
                    </li>
                  )}
                  {desktopVersion && <li className="w-32">VG</li>}
                  {desktopVersion && <li>VG</li>}
                </ul>
              ))}
          </section>
        )}

        {/*  Student view */}
        {session?.user?.role === "STUDENT" && (
          <section className="">
            <div className="w-full mb-3">
              <ul className="flex font-medium text-slate-400">
                <li className="md:w-56 pl-2">Namn</li>
                {desktopVersion && (
                  <li className="w-56">Inlämningsuppgifter</li>
                )}
                {desktopVersion && <li className="w-56">Övningar</li>}
                {desktopVersion && <li className="w-32">Slutprov</li>}
                {desktopVersion && <li>Betyg</li>}
              </ul>
            </div>
            {users &&
              users.map((user: User) => (
                <ul key={user.id} className="flex font-medium py-5 pl-2 ">
                  <li className="md:w-56">
                    {user.firstName} {user.lastName}
                  </li>
                  {/*  {desktopVersion && (
                    <li className="w-56">
                      <div className="w-28 h-6 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
                    </li>
                  )} */}
                  {/*  {desktopVersion && (
                    <li className="w-56">
                      <div className="w-28 h-6 rounded-full bg-gradient-to-r from-cyan-600 to-blue-700"></div>
                    </li>
                  )} */}
                  {/* {desktopVersion && <li className="w-32">VG</li>} */}
                  {/*  {desktopVersion && <li>VG</li>} */}
                </ul>
              ))}
          </section>
        )}
      </div>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  // const session = await getSession(context);
  const currentSession = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  console.log("session?.user?.educationId", currentSession?.user.educationId);

  const educationId = String(currentSession?.user.educationId);

  const res = await helpers.users.getManyByEducationId.fetch({
    educationId: educationId,
  });

  const students = JSON.parse(JSON.stringify(res.students));
  return {
    props: {
      session: educationId,
      users: students || null,
    },
  };
};

export default students;

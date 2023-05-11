import UserLayout from "@/src/components/ui/UserLayout";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { createContext } from "@/src/server/context";
import { serverRouter } from "@/src/server/routers";
import { nextAuthOptions } from "@/src/common/auth";
import React from "react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { useSession } from "next-auth/react";
import { User } from "@prisma/client";
import { trpc } from "@/src/common/trpc";
import { getSession } from "next-auth/react";

type Props = {
  users?: User[];
};

const students = (props: Props) => {

  // const students = () => {
  //   const [session] = useSession();
  //   const trcp = createClient(serverRouter)
  // }
  return (

    <UserLayout>
    <div className="flex flex-col">
      <h1 className="text-2xl font-bold mb-4">Student översikt</h1>
      <div className="flex flex-col sm:flex-row items-center font-bold text-lg mb-4">
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0">Deltagare</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Inlämningsuppgifter</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Övningar</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Slutprov</div>
        <div className="w-full sm:w-1/4 mb-2 sm:mb-0 hidden sm:block">Betyg</div>
      </div>
      <div className="flex flex-col">
      <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 lg:grid-cols-3 gap-4">
      {props.users && 
      props.users.map((user: User) => (
        <p key={user.id}>{user.firstName}</p>
        ))}
    </div>
        {/* {students.map((student) => (
          <div key={student.id} className="rounded-lg shadow-md p-4 bg-white mb-4 sm:mb-0 sm:shadow-none sm:bg-transparent">
            <div className="flex flex-col sm:flex-row items-center mb-4">
              <div className="w-full sm:w-1/4 flex items-center mb-2 sm:mb-0">
                <img
                  className="w-8 h-8 rounded-full mr-2"
                  src={student.avatar}
                  alt={student.name}
                />
                <div className="font-bold">{student.name}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Inlämningsuppgifter</div>
                <div className="bg-blue-400 h-2 w-24 rounded-md"></div>
                <div className="text-sm text-gray-500">{student.inlämningsuppgifter}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Övningar</div>
                <div className="bg-purple-400 h-2 w-12 rounded-md"></div>
                <div className="text-sm text-gray-500">{student.exersices}</div>
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Slutprov</div>
                {student.final}
              </div>
              <div className="w-full sm:w-1/4 mb-2 sm:mb-0">
                <div className="sm:hidden font-bold mb-1">Betyg</div>
                {student.grade}
              </div>
            </div>
          </div>
        ))} */}
      </div>
    </div>
  </UserLayout>

);

};
/* getServerSideProps */

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const session = await getSession(context);

  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  const educationId = String(session?.user?.educationId);

  const res = await helpers.users.getManyByEducationId.fetch({
    educationId: educationId,
  });

  const students = JSON.parse(JSON.stringify(res?.students)) || null;

  return {
    props: {
      session: educationId,
      users: students?.students || null,
    },
  };
};

export default students;

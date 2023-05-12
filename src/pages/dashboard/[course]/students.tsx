import UserLayout from "@/src/components/ui/UserLayout";
import { GetServerSideProps } from "next";
import { createContext } from "@/src/server/context";
import { serverRouter } from "@/src/server/routers";
import React from "react";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { User } from "@prisma/client";
import { getSession } from "next-auth/react";

type Props = {
  users: User[];
};

const students = (props: Props) => {
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
        <div className="grid grid-cols-1 justify-items-start md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="text-left mb-2 sm:mb-0">
  {props.users &&
    props.users.map((user: User) => (
      <p key={user.id} className="mb-2">
        {user.firstName} <strong>{user.lastName}</strong>
      </p>
    ))}
</div>


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
  
  const students = JSON.parse(JSON.stringify(res.students));
  return {
    props: {
      session: educationId,
      users: students || null,
    },
  };
};

export default students;

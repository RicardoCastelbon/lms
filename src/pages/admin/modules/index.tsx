import CreateCourseForm from "@/src/components/ui/forms/teacher/CreateCourseForm";
import Modal from "@/src/components/ui/modals/Modal";
import UserLayout from "@/src/components/ui/UserLayout";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import Layout from "@/src/components/ui/Layout";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import { CalendarIcon, Plus, PlusIcon } from "lucide-react";
import CreateCourseAdminForm from "@/src/components/ui/forms/admin/CreateCourseAdminForm";
import RichText from "@/src/components/ui/text-editor/RichText";
import { useQuill } from "react-quilljs";
import { IconContext } from "react-icons";
import AdminCreateCards from "@/src/components/ui/cards/AdminCreateCards";
import { getServerSession } from "next-auth";
import {  Course_lib, Module_lib } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSideProps, NextPage } from "next";
import { nextAuthOptions } from "@/src/common/auth";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { moduleLibId } from "@/src/common/validation/module-lib";
import CreateModuleAdminForm from "@/src/components/ui/forms/admin/CreateModuleAdminForm";
import AdminCreateModuleCards from "@/src/components/ui/cards/AdminCreateModuleCards";
type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string | null;
  modulesLibs?: Module_lib[];
  // courses?: Course_lib[];
  // entity?: any

};

const ModulesPage = (props: Props) => {
  const { data: session } = useSession();
  const { quill, quillRef } = useQuill();

  const [showModal, setShowModal] = useState<boolean>(false);

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <IconContext.Provider
  value={{
    className:
      "text-primary hover:text-indigo-50 hover:bg-primary hover:cursor-pointer rounded-sm",
  }}
>
  <UserLayout role={session?.admin?.role}>
    <div className="flex items-center mb-4">
      <input
        type="text"
        placeholder="Sök kurser här..."
        className="border border-gray-300 rounded-md py-2 px-3 w-80 mr-2 flex-grow"
      />
      <button className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary">
        Sök
      </button>
    </div>
    <div className="flex flex-col md:flex-row gap-8">
      {/* Main content */}
      <div className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* For modules */}
          {props.modulesLibs &&
            props.modulesLibs.map((moduleLib: Module_lib) => (
              <AdminCreateModuleCards
                key={moduleLib.id}
                moduleLib={moduleLib}
                />
            ))}
        </div>
      </div>

      <aside className="w-64">
        {/* quick-menu */}
        <div className="w-full p-2">
          {/* quick menu items */}
          <div
            className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
            onClick={modalClickHandler}
          >
            <div className="rounded-full bg-primary text-white p-2">
              <Plus />
            </div>
            <p>Lägg till Modal</p>
          </div>
        </div>
      </aside>
    </div>
  </UserLayout>
  <Modal
    header={"Skapa en modal"}
    showModal={showModal}
    setShowModal={setShowModal}
  >
  <CreateModuleAdminForm closeModal={() => setShowModal(false)} />
  </Modal>
</IconContext.Provider>

  );
};

/* getServerSideProps */
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const currentSession = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
    );
    console.log("Current Session", currentSession)
    //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });


  //Set up a trpc helper, needed for serverSide fetching
  console.log("Fetching module library with id:", moduleLibId);
  //The actual fetching

   const res = await helpers.moduleLib.getMany.fetch();
   console.log("res", res)
   console.log("Module library fetched:", res);
  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const moduleLib = JSON.parse(JSON.stringify(res));
  console.log(moduleLib);
  
  return {
    props: {
      session: currentSession,
      modulesLibs: moduleLib?.moduleLib || null,
    },
  };
};

export default ModulesPage;

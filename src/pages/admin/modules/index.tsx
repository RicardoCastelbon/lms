import Modal from "@/src/components/ui/modals/Modal";
import UserLayout from "@/src/components/ui/UserLayout";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { getServerSession } from "next-auth";
import {   Module_lib } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import type { GetServerSideProps, NextPage } from "next";
import { nextAuthOptions } from "@/src/common/auth";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import CreateModuleAdminForm from "@/src/components/ui/forms/admin/CreateModuleAdminForm";
import AdminCreateModuleCards from "@/src/components/ui/cards/admin/AdminCreateModuleCards";
import { trpc } from "@/src/common/trpc";
import { modules } from "@/prisma/data/modules";
import parse from "html-react-parser";

type Props = {
  modulesLibs: Module_lib[];

};

const filterModuleById = (
  id: number,
  modules: Module_lib[]
): Module_lib => {
  const selectedModule = modules.filter((item) => item.id === id);
  console.log(selectedModule);
  return selectedModule[0];
};

const ModulesPage = ({modulesLibs}: Props) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [moduleLib, setModuleLib] = useState<Module_lib[]>(modulesLibs || []);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [currentModule, setCurrentModule] = useState<Module_lib>();

  // const modalClickHandler = () => {
  //   setShowModal((prev) => !prev);
  // };

  useEffect(() => {
    console.log(modules)
  }, [modules])

  useEffect(() => {
    console.log(modules)
  }, [currentModule])

  const infoClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(true);
  };

  const formClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(false);
  };

  const { mutateAsync: deleteModuleLib } = trpc.moduleLib.delete.useMutation();
  
  const handleDelete = async (moduleLibId: number) => {
    // Optimistically remove the course from state
    setModuleLib(moduleLib.filter(course => course.id !== moduleLibId));
  
    try {
      await deleteModuleLib({ moduleLibId: String(moduleLibId) });
    } catch (error) {
      console.error('Failed to delete course: ', error);
      // If the deletion fails, reset the state
      setModuleLib(modulesLibs || []);
    }
  };
  return (
<UserLayout role={session?.user.role ?? ""}>
<div className="w-full flex flex-col md:flex-row gap-8">
<section className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
          <form className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold">Modalbibliotek</h1>
            <div className="flex items-center mb-4">
              <input
                type="text"
                placeholder="Sök kurser här..."
                className="border border-gray-300 rounded-md py-2 px-3 w-80 mr-2 flex-grow"
              />
              <button
                className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary"
                type="submit"
              >
                Sök
              </button>
            </div>
          </form>
          <section className="w-full flex flex-wrap justify-center md:justify-start gap-2 mt-10">
          {modulesLibs !== null ? (
            <>
          {modulesLibs?.map((moduleLib: Module_lib) => (
              <AdminCreateModuleCards
                key={moduleLib.id}
                title={moduleLib.title}
                moduleLib={moduleLib}
                onDelete={handleDelete}
                infoClickHandler={() => {
                  setCurrentModule(
                    filterModuleById(moduleLib.id, modulesLibs)
                  );
                  infoClickHandler();
                }}

                />
            ))}

            </>
   ) : (
    <section className="w-full flex flex-col justify-center items-center gap-4">
    <h2 className="text-2xl">Inga övningar finns</h2>
    {/* <div className="flex justify-center items-center gap-6"> */}
    <p className="">Skapa en nu!</p>
    <button
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary"
      onClick={(e) => {
        // e.preventDefault();
        formClickHandler();
      }}
    >
      Skapa en övning
    </button>
    {/* </div> */}
  </section>
)}
</section>
</section>

<aside className="flex-1 flex flex-col">
          {/* quick-menu */}
          <div className="w-full max-w-[400px] px-2 self-center md:self-end">
            {/* quick menu items */}
            <div
              className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
              onClick={formClickHandler}
            >
              <div className="rounded-full bg-primary text-white p-2">
                <Plus />
              </div>
              <p>Lägg till modal</p>
          </div>
        </div>
      </aside>
    </div>

  <Modal
    header={"Skapa en modal"}
    showModal={showModal}
    setShowModal={setShowModal}
    >
              {isInfo ? (
          <article className="w-full h-full">
            {/* <h2>Här går resource beskrivningen in</h2> */}
            {currentModule && <div>{parse(currentModule.content)}</div>}
          </article>
        ) : (
  <CreateModuleAdminForm 
     setShowModal={setShowModal}
     showModal={showModal}
     />
     )}
  </Modal>
     </UserLayout>
  );
};

/* getServerSideProps */
export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const currentSession = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
    );

    //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  //The actual fetching

   const res = await helpers.moduleLib.getMany.fetch();

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const moduleLib = JSON.parse(JSON.stringify(res));
  
  return {
    props: {
      session: currentSession,
      modulesLibs: moduleLib.moduleLib || null,
    },
  };
};

export default ModulesPage;

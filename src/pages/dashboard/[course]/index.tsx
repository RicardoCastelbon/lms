import React, { useEffect, useState } from "react";
import UserLayout from "@/src/components/ui/UserLayout";
import { Plus } from "lucide-react";
import Modal from "@/src/components/ui/modals/Modal";
import CreateModuleForm from "@/src/components/ui/forms/teacher/CreateModuleForm";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Module } from "@prisma/client";
import ModuleAccordion from "@/src/components/ui/cards/ModuleAccordion";

type Props = {
  modules: Module[];
};

const CourseOverview = ({ modules }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    console.log(modules);

    if (!session) {
      router.push("/401");
    }
  }, [router, session, modules]);

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };

  useEffect(() => {
    if (window.innerWidth > 768) {
      setdesktopVersion(true);
    } else {
      setdesktopVersion(false);
    }
  }, []);

  //Remove open state for sidenav when screen width > 768px
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
    <>
      <UserLayout role={session?.user.role}>
        <div className="flex p-1">
          <section className=" w-full h-full bg-cyan-50 font-mont">
            <p className=" ">"Kurser -&gt; React"</p>
            <h1 className="text-2xl font-bold my-16">
              "Frontend-utveckling i React"
            </h1>
            <section className="">
              <div className="w-full">
                <ul className="flex font-medium text-slate-400">
                  <li className="md:w-48 ">Moduler</li>
                  {desktopVersion && <li className="w-32">Startdatum</li>}
                  {desktopVersion && <li className="w-32">In.datum</li>}
                  {desktopVersion && <li className="w-36">Status</li>}
                  {desktopVersion && <li className="w-32">Uppgifter</li>}
                </ul>
              </div>
              {modules &&
                modules?.map((module: Module) => (
                  <ModuleAccordion key={module.id} module={module} />
                ))}
            </section>
          </section>
          {desktopVersion && (
            <section className="pl-5">
              {/* Aside right */}
              <aside className="flex-1 bg-green">
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
                    <p>Lägg till modul</p>
                  </div>
                </div>
              </aside>
              {/* Aside right */}
              <aside className="flex-1 bg-green">
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
                    <p>Uppdatera modul</p>
                  </div>
                </div>
              </aside>
              {/* Aside right */}
              <aside className="flex-1 bg-green">
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
                    <p>Lägg till deltagare</p>
                  </div>
                </div>
              </aside>
            </section>
          )}
        </div>
        <Modal
          header={"Skapa en modul"}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <CreateModuleForm />
        </Modal>
      </UserLayout>
    </>
  );
};

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

  //The actual fetching / ->getManyByCourseSlug<-
  //WE HAVE ACCESS TO THE COURSE SLUG BUT NOT THE COURSEID.
  //THE "MODULE TABLE" CONTAIN THE COURSE ID BUT NOT THE SLUG. HOW CAN WE DO IT????
  const res = await helpers.module.getManyByCourseSlug.fetch({
    //courseId: context.params.course,
    courseId: "1",
  });

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const modules = JSON.parse(JSON.stringify(res));

  return {
    props: {
      session: currentSession,
      modules: modules.module,
    },
  };
};

export default CourseOverview;

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
import { Course, Module } from "@prisma/client";
import ModuleAccordion from "@/src/components/ui/cards/ModuleAccordion";
import CreateExerciseForm from "@/src/components/ui/forms/teacher/CreateExerciseForm";
import { Action } from "@/src/lib/enums/actionEnums";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";

type Props = {
  modules: ModuleRenderSchema[];
  course: Course;
};

const CourseOverview = ({ modules, course }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<Action>();
  const [modalHeader, setModalHeader] = useState<string>("");
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(session);
    console.log(modules);

    if (!session) {
      router.push("/401");
    }
  }, [router, session, modules]);

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

  useEffect(() => {
    getModalHeader(action);
  }, [action]);

  const modalClickHandler = (action: Action) => {
    setAction(action);
    setShowModal((prev) => !prev);
  };

  const getModalHeader = (action: Action | undefined) => {
    switch (action) {
      case Action.CREATEEXERCISE:
        setModalHeader("Skapa en uppgift");
        break;
      case Action.CREATEMODULE:
        setModalHeader("Skapa en modul");
        break;
      case Action.UPDATEMODULE:
        setModalHeader("Updatera en modul");
        break;
      case Action.CREATESTUDENT:
        setModalHeader("Skapa en student");
        break;

      default:
        break;
    }
  };

  return (
    <>
      <UserLayout role={session?.user.role}>
        <div className="flex flex-col lg:flex-row p-1">
          <section className=" w-full h-full bg-cyan-50 font-mont p-2">
            <p className=" ">Kurser -&gt; {course?.title}</p>
            <h1 className="text-2xl font-bold my-16">{course?.title}</h1>
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
                modules?.map((module: ModuleRenderSchema) => (
                  <ModuleAccordion
                    key={module.id}
                    module={module}
                    modalClickHandler={modalClickHandler}
                  />
                ))}
            </section>
          </section>
          {desktopVersion && (
            <section className="pl-5">
              {/* Aside right */}
              <aside className="flex-1 bg-green">
                {/* quick-menu */}
                <div className="w-full flex flex-col gap-2 p-2">
                  {/* quick menu items */}
                  {session?.user.role === "TEACHER" ? (
                    <>
                      <div
                        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                        onClick={() => modalClickHandler(Action.CREATEMODULE)}
                      >
                        <div className="rounded-full bg-primary text-white p-2">
                          <Plus />
                        </div>
                        <p>Lägg till modul</p>
                      </div>
                      <div
                        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                        onClick={() => modalClickHandler(Action.UPDATEMODULE)}
                      >
                        <div className="rounded-full bg-primary text-white p-2">
                          <Plus />
                        </div>
                        <p>Uppdatera modul</p>
                      </div>
                      <div
                        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                        onClick={() => modalClickHandler(Action.CREATESTUDENT)}
                      >
                        <div className="rounded-full bg-primary text-white p-2">
                          <Plus />
                        </div>
                        <p>Lägg till deltagare</p>
                      </div>
                    </>
                  ) : (
                    ""
                  )}
                </div>
              </aside>
            </section>
          )}
        </div>
        <Modal
          header={modalHeader}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          {action === Action.CREATEMODULE && <CreateModuleForm />}
          {action === Action.CREATEEXERCISE && <CreateExerciseForm />}
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
  //might have to cast context to string
  const slug = String(context.params.course);

  //fetch the course from params to get the courseId
  const course = await helpers.course.getCourseBySlug.fetch({
    courseSlug: slug,
  });

  // fetch all the modules with with courseId
  const res = await helpers.module.getManyByCourseId.fetch({
    courseId: course?.course.id,
  });
  // console.log(res);

  //fetch all the exercises
  /*  const exercises = await helpers.exercise.getManyByModuleId.fetch({
    modu
  });  */

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const modules = JSON.parse(JSON.stringify(res.module));
  // console.log(...modules);

  const courseData = JSON.parse(JSON.stringify(course));

  return {
    props: {
      session: currentSession,
      modules: [...modules],
      course: courseData.course,
    },
  };
};

export default CourseOverview;

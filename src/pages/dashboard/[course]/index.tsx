import React, { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Course, Exercise_lib, Module_lib, Role } from "@prisma/client";

import Modal from "@/src/components/ui/modals/Modal";
import UserLayout from "@/src/components/ui/UserLayout";
import ModuleAccordion from "@/src/components/ui/cards/ModuleAccordion";
import { Action } from "@/src/lib/enums/actionEnums";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";
import ResourceSelection from "@/src/components/ui/ResourceSelection";
// import { ModuleAction } from "@/src/lib/enums/actionEnums";
import LibSelection from "@/src/components/ui/LibSelection";

export interface ExerciseData {
  moduleName: string;
  exercise: {
    id: number;
    moduleId: number;
    title: string;
    slug: string;
    content: string;
    published: boolean;
  };
}
type Props = {
  modules: ModuleRenderSchema[];
  course: Course;
  moduleLib: Module_lib[];
  exerciseLib: Exercise_lib[];
};

const CourseOverview = ({ modules, course, moduleLib, exerciseLib }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<Action>();
  const [modalHeader, setModalHeader] = useState<string>("");
  const [moduleId, setModuleId] = useState<number>(0);

  //array of combined module + exercise data
  const [exerciseData, setExerciseData] = useState<ExerciseData[] | null>(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(moduleLib);
  }, [moduleLib]);

  useEffect(() => {
    if (!session) {
      router.push("/401");
    }
  }, [router, session, modules]);

  useEffect(() => {
    setExerciseData(getExerciseData(modules));
    // getExerciseData(modules);
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

  const getModuleId = (moduleId: number) => {
    setModuleId(moduleId);
  };

  // make util
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
      case Action.UPDATEEXERCISE:
        setModalHeader("Uppdatera en övning");
        break;
      default:
        break;
    }
  };

  // make util
  const getExerciseData = (modules: ModuleRenderSchema[]) => {
    let combinedArr: ExerciseData[] = [];

    modules.map((module) => {
      let moduleName = module.title;

      for (let i = 0; i < module.exercises.length; i++) {
        combinedArr.push({
          moduleName: moduleName,
          exercise: module.exercises[i],
        });
      }
    });

    return combinedArr;
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

                  {desktopVersion && <li className="w-36">Status</li>}
                  {desktopVersion && <li className="w-32">Uppgifter</li>}
                  {desktopVersion && (
                    <li className="w-32 ml-auto">Publicerad</li>
                  )}
                </ul>
              </div>
              {modules &&
                modules?.map((module: ModuleRenderSchema) => (
                  <ModuleAccordion
                    key={module.id}
                    userModule={module}
                    modalClickHandler={modalClickHandler}
                    getModuleId={getModuleId}
                    role={session?.user.role}
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

                      <div
                        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                        onClick={() => modalClickHandler(Action.CREATEEXERCISE)}
                      >
                        <div className="rounded-full bg-primary text-white p-2">
                          <Plus />
                        </div>
                        <p>Lägg till uppgift</p>
                      </div>
                      <div
                        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                        onClick={() => modalClickHandler(Action.UPDATEEXERCISE)}
                      >
                        <div className="rounded-full bg-primary text-white p-2">
                          <Plus />
                        </div>
                        <p>Uppdatera uppgifter</p>
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
          {action === Action.CREATEMODULE && (
            <LibSelection
              courseId={course.id}
              setShowModal={setShowModal} //used to reset form data if form is closed.
              showModal={showModal} //pass showModal to reset "isCreateFormOpen" - state
              action={action} // pass action to conditionally render the correct create form
              resource={moduleLib}
            />
          )}

          {action === Action.UPDATEMODULE && (
            <>
              <ResourceSelection
                role={session?.user.role}
                resource={modules}
                action={Action.UPDATEMODULE}
                showModal={showModal}
                setShowModal={setShowModal} //<- should be a memoized clickhandler-function to eliminate unessessary renders
              />
            </>
          )}
          {action === Action.CREATEEXERCISE && (
            <LibSelection
              setShowModal={setShowModal} //used to reset form data if form is closed.
              showModal={showModal} //pass showModal to reset "isCreateFormOpen" - state
              action={action} // pass action to conditionally render the correct create form
              resource={exerciseLib}
              modules={modules}
            />
          )}

          {action === Action.UPDATEEXERCISE && (
            <ResourceSelection
              role={session?.user.role}
              setShowModal={setShowModal} //used to reset form data if form is closed.
              showModal={showModal} //pass showModal to reset "isCreateFormOpen" - state
              exercises={exerciseData!}
              action={action}
            />
          )}
        </Modal>
      </UserLayout>
    </>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  type UserRole = string | undefined | null;

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
  const userRole = currentSession && (currentSession.user.role as string);
  const slug = String(context.params.course);

  //fetch the course from params to get the courseId
  const course = await helpers.course.getCourseBySlug.fetch({
    courseSlug: slug,
  });

  const moduleLibRes = await helpers.moduleLib.getMany.fetch();
  const exerciseLibRes = await helpers.exercise_lib.getMany.fetch();

  // const courseId = course.course.id as string

  // fetch all the modules with with courseId
  const res = await helpers.module.getManyByCourseId.fetch({
    courseId: course?.course?.id,
  });

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const modules = JSON.parse(JSON.stringify(res.module));

  const courseData = JSON.parse(JSON.stringify(course));
  const moduleLib =
    moduleLibRes.success && JSON.parse(JSON.stringify(moduleLibRes.moduleLib));
  const exerciseLib =
    exerciseLibRes.success &&
    JSON.parse(JSON.stringify(exerciseLibRes.exerciseLib));

  return {
    props: {
      session: currentSession,
      modules: [...modules],
      course: courseData.course,
      moduleLib: userRole === Role.TEACHER ? moduleLib : [],
      exerciseLib: userRole === Role.TEACHER ? exerciseLib : [],
    },
  };
};

export default CourseOverview;

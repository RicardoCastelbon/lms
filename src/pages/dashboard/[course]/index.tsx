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
import { Course, Exercise, Module, Module_lib, Role } from "@prisma/client";
import ModuleAccordion from "@/src/components/ui/cards/ModuleAccordion";
import CreateExerciseForm from "@/src/components/ui/forms/teacher/CreateExerciseForm";
import { Action } from "@/src/lib/enums/actionEnums";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";
import ResourceSelection from "@/src/components/ui/ResourceSelection";
// import { ModuleAction } from "@/src/lib/enums/actionEnums";
import UpdateModuleForm from "@/src/components/ui/forms/teacher/UpdateModuleForm";
import UpdateExerciseForm from "@/src/components/ui/forms/teacher/UpdateExerciseForm";
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
};

const CourseOverview = ({ modules, course, moduleLib }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [action, setAction] = useState<Action>();
  const [modalHeader, setModalHeader] = useState<string>("");
  const [moduleId, setModuleId] = useState<number>(0);
  const [isCreatedExercise, setIsCreatedExercise] = useState<boolean>(false);

  //array of combined module + exercise data
  const [exerciseData, setExerciseData] = useState<ExerciseData[] | null>(null);

  //To be set within the ResourceSelect component whenever a list item is clicked.
  // const [resourceId, setResourceId] = useState<number>(0);
  //To be selected course from when resourceId is set ResourceSelection, always reset this to NULL.
  const [moduleToUpdate, setModuleToUpdate] =
    useState<ModuleRenderSchema | null>(null);
  const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseData | null>(
    null
  );
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log(moduleLib);
  }, [moduleLib]);

  useEffect(() => {
    // console.log(session);
    // console.log(modules);

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
  /* 
  useEffect(() => {
    console.log(exerciseData);
  }, [exerciseData]);

  useEffect(() => {
    console.log(exerciseToUpdate);
  }, [exerciseToUpdate]); */

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

  /*   useEffect(() => {
    if (!showModal) {
      setModuleToUpdate(null);
      setResourceId(0);
    }
  }, [showModal]); */

  useEffect(() => {
    getModalHeader(action);
  }, [action]);

  //Selects the module by id with the given resourceId whenever resourceId is updated within ResrouceSelection.
  /*   useEffect(() => {
    if (
      action === Action.CREATEMODULE ||
      action === Action.UPDATEMODULE ||
      action === Action.CREATEEXERCISE
    ) {
      console.log("I will filter modules");

      setModuleToUpdate(getModuleToUpdate(resourceId, modules));
    } else if (action === Action.UPDATEEXERCISE) {
      console.log("I will filter weird exercise array");
      if (exerciseData) {
        setExerciseToUpdate(getExerciseToUpdate(resourceId, exerciseData));
      }
    }
  }, [resourceId, modules, action, exerciseData]); */

  //Function to run whenever a resource is clicked in the resource list in component ResourceSelection when clicking update course button
  // make util
  /*   const getModuleToUpdate = (
    moduleId: number,
    modules: ModuleRenderSchema[]
  ) => {
    if (modules.length <= 0) return null;

    const filteredModule = modules.filter((module) => module.id === moduleId);

    return filteredModule.length <= 0 ? null : filteredModule[0];
  }; */
  //Get exercise to update
  // make util
  const getExerciseToUpdate = (
    exerciseId: number,
    exercises: ExerciseData[] | null
  ) => {
    if (!exercises || exercises.length <= 0) return null;

    const filteredExercise = exercises.filter(
      (exercise) => exercise.exercise.id === exerciseId
    );

    return filteredExercise.length <= 0 ? null : filteredExercise[0];
  };

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
                // setResourceId={setResourceId}
                resource={modules}
                action={Action.UPDATEMODULE}
                showModal={showModal}
                setShowModal={setShowModal} //<- should be a memoized clickhandler-function to eliminate unessessary renders
              />
            </>
          )}

          {/* {action === Action.CREATEEXERCISE && (
            <>
              {!moduleToUpdate ? (
                <ResourceSelection
                  role={session?.user.role}
                  setResourceId={setResourceId}
                  resource={modules}
                  action={action}
                />
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setModuleToUpdate(null);
                      setResourceId(0);
                    }}
                  >
                    Tillbaka
                  </button>
                  <CreateExerciseForm
                    moduleId={moduleToUpdate.id}
                    setShowModal={setShowModal}
                  />
                </div>
              )}
            </>
          )} */}
          {/*  {action === Action.UPDATEEXERCISE && (
            <>
              {!exerciseToUpdate ? (
                <ResourceSelection
                  role={session?.user.role}
                  setResourceId={setResourceId}
                  // resource={exerciseData!}
                  exercises={exerciseData!}
                  action={action}
                />
              ) : (
                <div>
                  <button
                    onClick={() => {
                      setModuleToUpdate(null);
                      setResourceId(0);
                    }}
                  >
                    Tillbaka
                  </button>
                  <p>id: {exerciseToUpdate.exercise.id}</p>
                  <p>namn: {exerciseToUpdate.exercise.title}</p>

                  <p>
                    publicerad:{" "}
                    {exerciseToUpdate.exercise.published ? "ja" : "nej"}
                  </p>
                 
                  <UpdateExerciseForm
                    exercise={exerciseToUpdate}
                    hasSubmitted={hasSubmitted}
                    setHasSubmitted={setHasSubmitted}
                    setShowModal={setShowModal}
                  />
                </div>
              )}
            </>
          )} */}
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
  // console.log(res);
  //fetch all the exercises
  /*  const exercises = await helpers.exercise.getManyByModuleId.fetch({
    modu
  });  */

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const modules = JSON.parse(JSON.stringify(res.module));
  // console.log(...modules);

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
      // exerciseLib: userRole === Role.TEACHER ? exerciseLib : [],
    },
  };
};

export default CourseOverview;

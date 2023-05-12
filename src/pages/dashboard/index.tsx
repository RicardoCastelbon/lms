import { useEffect, useRef, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
// import { trpc } from "@/src/common/trpc";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { createServerSideHelpers } from "@trpc/react-query/server";
import UserLayout from "@/src/components/ui/UserLayout";
import { IconContext } from "react-icons";
import { nextAuthOptions } from "@/src/common/auth";
import CourseCard from "@/src/components/ui/cards/CourseCard";
import { Plus, X, FileEdit } from "lucide-react";
// import ColorSelect from "@/src/components/ui/dropdowns/ColorSelect";
import CreateCourseForm from "@/src/components/ui/forms/teacher/CreateCourseForm";
import Modal from "@/src/components/ui/modals/Modal";
import { serverRouter } from "@/src/server/routers";
import { IContext, createContext } from "@/src/server/context";
import { Course, Education, Exercise, Module } from "@prisma/client";
// import { trpc } from "@/src/common/trpc";

type Props = {
  courses: Course[];
  education: Education;
};
const Dashboard = ({ courses, education }: Props) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);
  // const [clientCourses, setClientCourses] = useState<Course[]>();
  const [action, setAction] = useState<string>("");

  const { data: session } = useSession();
  const router = useRouter();
  /* const { data, isLoading } = trpc.course.getManyByEducationId.useQuery({
    educationId: String(session?.user.educationId),
  }); */

  const modalRef = useRef(null);
  // console.log(courses);

  useEffect(() => {
    console.log(hasSubmitted);
  }, [hasSubmitted]);

  useEffect(() => {
    // console.log(session);
    // console.log(courses);

    if (!session) {
      router.push("/401");
    }
  }, [router, session, courses]);

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

  // handling click outside modal to close.
  useEffect(() => {
    const handleClickOutside = (e: any) => {
      //if close button in modal is pressed, dont run following if
      if (e.target.id !== "closeModal") {
        if (
          modalRef.current &&
          /* @ts-ignore */
          !modalRef.current.contains(e.target)
        ) {
          showModal && setShowModal(false);
        }
      }
    };

    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, [modalRef, showModal]);

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
      <UserLayout role={session?.user.role}>
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
            {courses !== null ? (
              courses?.map((course: Course) => (
                <CourseCard
                  key={course.id}
                  course={course}
                  role={session?.user.role}
                />
              ))
            ) : (
              <section className="w-full flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl">Inga övningar finns</h2>
                {/* <div className="flex justify-center items-center gap-6"> */}

                {session?.user.role === "TEACHER" ? (
                  <>
                    <p className="">Skapa en nu!</p>

                    <button
                      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary"
                      onClick={(e) => {
                        // e.preventDefault();
                        setShowModal(true);
                      }}
                    >
                      Skapa en övning
                    </button>
                  </>
                ) : (
                  <p className="">Invänta info från din handledare</p>
                )}
                {/* </div> */}
              </section>
            )}
          </div>
          {/* Aside right */}
          <aside className="flex-1">
            {/* quick-menu */}
            <div className="w-full flex flex-col gap-2 p-2">
              {/* quick menu items */}
              {session?.user.role === "TEACHER" ? (
                <>
                  <div
                    className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                    onClick={modalClickHandler}
                  >
                    <div className="rounded-full bg-primary text-white p-2">
                      <Plus />
                    </div>
                    <p>Lägg till kurs</p>
                  </div>
                  <div
                    className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                    onClick={modalClickHandler}
                  >
                    <div className="rounded-full bg-primary text-white p-2">
                      <FileEdit />
                    </div>
                    <p>Uppdatera kurser</p>
                  </div>
                </>
              ) : (
                <p>Välkommen till {education?.name}</p>
              )}
            </div>
          </aside>
        </div>

        <Modal
          header={"Skapa en kurs"}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <CreateCourseForm
            hasSubmitted={hasSubmitted}
            setHasSubmitted={setHasSubmitted}
            educationId={education?.id}
            setShowModal={setShowModal}
          />
        </Modal>
      </UserLayout>
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
  const educationId = String(currentSession?.user.educationId);

  //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  //The actual fetching
  const eduRes = await helpers.education.getOne.fetch({ educationId });

  const res = await helpers.course.getManyByEducationId.fetch({
    educationId,
  });

  // type Resource = Course;
  type UserRole = string | undefined | null;
  //filter result depending on the role of the logged in user
  const filterCoursesByRole = (role: UserRole, resource: Course[]) => {
    console.log(role);
    //if parameters are nullish return null
    if (!role || !resource) return null;

    //filter resource to only return resources that are published.
    if (resource && role === "STUDENT") {
      const publishedResources = resource.filter(
        (item) => item?.published === true
      );
      return publishedResources;
    }
    // else return all resources
    return resource;
  };

  const courses: Course[] = JSON.parse(JSON.stringify(res.course));
  // const courses = res.course as Course[];
  const userRole = currentSession && (currentSession.user.role as string);

  const filteredCourses = filterCoursesByRole(userRole, courses);

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const education = JSON.parse(JSON.stringify(eduRes));
  // console.log(courses);

  return {
    props: {
      session: currentSession,
      courses: filteredCourses,
      education: education.education,
    },
  };
};
export default Dashboard;

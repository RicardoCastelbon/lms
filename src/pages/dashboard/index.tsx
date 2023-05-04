import { useEffect, useRef, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { trpc } from "@/src/common/trpc";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";
import { createServerSideHelpers } from "@trpc/react-query/server";
import UserLayout from "@/src/components/ui/UserLayout";
import { IconContext } from "react-icons";
import { nextAuthOptions } from "@/src/common/auth";
import CourseCard from "@/src/components/ui/cards/CourseCard";
import { Plus, X } from "lucide-react";
import ColorSelect from "@/src/components/ui/dropdowns/ColorSelect";
import CreateCourseForm from "@/src/components/ui/forms/teacher/CreateCourseForm";
import Modal from "@/src/components/ui/modals/Modal";
import { getQueryKey } from "@trpc/react-query";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { Course } from "@prisma/client";

/* const courses = [
  {
    id: 1,
    name: "Frontend-utveckling",
    exercises: 14,
    slug: "frontend-utveckling",
  },
  {
    id: 2,
    name: "Backend-utveckling",
    exercises: 12,
    slug: "backend-utveckling",
  },
  {
    id: 3,
    name: "UX-Design",
    exercises: 14,
    slug: "ux-design",
  },
]; */

type Props = {
  courses: Course[];
};
const Dashboard = ({ courses }: Props) => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  const modalRef = useRef(null);

  useEffect(() => {
    console.log(session);
    console.log(courses);

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
            {courses &&
              courses?.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))}
          </div>
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
                <p>Lägg till kurs</p>
              </div>
            </div>
          </aside>
        </div>

        <Modal
          header={"Skapa en kurs"}
          showModal={showModal}
          setShowModal={setShowModal}
        >
          <CreateCourseForm />
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
  console.log("Current session", currentSession);
  const educationId = String(currentSession?.user.educationId);

  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });
  const res = await helpers.course.getManyByEducationId.fetch({
    educationId,
  });
  const courses = JSON.parse(JSON.stringify(res));
  console.log(courses);

  // console.log(typeof eduId);

  // const { data } = trpc.course.getManyByEducationId.useQuery({ educationId });
  //  const caller = serverRouter.createCaller({...context})

  return {
    props: {
      session: currentSession,
      courses: courses.course,
    },
  };
};
export default Dashboard;
/* function createServerSideHelpers(arg0: {
  router: any;
  ctx: any;
  transformer: any;
}) {
  throw new Error("Function not implemented.");
} */

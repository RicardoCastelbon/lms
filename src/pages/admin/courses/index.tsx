import Modal from "@/src/components/ui/modals/Modal";
import UserLayout from "@/src/components/ui/UserLayout";
import {  Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import CreateCourseAdminForm from "@/src/components/ui/forms/admin/CreateCourseAdminForm";
// import { useQuill } from "react-quilljs";
import AdminCreateCourseCards from "@/src/components/ui/cards/AdminCreateCourseCards";
import { Course_lib } from "@prisma/client";
import { IconContext } from "react-icons";
import { courseLibId } from "@/src/common/validation/course-lib";
import { serverRouter } from "@/src/server/routers";
import { nextAuthOptions } from "@/src/common/auth";
import { getServerSession } from "next-auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { createContext } from "@/src/server/context";
import type { GetServerSideProps, NextPage } from "next";
// import { deleteCourseLib } from "@/src/server/controllers/course-lib.controller";

// import { useMutation } from 'react-query';

// import { useRouter } from 'next/router';
import { trpc } from "@/src/common/trpc";

type Props = {
  courses: Course_lib[];
};
const filterExerciseById = (
  id: number,
  courses: Course_lib[]
): Course_lib => {
  const selectedCourse = courses.filter((item) => item.id === id);
  console.log(selectedCourse);
  return selectedCourse[0];
};

const CoursesPage = ({ courses }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession(); 
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [currentCourse, setCurrentCourse] = useState<Course_lib>();
  const [courseLib, setCourseLib] = useState<Course_lib[]>(courses || []);

  // const modalClickHandler = () => {
  //   setShowModal((prev) => !prev);
  // };

  useEffect(() => {
    console.log(courses);
  }, [courses]);courses

  useEffect(() => {
    console.log(currentCourse);
  }, [currentCourse]);

  const infoClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(true);
  };

  const formClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(false);
  };

  const { mutateAsync: deleteCourseLib } = trpc.courseLib.delete.useMutation();
  // const handleDelete = async (courseLibId: number) => {
  //   // Optimistically remove the course from state
  //   setCourseLib(courseLib.filter(course => course.id !== courseLibId));
  
  //   try {
  //     await deleteCourseLib({ courseLibId: String(courseLibId) });
  //   } catch (error) {
  //     console.error('Failed to delete course: ', error);
  //     // If the deletion fails, reset the state
  //     setCourseLib(courses || []);
  //   }
  // };
  

  return (

  <UserLayout role={session?.user.role ?? ""}>
       <div className="w-full flex flex-col md:flex-row gap-8">
        {/* main content */}
        <section className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
          <form className="flex flex-col items-center gap-6">
            <h1 className="text-2xl font-semibold">Övningsbibliotek</h1>
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
          {courseLib !== null ? (
              <>
      {courseLib?.map((courseLib: Course_lib) => (
        <AdminCreateCourseCards
          key={courseLib.id}
           courseLib={courseLib}
          title={courseLib.title}
          infoClickHandler={() => {
            setCurrentCourse (
              filterExerciseById(courseLib.id, courses)
            );
            infoClickHandler();
          }}
        />
          // onDelete={handleDelete}
      
      ))}
         </>
        ) : (

          <section className="w-full flex flex-col justify-center items-center gap-4">
          <h2 className="text-2xl">Inga kurser finns</h2>
          <p className="">Skapa en nu!</p>
          <button
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary"
                  onClick={(e) => {
                    // e.preventDefault();
                    formClickHandler();
                  }}
                >
                  Skapa en kurs
                </button>
                {/* </div> */}
              </section>
            )}
          </section>
        </section>
  <aside className="w-64">
    {/* quick-menu */}
    <div className="w-full p-2">
      {/* quick menu items */}
      <div
        className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
        onClick={formClickHandler}
      >
        <div className="rounded-full bg-primary text-white p-2">
          <Plus />
        </div>
        <p>Lägg till en kurs</p>
      </div>
    </div>
  </aside>
</div>
  <Modal
    header={"Skapa en kurs"}
    showModal={showModal}
    setShowModal={setShowModal}
    >
  <CreateCourseAdminForm
           setShowModal={setShowModal}
           showModal={showModal}
           />
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
    console.log("Current Session", currentSession)
    //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });


  //Set up a trpc helper, needed for serverSide fetching
  console.log("Fetching module library with id:", courseLibId);
  //The actual fetching

   const res = await helpers.courseLib.getMany.fetch();
   console.log("Fetch result:", res);
   console.log("Module library fetched:", res);
  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const courseLib = JSON.parse(JSON.stringify(res));
  
  return {
    props: {
      session: currentSession,
      courses: courseLib?.courseLib || null,
    },
};
};

export default CoursesPage;

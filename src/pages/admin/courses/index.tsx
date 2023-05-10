import { Button } from "@/src/components/ui/button";
import Layout from "@/src/components/ui/Layout";
import Modal from "@/src/components/ui/modals/Modal";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import UserLayout from "@/src/components/ui/UserLayout";
import { CalendarIcon, Plus, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import CreateCourseAdminForm from "@/src/components/ui/forms/admin/CreateCourseAdminForm";
import { useQuill } from "react-quilljs";
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
import { deleteCourseLib } from "@/src/server/controllers/course-lib.controller";

import { useMutation } from 'react-query';

import { useRouter } from 'next/router';
import { trpc } from "@/src/common/trpc";

type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;
  coursesLib?: Course_lib[];

};

const CoursesPage = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const { quill, quillRef } = useQuill();
  const { data: session } = useSession(); 
  const [courseLib, setCourseLib] = useState<Course_lib[]>(props.coursesLib || []);

  const router = useRouter();

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };


  const { mutateAsync: deleteCourseLib } = trpc.courseLib.delete.useMutation();
  
  const handleDelete = async (courseLibId: number) => {
    // Optimistically remove the course from state
    setCourseLib(courseLib.filter(course => course.id !== courseLibId));
  
    try {
      await deleteCourseLib({ courseLibId: String(courseLibId) });
    } catch (error) {
      console.error('Failed to delete course: ', error);
      // If the deletion fails, reset the state
      setCourseLib(props.coursesLib || []);
    }
  };
  

  return (
    <IconContext.Provider
  value={{
    className:
      "text-primary hover:text-indigo-50 hover:bg-primary hover:cursor-pointer rounded-sm",
  }}
>
  <UserLayout role={session?.user.role ?? ""}>
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
          {/* For courses */}
          {props.coursesLib && 
          props.coursesLib.map((courseLib: Course_lib) => (
          <AdminCreateCourseCards
            key={courseLib.id}
            courseLib={courseLib}
            onDelete={handleDelete}
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
            <p>Lägg till en kurs</p>
          </div>
        </div>
      </aside>
    </div>
  </UserLayout>
  <Modal
    header={"Skapa en kurs"}
    showModal={showModal}
    setShowModal={setShowModal}
  >
  <CreateCourseAdminForm closeModal={() => setShowModal(false)} />
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
      coursesLib: courseLib?.courseLib || null,
    },
};
};

export default CoursesPage;

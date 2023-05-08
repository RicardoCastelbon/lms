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

type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string | null;
  
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
      <UserLayout role={session?.user.role}>
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
            {/* {courses &&
              courses?.map((course: Course) => (
                <CourseCard key={course.id} course={course} />
              ))} */}
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
                <p>Lägg till Modal</p>
              </div>
            </div>
          </aside>
        </div>

        <Modal
          header={"Skapa en modal"}
          showModal={showModal}
          setShowModal={setShowModal}
        >
      <CreateCourseForm 
        titlePlaceholder={"Skriv in modalnamn"}
        title={"Modalnamn"}
        pointsPlaceholder={"Skriv in modal poäng"}
        pointsLabel={"Modalpoäng"}
        courseInfoText={"Modalinformation"}
        />   
           </Modal>
            </UserLayout>
    </IconContext.Provider>
  );
};

export default ModulesPage;

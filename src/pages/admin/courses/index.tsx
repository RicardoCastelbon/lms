import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import Layout from "@/src/components/ui/Layout";
import Modal from "@/src/components/ui/modals/Modal";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import UserLayout from "@/src/components/ui/UserLayout";
import { CalendarIcon, Plus, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import ModulesPage from "../modules";
import CreateCourseAdminForm from "@/src/components/ui/forms/admin/CreateCourseAdminForm";


type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;
};

const CoursesPage = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const { data: session } = useSession(); 
  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };

return(
  <UserLayout role={session?.user.role ?? ""}>
      <div className="ml-10">
        <h1 className="text-2xl font-bold mb-4">
          Skapa en ny spännande kurs
        </h1>
        <div className="flex mb-4 items-center">
          <input
            type="text"
            placeholder="Sök kurser här..."
            className="border border-gray-300 rounded-md py-2 px-3 w-80 mr-2 flex-grow"
          />
          <aside className="flex-initial">
            {/* quick-menu */}
            <div className="w-full p-2">
              {/* quick menu items */}
              <div
                className="flex items-center gap-2 bg-card p-2 rounded-lg hover:cursor-pointer hover:bg-background"
                onClick={modalClickHandler}
              >
                <div className="rounded-full bg-primary text-white p-1">
                  <Plus className="h-4 w-4" />
                </div>
                <p className="text-sm">Lägg till kurs</p>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        // children={undefined}
        header={""}
      >

        <CreateCourseAdminForm/>
      </Modal>
    </UserLayout>
  )
};


export default CoursesPage;

import UserLayout from "@/src/components/ui/UserLayout";
import CreateExerciseAdminForm from "@/src/components/ui/forms/admin/CreateExerciseAdminForm";
import Modal from "@/src/components/ui/modals/Modal";
import { Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

type Props = {};

const ExercisesPage = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(true);
  const { data: session } = useSession();

  return (
    <UserLayout role={session?.user.role ?? ""}>
      <div className="w-full flex flex-col md:flex-row gap-8">
        {/* main content */}
        <section className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
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
        </section>
        {/* aside */}
        <aside className="flex-1">
          {/* quick-menu */}
          <div className="w-full p-2">
            {/* quick menu items */}
            <div
              className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
              // onClick={modalClickHandler}
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
        showModal={showModal}
        setShowModal={setShowModal}
        header={"Skapa en övning"}
      >
        <CreateExerciseAdminForm showModal={showModal} />
      </Modal>
    </UserLayout>
  );
};

export default ExercisesPage;

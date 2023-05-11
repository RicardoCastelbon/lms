import UserLayout from "@/src/components/ui/UserLayout";
import CreateExerciseAdminForm from "@/src/components/ui/forms/admin/CreateExerciseAdminForm";
import Modal from "@/src/components/ui/modals/Modal";
import { Info, Plus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { FaReact } from "react-icons/fa";

type Props = {};

const ExercisesPage = (props: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const { data: session } = useSession();

  const infoClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(true);
  };

  const formClickHandler = () => {
    setShowModal((prev) => !prev);
    setIsInfo(false);
  };
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
          {/* Search results */}
          {/* Should render all if no search term is entered */}
          <section className="w-full flex flex-wrap justify-center md:justify-start gap-2 mt-10">
            {/* result cards */}
            <div className="relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary rounded-md shadow-lg text-white">
              <Info
                className="absolute top-2 right-2 hover:cursor-pointer"
                onClick={infoClickHandler}
              />
              <FaReact size={48} />
              <h3>Titel på resourcen</h3>
            </div>
            <div className="relative flex flex-col justify-center items-center gap-2 w-[200px] h-[200px] bg-primary rounded-md shadow-lg text-white">
              <Info className="absolute top-2 right-2" />
              <FaReact size={48} />
              <h3>Titel på resourcen</h3>
            </div>
          </section>
        </section>
        {/* aside */}
        <aside className="flex-1 flex flex-col">
          {/* quick-menu */}
          <div className="w-full max-w-[400px] px-2 self-center md:self-end">
            {/* quick menu items */}
            <div
              className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
              onClick={formClickHandler}
            >
              <div className="rounded-full bg-primary text-white p-2">
                <Plus />
              </div>
              <p>Lägg till övning</p>
            </div>
          </div>
        </aside>
      </div>

      <Modal
        showModal={showModal}
        setShowModal={setShowModal}
        header={"Skapa en övning"}
      >
        {isInfo ? (
          <article className="w-full h-full">
            <h2>Här går resource beskrivningen in</h2>
          </article>
        ) : (
          <CreateExerciseAdminForm showModal={showModal} />
        )}
      </Modal>
    </UserLayout>
  );
};

export default ExercisesPage;

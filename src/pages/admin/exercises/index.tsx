import React, { useEffect, useState } from "react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { Exercise_lib } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { Info, Plus, FileText } from "lucide-react";
import parse from "html-react-parser";

import { nextAuthOptions } from "@/src/common/auth";
import UserLayout from "@/src/components/ui/UserLayout";
import ExerciseLibCard from "@/src/components/ui/cards/admin/ExerciseLibCard";
import CreateExerciseAdminForm from "@/src/components/ui/forms/admin/CreateExerciseAdminForm";
import Modal from "@/src/components/ui/modals/Modal";
import { createContext } from "@/src/server/context";
import { serverRouter } from "@/src/server/routers";
// import { FaReact } from "react-icons/fa";

type Props = {
  exercises: Exercise_lib[];
};

//get clicked exercise when clicking info button to display its description within the article
const filterExerciseById = (
  id: number,
  exercises: Exercise_lib[]
): Exercise_lib => {
  const selectedExercise = exercises.filter((item) => item.id === id);
  console.log(selectedExercise);
  return selectedExercise[0];
};

const ExercisesPage = ({ exercises }: Props) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [currentExercise, setCurrentExercise] = useState<Exercise_lib>();
  const { data: session } = useSession();

  useEffect(() => {
    console.log(exercises);
  }, [exercises]);

  useEffect(() => {
    console.log(currentExercise);
  }, [currentExercise]);

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
            {exercises !== null ? (
              <>
                {exercises?.map((exer, index) => (
                  <ExerciseLibCard
                    key={exer.id}
                    title={exer.title}
                    infoClickHandler={() => {
                      setCurrentExercise(
                        filterExerciseById(exer.id, exercises)
                      );
                      infoClickHandler();
                    }}
                  />
                ))}
              </>
            ) : (
              <section className="w-full flex flex-col justify-center items-center gap-4">
                <h2 className="text-2xl">Inga övningar finns</h2>
                {/* <div className="flex justify-center items-center gap-6"> */}
                <p className="">Skapa en nu!</p>
                <button
                  className="bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary"
                  onClick={(e) => {
                    // e.preventDefault();
                    formClickHandler();
                  }}
                >
                  Skapa en övning
                </button>
                {/* </div> */}
              </section>
            )}
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
            {/* <h2>Här går resource beskrivningen in</h2> */}
            {currentExercise && <div>{parse(currentExercise.content)}</div>}
          </article>
        ) : (
          <CreateExerciseAdminForm
            setShowModal={setShowModal}
            showModal={showModal}
          />
        )}
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
  // const educationId = String(currentSession?.user.educationId);

  //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  //The actual fetching
  /* const res = await helpers.course.getManyByEducationId.fetch({
    educationId,
  }); */

  const res = await helpers.exercise_lib.getMany.fetch();
  // console.log(res);

  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const exersices = JSON.parse(JSON.stringify(res));
  console.log(exersices);

  return {
    props: {
      session: currentSession,
      exercises: exersices.exerciseLib || null,
    },
  };
};

export default ExercisesPage;

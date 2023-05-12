import { nextAuthOptions } from "@/src/common/auth";
import { trpc } from "@/src/common/trpc";
import AdminCreateEduCards from "@/src/components/ui/cards/admin/AdminCreateEduCards";
import CreateEduAdminForm from "@/src/components/ui/forms/admin/CreateEduAdminForm";
import Modal from "@/src/components/ui/modals/Modal";
import UserLayout from "@/src/components/ui/UserLayout";
import { serverRouter } from "@/src/server/routers";
import { Education } from "@prisma/client";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { Plus } from "lucide-react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { createContext } from "@/src/server/context";
import { educationId } from "@/src/common/validation/global";
import parse from "html-react-parser";
import { education } from "@/src/common/validation/education";

type Props = {
  educations: Education[];
};

const filterEducationById = (id: number, education: Education[]): Education => {
  const selectedEducation = education.filter((item) => item.id === id);
  console.log(selectedEducation);
  return selectedEducation[0];
};
const EducationPage = ({ educations }: Props) => {
  const { data: session } = useSession();
  const [showModal, setShowModal] = useState<boolean>(false);
  const [isInfo, setIsInfo] = useState<boolean>(false);
  const [currentEducation, setCurrentEducation] = useState<Education>();

  // const modalClickHandler = () => {
  //   setShowModal((prev) => !prev);
  // };

  const { mutateAsync: deleteEducation } = trpc.education.delete.useMutation();

  // const handleDelete = async (educationId: number) => {
  //   // Optimistically remove the course from state
  //   setEducation(education.filter((education) => educationId !== educationId));

  //   try {
  //     await deleteEducation({ educationId: String(educationId) });
  //   } catch (error) {
  //     console.error("Failed to delete course: ", error);
  //     // If the deletion fails, reset the state
  //     setEducation(props.education || []);
  //   }
  // };

  useEffect(() => {
    console.log(education);
  }, [education]);
  useEffect(() => {
    console.log(currentEducation);
  }, [currentEducation]);

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
      <div className='w-full flex flex-col md:flex-row gap-8'>
        {/* main content */}
        <section className='w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6'>
          <form className='flex flex-col items-center gap-6'>
            <h1 className='text-2xl font-semibold'>Utbildningsbibliotek</h1>
            <div className='flex items-center mb-4'>
              <input
                type='text'
                placeholder='Sök en utbildning här...'
                className='border border-gray-300 rounded-md py-2 px-3 w-80 mr-2 flex-grow'
              />
              <button
                className='bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary'
                type='submit'
              >
                Sök
              </button>
            </div>
          </form>
          {/* Search results */}
          {/* Should render all if no search term is entered */}
          <section className='w-full flex flex-wrap justify-center md:justify-start gap-2 mt-10'>
            {education !== null ? (
              <>
                {educations?.map((education: Education) => (
                  <AdminCreateEduCards
                    key={education.id}
                    name={education.name}
                    infoClickHandler={() => {
                      setCurrentEducation(
                        filterEducationById(education.id, educations)
                      );
                      infoClickHandler();
                    }}
                    // education={education}
                    // onDelete={handleDelete}
                  />
                ))}
              </>
            ) : (
              <section className='w-full flex flex-col justify-center items-center gap-4'>
                <h2 className='text-2xl'>Inga övningar finns</h2>
                <p className=''>Skapa en nu!</p>
                <button
                  className='bg-primary text-white px-4 py-2 rounded-md hover:bg-indigo-50 hover:text-primary'
                  onClick={(e) => {
                    // e.preventDefault();
                    formClickHandler();
                  }}
                >
                  Skapa en övning
                </button>
              </section>
            )}
          </section>
        </section>

        <aside className='w-64'>
          <div className='w-full p-2'>
            <div
              className='flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background'
              onClick={formClickHandler}
            >
              <div className='rounded-full bg-primary text-white p-2'>
                <Plus />
              </div>
              <p>Lägg till en utbildning</p>
            </div>
          </div>
        </aside>
      </div>

      <Modal
        header={"Skapa en utbildning"}
        showModal={showModal}
        setShowModal={setShowModal}
      >
        {isInfo ? (
          <article className='w-full h-full'>
            {/* <h2>Här går resource beskrivningen in</h2>  */}
            {currentEducation && <div>{parse(currentEducation.content)}</div>}
          </article>
        ) : (
          <CreateEduAdminForm
            setShowModal={setShowModal}
            showModal={showModal}
          />
        )}
      </Modal>
    </UserLayout>
  );
};

export const getServerSideProps: GetServerSideProps = async (context: any) => {
  const currentSession = await getServerSession(
    context.req,
    context.res,
    nextAuthOptions
  );
  console.log("Current Session", currentSession);
  //Set up a trpc helper, needed for serverSide fetching
  const helpers = createServerSideHelpers({
    router: serverRouter,
    ctx: await createContext(context),
  });

  //Set up a trpc helper, needed for serverSide fetching
  console.log("Fetching module library with id:", educationId);
  //The actual fetching

  const res = await helpers.education.getAll.fetch();
  console.log("Fetch result:", res);
  console.log("Module library fetched:", res);
  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const education = JSON.parse(JSON.stringify(res));

  return {
    props: {
      session: currentSession,
      educations: education?.education || null,
    },
  };
};

export default EducationPage;

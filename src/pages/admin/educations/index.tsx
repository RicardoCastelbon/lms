import { nextAuthOptions } from "@/src/common/auth";
import { trpc } from "@/src/common/trpc";
import { education } from "@/src/common/validation/education";
import AdminCreateEduCards from "@/src/components/ui/cards/AdminCreateEduCards";
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
import React, { useState } from "react";
import { IconContext } from "react-icons";
import { createContext } from "@/src/server/context";
import { educationId } from "@/src/common/validation/global";

type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;
  education?: Education[];
};

const EducationPage = (props: Props) => {
  const { data: session } = useSession(); 
  const [showModal, setShowModal] = useState<boolean>(false);
  // const { quill, quillRef } = useQuill();
  const [education, setEducation] = useState<Education[]>(props.education || []);

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };

  const { mutateAsync: deleteEducation } = trpc.education.delete.useMutation();

    
  const handleDelete = async (educationId: number) => {
    // Optimistically remove the course from state
    setEducation(education.filter(education => educationId !== educationId));
  
    try {
      await deleteEducation({ educationId: String(educationId) });
    } catch (error) {
      console.error('Failed to delete course: ', error);
      // If the deletion fails, reset the state
      setEducation(props.education || []);
    }
  };

  return (
    <>
    
    
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
          {props.education && 
          props.education.map((education: Education) => (
          <AdminCreateEduCards
            key={education.id}
            education={education}
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
            <p>Lägg till en utbildning</p>
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
<CreateEduAdminForm closeModal={() => setShowModal(false)} />
</Modal>
    </>

)
  
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
  console.log("Fetching module library with id:", educationId);
  //The actual fetching

  //  const res = await helpers.education.getMany.fetch();
   const res = await helpers.education.getAll.fetch();
   console.log("Fetch result:", res);
   console.log("Module library fetched:", res);
  //Needed to serialize Date objects for createdAt + updatedAt otherwise error is thrown
  const education = JSON.parse(JSON.stringify(res));
  
  return {
    props: {
      session: currentSession,
      education: education?.education || null,
    },
};
};

export default EducationPage;

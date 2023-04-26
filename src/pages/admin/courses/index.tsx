import { Button } from "@/src/components/ui/button";
import { Calendar } from "@/src/components/ui/calendar";
import Layout from "@/src/components/ui/Layout";
import Modal from "@/src/components/ui/modals/Modal";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import UserLayout from "@/src/components/ui/UserLayout";
import { CalendarIcon, PlusIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";


type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;
};

const CoursesPage = (props: Props) => {
  const { data: session } = useSession(); 

return(
  <UserLayout role={session?.user.role ?? ""}>
    <div className="ml-32">
      <h1 className="text-2xl font-bold mb-4">Skapa en ny spännande kurs</h1>
      <div className="flex mb-4 items-center" style={{marginLeft: '-20px'}}>
        <input type="text" placeholder="Sök kurser här..." className="border border-gray-300 rounded-md py-2 px-3 w-80 mr-2" />
        <Button className="bg-purple-500 hover:bg-purple-600 text-white py-2 px-4 rounded-md flex items-center" style={{marginLeft: 'auto'}}>
          <PlusIcon className="h-5 w-5 mr-1" />
          Skapa kurs
        </Button>
      </div>

      {/* <div className="flex items-center">
        <CalendarIcon className="h-5 w-5 mr-1" />
        <p className="text-gray-500 text-sm">Datum:</p>
        <p className="ml-2 text-sm">01/01/2022 - 31/12/2022</p>
      </div> */}
      {/* <div className="bg-white rounded-md shadow-md p-4 mt-4">
      </div> */}
    </div>
    <Modal showModal={false} setShowModal={function (value: React.SetStateAction<boolean>): void {
        throw new Error("Function not implemented.");
      } } children={undefined} header={""}></Modal>
  </UserLayout>
  )
};


export default CoursesPage;

import Layout from "@/src/components/ui/Layout";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import UserLayout from "@/src/components/ui/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";


type Props = {
  sideBarClass: boolean;
  role?: string | null;
  admin?: string| null;
};

const CoursesPage = (props: Props) => {
  const { data: session } = useSession(); 
  return (
        <UserLayout  role={session?.user.role ?? ""}>

      
         <div className="ml-72"> 
        <h1>I am course page</h1>
      </div>
    </UserLayout>
  )
};


export default CoursesPage;

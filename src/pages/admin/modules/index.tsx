import CreateCourseForm from "@/src/components/ui/forms/teacher/CreateCourseForm";
import UserLayout from "@/src/components/ui/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";
import CreateModule from "./create-module";
type Props = {};

const ModulesPage = (props: Props) => {
  const { data: session } = useSession(); 

  return (
    <UserLayout  role={session?.user.role ?? ""}>
<CreateModule/>
<CreateCourseForm />
  {/* Render the UserSideNav component and pass the sideBarClass and role props */}
  {/* {session && <UserSideNav role={session?.user.role ?? ""} sideBarClass={false} />}    */}
  
     <div className="ml-72"> {/* Add some margin to account for the width of the side nav */}
    {/* <h1>I am module page</h1> */}
  </div>
</UserLayout>
)
  };

export default ModulesPage;

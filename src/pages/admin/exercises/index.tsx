import UserLayout from "@/src/components/ui/UserLayout";
import { useSession } from "next-auth/react";
import React from "react";

type Props = {};

const ExercisesPage = (props: Props) => {
  const { data: session } = useSession(); 

  return (
    <UserLayout  role={session?.user.role ?? ""}>

 
  
     <div className="ml-72"> 
    <h1>I am exercise page</h1>
  </div>
</UserLayout>
)
  };

export default ExercisesPage;

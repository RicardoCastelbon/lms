import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Role } from "@prisma/client";
// import Sidebar from "../../components/Sidebar";
import { useEffect, useState } from "react";
import Spinner from "@/src/components/ui/Spinner";
import Layout from "@/src/components/ui/Layout";
import UserSideNav from "@/src/components/ui/navigation/UserSideNav";
import Link from "next/link";
import UserLayout from "@/src/components/ui/UserLayout";
import CourseCard from "@/src/components/ui/cards/CourseCard";
import AdminCreateCards from "@/src/components/ui/cards/AdminCreateCards";
// import CalendarDemo from "@/src/components/ui/CalendarDemo";

const Dashboard: NextPage = ( )=> {


const adminCreate = [
  {
    id: 1,
    name: "Utbildningar",
    exercises: 14,
    slug: "/admin/educations",
  },
  {
    id: 2,
    name: "Kurser",
    exercises: 12,
    slug: "/admin/courses",
  },
  {
    id: 3,
    name: "Moduler",
    exercises: 14,
    slug: "/admin/modules",
  },
  {
    id: 4,
    name: "Övningar",
    exercises: 14,
    slug: "/admin/exercises",
    
  },

];
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);

  const { data: session, status } = useSession();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "authenticated") {
      if (session?.user?.role !== Role.ADMIN) {
        router.push("/401");
      }
    } else if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return <Spinner />;
  }

  return (
    <div className="bg-purple-100 min-h-screen">
      <div className="flex-flex sm:flex-row">
        <UserLayout role={session?.user.role ?? ""}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full md:w-3/6 lg:w-4/6 mx-auto mt-4">
            {adminCreate.map((create) => (
              <AdminCreateCards key={create.id} create={create} />
            ))}
          </div>
          <div className="mt-8">
            {/* <CalendarDemo /> */}
          </div>
        </UserLayout>
      </div>
    </div>
  );
  
};

export default Dashboard;

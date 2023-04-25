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
import { Calendar } from "lucide-react";


const Dashboard: NextPage = ( )=> {
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
    <div className='bg-purple-100 min-h-screen'>
    <div className='flex-flex sm:flex-row'>
    {/* <UserSideNav sideBarClass={sideBarClass} role={session?.user.role ?? ""} /> */}
      <UserLayout  role={session?.user.role ?? ""}>
        <div className='px-10 py-10 mt-8 md:mt-32'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mx-auto md:w-10/12'>
                    <div className='bg-gray-300 shadow-md rounded-md p-4 h-32 md:h-64 w-full md:w-8/12'>
                            <Link href='/admin/educations'>
                    <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left text-primary mt-8 hover:text-muted'>
                      Utbildningar
                    </h1>
                </Link>
              </div>
              <div className='bg-gray-300 shadow-md rounded-md p-4 h-32 md:h-64 w-full md:w-8/12'>
                <Link href='/admin/courses'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left text-primary mt-8 hover:text-muted'>
                      Kurser
                    </h1>
                </Link>
              </div>
              <div className='bg-gray-300 shadow-md rounded-md p-4 h-32 md:h-64 w-full md:w-8/12'>
                <Link href='/admin/modules'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left text-primary mt-8 hover:text-muted'>
                      Moduler
                    </h1>
                  
                </Link>
              </div>
              <div className='bg-gray-300 shadow-md rounded-md p-4 h-32 md:h-64 w-full md:w-8/12'>
                <Link href='/admin/exercises'>
              
                {/* <div className="w-full flex items-center justify-between max-w-md text-primary mt-8 hover:text-muted"> */}

                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left text-primary mt-8 hover:text-muted'>
                      Tester
                    </h1>
                    {/* </div> */}

                </Link>
              </div>
            </div>
          </div>
        </UserLayout>
      </div>
    </div>
  );
};

export default Dashboard;

import type { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { Role } from "@prisma/client";
import Sidebar from "../../components/Sidebar";
import { useEffect } from "react";

const Dashboard: NextPage = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    console.log("USEeffect dashboard", Role.ADMIN);
    if (session?.user?.role !== Role.ADMIN) {
      router.push("/login");
    }
  }, [status, session]);

  return (
    <div className='bg-purple-100 min-h-screen'>
      <div className='flex-flex sm:flex-row'>
        <Sidebar />
        <section className='pl-8 md:pl-24 ml-64 md:ml-96'>
          <div className='container mx-auto px-4 py-8'>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-x-8 h-full justify-center items-center'>
              <div className='bg-white shadow-md rounded-md p-4 md:p-20 h-64 w-full md:w-auto md:min-w-[35rem] max-w-[60rem] mx-auto mb-8 md:mb-0 card'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left'>
                  Utbildningar
                </h1>
              </div>
              <div className='bg-white shadow-md rounded-md p-4 md:p-20 h-64 w-full md:w-auto md:min-w-[35rem] max-w-[60rem] mx-auto'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left'>
                  Kurser
                </h1>
              </div>
              <div className='bg-white shadow-md rounded-md p-4 md:p-20 h-64 w-full md:w-auto md:min-w-[35rem] max-w-[60rem] mx-auto mb-8 md:mb-0'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left'>
                  Moduler
                </h1>
              </div>
              <div className='bg-white shadow-md rounded-md p-4 md:p-20 h-64 w-full md:w-auto md:min-w-[35rem] max-w-[60rem] mx-auto'>
                <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left'>
                  Tester
                </h1>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

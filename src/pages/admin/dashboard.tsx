import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { LogOutIcon, Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import { requireAuth } from "../../common/requireAuth";
import Link from "next/link";
import Sidebar from "../../components/Sidebar";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();
  return (
    <div className="bg-purple-100 min-h-screen">
      <div className="flex flex-col-reverse sm:flex-row">
        {/* <div className="bg-purple-200 w-full sm:w-1/5 p-4 flex flex-col h-screen">
          <h2 className="text-lg font-semibold mb-4 mt-0">Admin Dashboard</h2>
          <ul className="flex flex-col gap-2 flex-grow mt-0">
            <Link
              href="/admin/create-education"
              className="link text-black hover:text-purple-600"
            >
              Utbildning
            </Link>
            <Link
              href="/admin/create-course"
              className="link text-black hover:text-white"
            >
              Kurser
            </Link>
            <Link
              href="/admin/create-module"
              className="link text-black hover:text-white"
            >
              Moduler
            </Link>
            <Link
              href="/admin/create-exercise"
              className="link text-black hover:text-white"
            >
              Tester
            </Link>
            <div className="mt-auto flex flex-col">
              <div className="flex items-center mb-2">
                <Settings />
                <button className="btn btn-secondary ml-2">
                  Inställningar
                </button>
              </div>
              <div className="flex items-center">
                <LogOutIcon />
                <button
                  className="btn btn-secondary ml-2"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logga ut
                </button>
              </div>
            </div>
          </ul>
        </div> */}
                <Sidebar />
        <section>
          <div className="container mx-auto px-4 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white shadow-md rounded-md p-20 w-full h-64 md:h-[20rem] md:min-w-[30rem]">
                <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                  Utbildningar
                </h1>{" "}
              </div>
              <div className="bg-white shadow-md rounded-md p-20 w-full h-64 md:h-[20rem] md:min-w-[30rem]">
                <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                  Kurser{" "}
                </h1>{" "}
              </div>
              <div className="bg-white shadow-md rounded-md p-20 w-full h-64 md:h-[20rem] md:min-w-[30rem]">
                <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                  Moduler
                </h1>{" "}
              </div>
              <div className="bg-white shadow-md rounded-md p-20 w-full h-64 md:h-[20rem] md:min-w-[30rem]">
                <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                  Tester
                </h1>{" "}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;

{
  /* <div className="bg-red-100 flex-2 p-4 sm:p-12">
          <div className="bg-white shadow-md rounded-md p-4">
            <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
              Utbildningar
            </h1>
            <div className="flex justify-end items-center mb-4">
              <div className="h-8 w-8 rounded-full bg-gray-400 mr-2"></div>
              <span className="text-gray-800 font-medium">John Doe</span>
                        </div>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                          <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                            <h2 className="text-lg font-semibold mb-2">Card 1</h2>
                            <p>Card content goes here.</p>
                          </div>
                          <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                            <h2 className="text-lg font-semibold mb-2">Card 2</h2>
                            <p>Card content goes here.</p>
                          </div>
                          <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                            <h2 className="text-lg font-semibold mb-2">Card 3</h2>
                            <p>Card content goes here.</p>
                          </div>
                          <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                            <h2 className="text-lg font-semibold mb-2">Card 4</h2>
                            <p>Card content goes here.</p>
                          </div>
                        </div>
                      </div>
                      </div>
            <div className="bg-blue-100 flex-1 p-4 sm:p-12">
              <div className="bg-white shadow-md rounded-md p-4">
                <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                  Kurser
                </h1>
                  <div className="flex justify-end items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-800 font-medium">John Doe</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-yellow-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 1</h2>
                      <p>Card content goes here.</p>
                    </div>
                    <div className="bg-green-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 2</h2>
                      <p>Card content goes here.</p>
                    </div>
             
            </div>
          </div>
              </div>
              <div className="bg-green-100 flex-1 p-4 sm:p-12">
                <div className="bg-white shadow-md rounded-md p-4">
                  <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                    Moduler
                  </h1>
                  <div className="flex justify-end items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-800 font-medium">John Doe</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 1</h2>
                      <p>Card content goes here.</p>
                    </div>
                    <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 2</h2>
                      <p>Card content goes here.</p>
                    </div>
                  
                  </div>
                </div>
              </div>
              <div className="bg-purple-100 flex-1 p-4 sm:p-12">
                <div className="bg-white shadow-md rounded-md p-4">
                  <h1 className="text-2xl font-semibold mb-8 text-center sm:text-left">
                    Kurser
                  </h1>
                  <div className="flex justify-end items-center mb-4">
                    <div className="h-8 w-8 rounded-full bg-gray-400 mr-2"></div>
                    <span className="text-gray-800 font-medium">John Doe</span>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 1</h2>
                      <p>Card content goes here.</p>
                    </div>
                    <div className="bg-purple-200 rounded-lg p-2 sm:h-64">
                      <h2 className="text-lg font-semibold mb-2">Card 2</h2>
                      <p>Card content goes here.</p>
                    </div>
                  
            </div>
          </div>
        </div> */
}

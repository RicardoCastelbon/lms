import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
        <div className="bg-purple-100">
          <div className="flex flex-row h-full">
            <div className="bg-purple-200 w-1/5 p-4">
              <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
              <ul className="flex flex-col gap-2">
        <li>
          <a href="#" className="text-purple-800 hover:text-purple-600">
            Kurser
          </a>
        </li>
        <li>
          <a href="#" className="text-purple-800 hover:text-purple-600">
            Title 2
          </a>
        </li>
        <li>
          <a href="#" className="text-purple-800 hover:text-purple-600">
            Title 3
          </a>
        </li>
        <li>
          <a href="#" className="text-purple-800 hover:text-purple-600">
            Title 4
          </a>
        </li>
        <ul className="flex flex-col gap-2">
          <li>
            <button className="btn btn-secondary mr-2">Settings</button>
          </li>
          <li>
            <button
              className="btn btn-secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button>
          </li>
        </ul>
      </ul>
            </div>
            <div className="bg-white flex-1 min-h-screen p-12 mx-auto my-4 mr-4">
              <h1 className="text-2xl font-semibold mb-8">Kurser</h1>
              <div className="flex justify-end items-center mb-4">
                 <div className="h-8 w-8 rounded-full bg-gray-400 mr-2"></div>
                  <span className="text-gray-800 font-medium">John Doe</span>
                </div>
              <div className="grid grid-cols-4 gap-4">
                <div className="bg-purple-200 rounded-lg p-2 m-2 h-64">
                  <h2 className="text-lg font-semibold mb-2">Card 1</h2>
                  <p>Card content goes here.</p>
                </div>
                <div className="bg-purple-200 rounded-lg p-2 m-2 h-64">
                  <h2 className="text-lg font-semibold mb-2">Card 2</h2>
                  <p>Card content goes here.</p>
                </div>
                <div className="bg-purple-200 rounded-lg p-2 m-2 h-64">
                  <h2 className="text-lg font-semibold mb-2">Card 3</h2>
                  <p>Card content goes here.</p>
                </div>
                
                <div className="bg-purple-200 rounded-lg p-2 m-2 h-64">
                  <h2 className="text-lg font-semibold mb-2">Card 4</h2>
                  <p>Card content goes here.</p>
                </div>
              </div>
              <div className="flex justify-between items-center mt-8">
                <div className="inline-block bg-blue-50 p-2 rounded-lg">
                    <button className="btn btn-primary">Lägg till kurs</button>
                </div>
                </div>
            </div>
          </div>
        </div>
      );
      
  
  
};

export default Dashboard;

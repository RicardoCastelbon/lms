import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const adminDashboard: NextPage = () => {
  const { data } = useSession();

  return (
<div className="bg-purple-100 h-screen">
  <div className="flex flex-row h-full">
    <div className="bg-purple-200 w-1/5 p-4 flex flex-col justify-between">
      <div>
        <h2 className="text-lg font-semibold mb-4">Admin Dashboard</h2>
        <ul className="flex flex-col gap-2">
          <li>
            <a href="#" className="text-purple-800 hover:text-purple-600">
              Title 1
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
          <li>
            <a href="#" className="text-purple-800 hover:text-purple-600">
              Title 5
            </a>
          </li>
        </ul>
      </div>
      <div className="mt-auto">
        <button className="btn btn-secondary mr-2">Settings</button>
        <button
          className="btn btn-secondary"
          onClick={() => signOut({ callbackUrl: "/" })}
        >
          Logout
        </button>
      </div>
    </div>
    <div className="bg-white flex-1 min-h-screen p-8 mx-auto my-4 mr-4">
      <h1 className="text-2xl font-semibold mb-8">Kurser</h1>
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
    </div>
  </div>
</div>

  );
  
  
};

export default adminDashboard;

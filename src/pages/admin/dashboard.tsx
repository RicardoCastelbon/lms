import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";
import { LogOutIcon, Settings } from "lucide-react";
import { LogOut } from "lucide-react";
import { requireAuth } from "../../common/requireAuth";
import { Settings2 } from "lucide-react";
import Link from "next/link";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <div className='bg-purple-100'>
      <div className='flex flex-col sm:flex-row'>
        <div className='bg-purple-200 w-full sm:w-1/5 p-4'>
          <h2 className='text-lg font-semibold mb-4'>Admin Dashboard</h2>
          <ul className='flex flex-col gap-2'>
            <Link
              href='/admin/create-education'
              className='link text-black hover:text-purple-600'
            >
              Utbildning
            </Link>

            <Link
              href='/admin/create-course'
              className='link text-black hover:text-white'
            >
              Kurser
            </Link>
            <Link
              href='/admin/create-module'
              className='link text-black hover:text-white'
            >
              Moduler
            </Link>
            <Link
              href='/admin/create-exercise'
              className='link text-black hover:text-white'
            >
              Tester
            </Link>
            <div className='flex '>
              <ul className='flex flex-col gap-2 mt-50'>
                <li className='flex items-center'>
                  <Settings />
                  <button className='btn btn-secondary ml-2'>
                    Inställningar
                  </button>
                </li>
                <li className='flex items-center mt-2'>
                  <LogOutIcon />
                  <button
                    className='btn btn-secondary ml-2'
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    Logga ut
                  </button>
                </li>
              </ul>
            </div>
          </ul>
        </div>
        <div className='bg-white flex-1 min-h-screen p-4 sm:p-12 mx-auto my-4'>
          <h1 className='text-2xl font-semibold mb-8 text-center sm:text-left'>
            Senast uppdaterade
          </h1>
          <div className='flex justify-end items-center mb-4'>
            <div className='h-8 w-8 rounded-full bg-gray-400 mr-2'></div>
            <span className='text-gray-800 font-medium'>John Doe</span>
          </div>
          <div className='grid grid-cols-2 sm:grid-cols-4 gap-4'>
            <div className='bg-purple-200 rounded-lg p-2 h-48 sm:h-64'>
              <h2 className='text-lg font-semibold mb-2'>Card 1</h2>
              <p>Card content goes here.</p>
            </div>
            <div className='bg-purple-200 rounded-lg p-2 h-48 sm:h-64'>
              <h2 className='text-lg font-semibold mb-2'>Card 2</h2>
              <p>Card content goes here.</p>
            </div>
            <div className='bg-purple-200 rounded-lg p-2 h-48 sm:h-64'>
              <h2 className='text-lg font-semibold mb-2'>Card 3</h2>
              <p>Card content goes here.</p>
            </div>
            <div className='bg-purple-200 rounded-lg p-2 h-48 sm:h-64'>
              <h2 className='text-lg font-semibold mb-2'>Card 4</h2>
              <p>Card content goes here.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

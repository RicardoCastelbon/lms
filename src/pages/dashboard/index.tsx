import type { NextPage } from "next";
import { useSession, signOut } from "next-auth/react";

import { requireAuth } from "../../common/requireAuth";
import Link from "next/link";

export const getServerSideProps = requireAuth(async (ctx) => {
  return { props: {} };
});

const Dashboard: NextPage = () => {
  const { data } = useSession();

  return (
    <>
      {/* pagewrapper */}
      <div className="w-full p-4 bg-layout font-mont">
        {/* sidebar wrapper */}
        <div className="">
          <nav className="h-[calc(100vh-2rem)] flex flex-col justify-between">
            {/* nav top items */}
            <div className="flex flex-col gap-4">
              <Link className="" href="/dashboard">
                Kurser
              </Link>
              <Link className="" href="/dashboard">
                Personer
              </Link>
              <Link className="" href="/dashboard">
                Omdömen
              </Link>
            </div>
            {/* nav bottom items */}
            <div className="flex flex-col gap-4 justify-self-end">
              <Link className="" href="/dashboard">
                Inställningar
              </Link>
              <Link className="" href="/dashboard">
                Logga ut
              </Link>
            </div>
          </nav>
        </div>
        {/* main content */}
        <main className=""></main>
      </div>
      {/*  <button
              className="btn btn-secondary"
              onClick={() => signOut({ callbackUrl: "/" })}
            >
              Logout
            </button> */}
    </>
  );
};

export default Dashboard;

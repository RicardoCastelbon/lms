import { useEffect, useState } from "react";
import type { GetServerSideProps, NextPage } from "next";
import { useSession } from "next-auth/react";
import { getServerSession } from "next-auth";
import { useRouter } from "next/router";

import UserLayout from "@/src/components/ui/UserLayout";
import { IconContext } from "react-icons";
import { nextAuthOptions } from "@/src/common/auth";
import CourseCard from "@/src/components/ui/cards/CourseCard";
import { Plus, X } from "lucide-react";
import ColorSelect from "@/src/components/ui/dropdowns/ColorSelect";

const courses = [
  {
    id: 1,
    name: "Frontend-utveckling",
    exercises: 14,
    slug: "frontend-utveckling",
  },
  {
    id: 2,
    name: "Backend-utveckling",
    exercises: 12,
    slug: "backend-utveckling",
  },
  {
    id: 3,
    name: "UX-Design",
    exercises: 14,
    slug: "ux-design",
  },
];
const Dashboard: NextPage = () => {
  const [sideBarClass, setSideBarClass] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();
  const [showModal, setShowModal] = useState<boolean>(false);
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.push("/401");
    }
  }, [session]);

  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        setScreenWidth(window.innerWidth);

        if (window.innerWidth > 768) {
          setSideBarClass(false);
        }
      }
    }
    window.addEventListener("resize", getScreenSize);

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenWidth]);

  const modalClickHandler = () => {
    setShowModal((prev) => !prev);
  };

  return (
    <IconContext.Provider value={{ className: "text-primary " }}>
      <UserLayout>
        <div className="w-full flex flex-col md:flex-row gap-8">
          {/* Main content */}
          <div className="w-full h-full flex flex-wrap justify-center gap-4 md:justify-start md:w-3/6 lg:w-4/6">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
          {/* Aside right */}
          <aside className="flex-1 bg-green">
            {/* quick-menu */}
            <div className="w-full p-2">
              {/* quick menu items */}
              <div
                className="flex items-center gap-2 bg-card p-4 rounded-lg hover:cursor-pointer hover:bg-background"
                onClick={modalClickHandler}
              >
                <div className="rounded-full bg-primary text-white p-2">
                  <Plus />
                </div>
                <p>Lägg till kurs</p>
              </div>
            </div>
          </aside>
        </div>

        {/* Create course modal overlay */}
        <div
          className={`${
            showModal ? "fixed" : "hidden"
          } top-0 left-0 w-screen h-screen bg-black flex justify-center items-center`}
          style={{ opacity: "0.6" }}
        ></div>
        {/* popup modal */}
        <div
          className={`${
            showModal ? "fixed" : "hidden"
          } z-20 top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 w-5/6 h-5/6 max-w-[1000px] bg-white rounded-lg`}
          style={{ opacity: "1" }}
        >
          {/* modal header */}
          <div className="w-full justify-between flex p-4 border-b border-foreground">
            <h2 className="text-lg font-semibold text-foreground">
              Skapa en kurs
            </h2>
            <X
              className="hover:text-primary hover:cursor-pointer"
              onClick={modalClickHandler}
            />
          </div>
          <div className="w-full p-4">
            <form className="flex gap-4">
              {/* left side */}
              <section className="flex-1 flex flex-col gap-4">
                {/* form group */}
                <div className="flex flex-col">
                  <label htmlFor="title">Titel</label>
                  <input
                    id="title"
                    className="input bg-muted h-[40px] input-bordered w-full mt-2 rounded-md pl-2 text-sm"
                    type="text"
                    placeholder="Ge kursen ett namn"
                  />
                </div>
                <div className="flex flex-col">
                  <p>Välj ikon</p>
                </div>
                <div className="flex flex-col">
                  {/* <label htmlFor="color">Välj en bakgrundsfärg</label> */}
                  <ColorSelect />
                </div>
              </section>
              {/* Right side */}
              <section className="flex-1 bg-primary"></section>
            </form>
          </div>
        </div>
      </UserLayout>
    </IconContext.Provider>
  );
};

/* getServerSideProps */
export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      session: await getServerSession(
        context.req,
        context.res,
        nextAuthOptions
      ),
    },
  };
};
export default Dashboard;

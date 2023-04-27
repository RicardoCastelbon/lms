import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import UserLayout from "@/src/components/ui/UserLayout";
import { Button } from "@/src/components/ui/button";
import { Check, ClipboardList, Plus, PlusCircle } from "lucide-react";

type Props = {};
interface IModule {
  module: string;
  start: string;
  end: string;
  status: string;
  exercises_completed: string;
}

const CourseOverview = (props: Props) => {
  const data = [
    {
      module: "useState",
      start: "14 April",
      end: "15 May",
      status: "Not completed",
      exercises_completed: "5/15",
    },
    {
      module: "useEffect",
      start: "14 April",
      end: "15 May",
      status: "Not completed",
      exercises_completed: "5/15",
    },
    {
      module: "useRef",
      start: "14 April",
      end: "15 May",
      status: "Not completed",
      exercises_completed: "5/15",
    },
  ];

  const [modules, setModules] = useState<IModule[]>([]);
  useEffect(() => {
    setModules(data);
  }, []);

  const [desktopVersion, setdesktopVersion] = useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>();

  //Remove open state for sidenav when screen width > 768px
  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        setScreenWidth(window.innerWidth);

        if (window.innerWidth > 768) {
          setdesktopVersion(true);
        } else {
          setdesktopVersion(false);
        }
      }
    }
    window.addEventListener("resize", getScreenSize);

    return () => {
      window.removeEventListener("resize", getScreenSize);
    };
  }, [screenWidth]);

  return (
    <>
      <UserLayout>
        <div className="flex p-1">
          <section className=" w-full h-full bg-cyan-50 font-mont">
            <p className=" ">Courses -&gt; React (breadcrums)</p>
            <h1 className="text-lg font-semibold my-16">
              Frontend development in React (title of the course)
            </h1>
            <section className="">
              <div className="w-full">
                <ul className="flex font-medium text-slate-400">
                  <li className="md:w-48 ">Modules</li>
                  {desktopVersion && <li className="w-32">Start</li>}
                  {desktopVersion && <li className="w-32">End</li>}
                  {desktopVersion && <li className="w-36">Status</li>}
                  {desktopVersion && <li className="w-32">Completed</li>}
                </ul>
              </div>
              {modules.map((module) => (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="w-full">
                        <ul className="flex">
                          <li className="w-16 text-left">
                            <ClipboardList />
                          </li>
                          <li className="w-32 text-left">{module.module}</li>
                          {desktopVersion && (
                            <li className="w-32 text-left">{module.start}</li>
                          )}
                          {desktopVersion && (
                            <li className="w-32 text-left">{module.end}</li>
                          )}
                          {desktopVersion && (
                            <li className="w-36 text-left">{module.status}</li>
                          )}
                          {desktopVersion && (
                            <li className="w-32 text-left">
                              {module.exercises_completed}
                            </li>
                          )}
                          {desktopVersion && (
                            <li className="w-32">
                              <Button>
                                <Plus />
                                Exercises
                              </Button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* TIPTAP CONTENT */}
                      <h2 className="text-xl font-semibold mb-7">
                        useState in React
                      </h2>
                      <p className="mb-4 pr-20">
                        Lorem, ipsum dolor sit amet consectetur adipisicing
                        elit. Sint neque recusandae consequatur dolore
                        repellendus pariatur vitae adipisci veritatis dolorum
                        perspiciatis excepturi officia illo dolor, ab eveniet
                        aperiam autem. Porro sapiente facere nisi. Culpa nulla
                        earum laboriosam vel porro reprehenderit voluptate!
                      </p>
                      <h3 className="text-lg font-semibold mb-2">Resources</h3>
                      <a href="www.google.com" className="block mb-3">
                        www.google.com
                      </a>
                      <a href="www.google.com" className="block">
                        www.google.com
                      </a>
                      <Accordion type="single" collapsible>
                        <AccordionItem value="item-1">
                          <AccordionTrigger>
                            <div className="w-full">
                              <ul className="flex justify-between pr-5 text-base">
                                <li className="">
                                  See all the exercises in the module
                                </li>
                                <li className="">3/5{/* COMPLETED/TOTAL */}</li>
                              </ul>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <button className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400">
                              <div className="flex">
                                <span className=" mr-4">
                                  <ClipboardList />
                                </span>
                                <span>Create a React project</span>
                              </div>
                              <span className="">
                                <Check />
                              </span>
                            </button>
                            <button className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400">
                              <div className="flex">
                                <span className=" mr-4">
                                  <ClipboardList />
                                </span>
                                <span>File structure in React</span>
                              </div>
                              <span className="">
                                <Check />
                              </span>
                            </button>
                            <button className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400">
                              <div className="flex">
                                <span className=" mr-4">
                                  <ClipboardList />
                                </span>
                                <span>Components in React</span>
                              </div>
                              <span className="">
                                <Check />
                              </span>
                            </button>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </section>
          </section>
          {desktopVersion && (
            <section className="p-6">
              <button className=" flex w-52 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border border-b-0 rounded border-indigo-500">
                <span className="mr-3">
                  <PlusCircle />
                </span>
                <span> Add a module</span>
              </button>
              <button className=" flex w-52 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border border-b-0 rounded border-indigo-500">
                <span className="mr-3">
                  <PlusCircle />
                </span>
                <span>Update a module</span>
              </button>
              <button className=" flex w-52 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border rounded border-indigo-500">
                <span className="mr-4">
                  <PlusCircle />
                </span>
                <span> Add a student</span>
              </button>
            </section>
          )}
        </div>
      </UserLayout>
    </>
  );
};

export default CourseOverview;

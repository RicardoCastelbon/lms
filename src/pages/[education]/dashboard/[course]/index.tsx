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
      end: "15 Maj",
      status: "Ej klar",
      exercises_completed: "5/15",
    },
    {
      module: "useEffect",
      start: "14 April",
      end: "15 Maj",
      status: "Ej klar",
      exercises_completed: "5/15",
    },
    {
      module: "useRef",
      start: "14 April",
      end: "15 Maj",
      status: "Ej klar",
      exercises_completed: "5/15",
    },
  ];

  const [modules, setModules] = useState<IModule[]>([]);
  useEffect(() => {
    if (window.innerWidth > 768) {
      setdesktopVersion(true);
    } else {
      setdesktopVersion(false);
    }
    setModules(data);
  }, []);

  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();

  //Remove open state for sidenav when screen width > 768px
  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
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
            <p className=" ">Kurser -&gt; React</p>
            <h1 className="text-2xl font-bold my-16">
              Frontend-utveckling i React
            </h1>
            <section className="">
              <div className="w-full">
                <ul className="flex font-medium text-slate-400">
                  <li className="md:w-48 ">Moduler</li>
                  {desktopVersion && <li className="w-32">Startdatum</li>}
                  {desktopVersion && <li className="w-32">In.datum</li>}
                  {desktopVersion && <li className="w-36">Status</li>}
                  {desktopVersion && <li className="w-32">Uppgifter</li>}
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
                                Uppgift
                              </Button>
                            </li>
                          )}
                        </ul>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      {/* TIPTAP CONTENT */}
                      <h2 className="text-xl font-semibold mb-7">
                        useState i React
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
                                  Se alla uppgifter för modulen
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
                                <span>Skapa ett React-projekt</span>
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
                                <span>Filstrukture i React</span>
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
                                <span>Components i React</span>
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
            <section className="pl-5">
              <button className=" flex w-56 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border border-b-0 rounded border-indigo-500">
                <span className="mr-3">
                  <PlusCircle />
                </span>
                <span>Lägg till modul</span>
              </button>
              <button className=" flex w-56 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border border-b-0 rounded border-indigo-500">
                <span className="mr-3">
                  <PlusCircle />
                </span>
                <span>Uppdatera modul</span>
              </button>
              <button className=" flex w-56 p-3 bg-indigo-50 hover:bg-indigo-200 font-semibold border rounded border-indigo-500">
                <span className="mr-4">
                  <PlusCircle />
                </span>
                <span>Lägg till deltagare</span>
              </button>
            </section>
          )}
        </div>
      </UserLayout>
    </>
  );
};

export default CourseOverview;

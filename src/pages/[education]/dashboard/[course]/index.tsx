import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import UserLayout from "@/src/components/ui/UserLayout";
import { Button } from "@/src/components/ui/button";

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
      module: "React",
      start: "14 April",
      end: "15 May",
      status: "Not completed",
      exercises_completed: "5/15",
    },
    {
      module: "Angular",
      start: "14 April",
      end: "15 May",
      status: "Not completed",
      exercises_completed: "5/15",
    },
    {
      module: "Node.js",
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

  return (
    <>
      <UserLayout>
        <div className="flex p-10">
          <section className=" w-full h-full bg-cyan-50 font-mont">
            <p className="font-popp mb-10">Courses -&gt; React (breadcrums)</p>
            <h1 className="text-lg mb-10">
              Frontend development in React (title of the course)
            </h1>
            <section className="">
              <div className="w-full">
                <ul className="flex font-medium text-slate-400">
                  <li className="w-32">Modules</li>
                  <li className="w-32">Start</li>
                  <li className="w-32">End</li>
                  <li className="w-36">Status</li>
                  <li className="w-32">Completed</li>
                </ul>
              </div>
              {modules.map((module) => (
                <Accordion type="single" collapsible>
                  <AccordionItem value="item-1">
                    <AccordionTrigger>
                      <div className="w-full">
                        <ul className="flex">
                          <li className="w-32 text-left">{module.module}</li>
                          <li className="w-32 text-left">{module.start}</li>
                          <li className="w-32 text-left">{module.end}</li>
                          <li className="w-36 text-left">{module.status}</li>
                          <li className="w-32 text-left">
                            {module.exercises_completed}
                          </li>
                          <li className="w-32">
                            <Button>Exercises</Button>
                          </li>
                        </ul>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
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
                                <li className="">3/5</li>
                              </ul>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <button>Create a React project </button>
                          </AccordionContent>
                        </AccordionItem>
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              ))}
            </section>
          </section>
          {/*   <section className="p-10">
            <div>
              <Button>Add</Button>
            </div>
            <div>
              <Button>Add</Button>
            </div>
            <div>
              <Button>Add</Button>
            </div>
          </section> */}
        </div>
      </UserLayout>
    </>
  );
};

export default CourseOverview;

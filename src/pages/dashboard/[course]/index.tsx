import React, { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import UserLayout from "@/src/components/ui/UserLayout";

type Props = {};
interface IModule {
  module: string;
  start: string;
  end: string;
  status: string;
  exercises_completed: string;
}

const ExercisesOverview = (props: Props) => {
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
        <section className="w-full h-full bg-cyan-50 font-mont">
          <p className="p-8 font-popp">Courses - React (breadcrums)</p>
          <h1 className="p-8 text-lg">
            Frontend development in React (title of the course)
          </h1>
          <section className="">
            <table>
              <thead>
                <tr>
                  <th>Modules</th>
                  <th>Start</th>
                  <th>End</th>
                  <th>Status</th>
                  <th>Exercises Completed</th>
                </tr>
              </thead>
              <tbody></tbody>
            </table>
            <div className="w-full">
              <ul className="flex justify-evenly">
                <li>Modules</li>
                <li className="justify-start">Start</li>
                <li className="justify-start">End</li>
                <li className="justify-start">Status</li>
                <li className="justify-start">Exercises Completed</li>
              </ul>
            </div>
            <div>
              <Accordion type="single" collapsible>
                <AccordionItem value="item-1">
                  <AccordionTrigger>
                    <div className="w-full">
                      <ul className="flex justify-evenly">
                        <li className="justify-start">UseState</li>
                        <li className="justify-start">14 April</li>
                        <li className="justify-start">14 May</li>
                        <li className="justify-start">Not done</li>
                        <li className="justify-start">5/15</li>
                      </ul>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    Yes. It adheres to the WAI-ARIA design pattern.
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </div>
          </section>
        </section>
      </UserLayout>
    </>
  );
};

export default ExercisesOverview;

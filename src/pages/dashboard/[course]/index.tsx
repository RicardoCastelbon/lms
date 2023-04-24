import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

type Props = {};

const ExercisesOverview = (props: Props) => {
  return (
    <>
      <main className="w-screen h-screen bg-cyan-50 font-mont">
        <p className="p-8 font-popp">Courses - React (breadcrums)</p>
        <h1 className="p-8 text-lg">
          Frontend development in React (title of the course)
        </h1>
        <section className="">
          <div className="w-full">
            <ul className="flex justify-evenly">
              <li>Modules</li>
              <li>Start</li>
              <li>End</li>
              <li>Status</li>
              <li>Completed</li>
            </ul>
          </div>
          <div></div>
        </section>
      </main>
    </>
  );
};

export default ExercisesOverview;

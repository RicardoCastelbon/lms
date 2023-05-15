import { Module } from "@prisma/client";
import React, { useEffect, useState } from "react";
import Link from "next/link";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/src/components/ui/accordion";
import { Check, ClipboardList, Plus } from "lucide-react";
import parse from "html-react-parser";
import { useSession } from "next-auth/react";
import { GetServerSideProps } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "@/src/common/auth";
import { createServerSideHelpers } from "@trpc/react-query/server";
import { serverRouter } from "@/src/server/routers";
import { createContext } from "@/src/server/context";
import { Action } from "@/src/lib/enums/actionEnums";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";
import { useRouter } from "next/router";

type Props = {
  module: ModuleRenderSchema;
  modalClickHandler: (action: Action) => void;
};

const ModuleAccordion = ({ module, modalClickHandler }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data: session } = useSession();

  const router = useRouter();
  console.log(router.asPath);

  useEffect(() => {
    if (window.innerWidth > 768) {
      setdesktopVersion(true);
    } else {
      setdesktopVersion(false);
    }
  }, []);

  //Remove open state for sidenav when screen width > 768px
  useEffect(() => {
    function getScreenSize() {
      if (typeof window !== "undefined") {
        if (window.innerWidth > 1024) {
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
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-full">
            <ul className="flex">
              <li className="w-16 text-left">
                <ClipboardList />
              </li>
              <li className="w-32 text-left">{module.title}</li>
              {desktopVersion && (
                <li className="w-32 text-left">{module.startDate}</li>
              )}
              {desktopVersion && (
                <li className="w-32 text-left">{module.endDate}</li>
              )}
              {desktopVersion && <li className="w-36 text-left">"status"</li>}
              {desktopVersion && (
                <li className="w-32 text-left">"exercises completed"</li>
              )}
              {desktopVersion &&
                (session?.user.role === "TEACHER" ? (
                  <li className="w-32">
                    <div
                      onClick={() => modalClickHandler(Action.CREATEEXERCISE)}
                      className="flex gap-2 p-2 rounded bg-primary hover:bg-indigo-400 text-white"
                    >
                      <Plus />
                      Uppgift
                    </div>
                  </li>
                ) : (
                  ""
                ))}
            </ul>
          </div>
        </AccordionTrigger>
        <AccordionContent>
          <div>{parse(module.content)}</div>
          <Accordion type="single" collapsible>
            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="w-full">
                  <ul className="flex justify-between pr-5 text-base">
                    <li className="">Se alla uppgifter för modulen</li>
                    <li className="">3/5</li>
                  </ul>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {module.exercises &&
                  module.exercises.map((exercise, index) => (
                    <Link
                      href={`/${router.asPath}/exercise/${exercise.slug}`}
                      key={index}
                      className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400"
                    >
                      <div className="flex">
                        <span className=" mr-4">
                          <ClipboardList />
                        </span>
                        <span>{exercise.title}</span>
                      </div>
                      <span className="">
                        <Check />
                      </span>
                    </Link>
                  ))}
                {/*  <button className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400">
                  <div className="flex">
                    <span className=" mr-4">
                      <ClipboardList />
                    </span>
                    <span>Filstrukture i React</span>
                  </div>
                  <span className="">
                    <Check />
                  </span>
                </button> */}
                {/*  <button className="flex justify-between w-full bg-accent text-white text-left p-4 hover:bg-blue-400">
                  <div className="flex">
                    <span className=" mr-4">
                      <ClipboardList />
                    </span>
                    <span>Components i React</span>
                  </div>
                  <span className="">
                    <Check />
                  </span>
                </button> */}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleAccordion;

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
import { trpc } from "@/src/common/trpc";

// type Props = {
//   module: ModuleRenderSchema;
//   modalClickHandler: (action: Action) => void;
// };

type Props = {
  userModule: Module;
  modalClickHandler: (action: Action) => void;
  role: string | null | undefined;

};

const ModuleAccordion = ({ userModule, modalClickHandler, role }: Props) => {
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data: session } = useSession();
  const { mutateAsync } = trpc.module.update.useMutation();
  const [isPublished, setIsPublished] = useState<boolean>(false);


  const router = useRouter();
  console.log(router.asPath);
  useEffect(() => {
    if (userModule) {
      setIsPublished(userModule.published);
    }
  }, [userModule]);
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

  const publishClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    userModule: Module
  ) => {
    e.preventDefault();
    if (session?.user.role !== "TEACHER") return;

    const result = await mutateAsync({
      moduleId: String(userModule.id),
      body: {
        ...userModule,
        published: userModule.published ? false : true,
        
      },
    });
    if (result) {
      setIsPublished(!isPublished);
    }
      };
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
        <AccordionTrigger>
          <div className="w-full">
            <ul className="flex">
              <li className="w-16 text-left">
                <ClipboardList />
              </li>
              <li className="w-32 text-left">{userModule && userModule.title}</li>
              {desktopVersion && (
                <li className="w-32 text-left">{userModule && userModule.startDate}</li>
              )}
              {desktopVersion && (
                <li className="w-32 text-left">{userModule &&  userModule.endDate}</li>
              )}
              {desktopVersion && <li className="w-36 text-left">"status"</li>}
              {desktopVersion && (
                <li className="w-32 text-left">"exercises completed"</li>
              )}
              {role && role === "TEACHER" ? (
                <>
                userModule.published
                <li className="w-32">
              <button
                className={isPublished ? "bg-red-500 text-white py-2 px-6 rounded-sm hover:bg-red-50 hover:text-foreground" : "bg-green-500 text-white py-2 px-6 rounded-sm hover:bg-green-50 hover:text-foreground"}
                onClick={(e) => publishClickHandler(e, userModule)}
              >
                {isPublished ? 'Nej' : 'Ja'}
              </button>
            </li>
     </>
) : (
  ""
)}

            </ul>
          </div>
        </AccordionTrigger>
        <AccordionContent>
        <div>{userModule?.content && typeof userModule.content === 'string' ? parse(userModule.content) : 'Loading...'}</div>
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
                {userModule &&  userModule.exercises &&
                  userModule && userModule.exercises.map((exercise, index) => (
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


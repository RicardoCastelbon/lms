import { Exercise, Module } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
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
import { Trash2 } from "lucide-react";
import { ResourceType } from "@/src/lib/enums/resourceTypeEnum";

// type Props = {
//   module: ModuleRenderSchema;
//   modalClickHandler: (action: Action) => void;
// };
type Resource = Exercise | ModuleRenderSchema;

type Props = {
   resource?: Exercise[] ;
  setResourceId: Dispatch<SetStateAction<number>>;
  userModule: ModuleRenderSchema;
  modalClickHandler: (action: Action) => void;
  role: string | null | undefined;
  getModuleId: (moduleId: number) => void;
};

const ModuleAccordion = ({
  userModule,
  modalClickHandler,
  getModuleId,
  role,
  resource
}: 
Props) => {
  const [resourceType, setResourceType] = useState<ResourceType | null>(null);

  const [resourceData, setResourceData] = useState<Resource[] | undefined>(
    resource
  );
  const [desktopVersion, setdesktopVersion] = useState<boolean>(true);
  const [screenWidth, setScreenWidth] = useState<number>();
  const { data: session } = useSession();
  const [isPublished, setIsPublished] = useState<boolean>(false);
  const { mutateAsync } = trpc.module.update.useMutation();
  const { mutateAsync: deleteExerciseAsync } =
    trpc.exercise.delete.useMutation();
  const router = useRouter();
  // console.log(typeof router.query.course);
  useEffect(() => {
    if (userModule) {
      // setIsPublished(userModule.published);
    }
    // console.log("usermodule", userModule);
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
    e: React.MouseEvent<HTMLDivElement, MouseEvent>,
    userModule: ModuleRenderSchema
  ) => {
    e.preventDefault();
    if (role !== "TEACHER") return;

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


// Delete function for exercises
const deleteHandle = async (id: number) => {
  if (role !== "TEACHER") return;
  if (resourceType === ResourceType.EXERCISE) {
    const result = await deleteExerciseAsync({
      exerciseId: id,
    });

    if (result.success) {
      filterResourceArray(resource, id);
    }
  }
};
const filterResourceArray = (
  resource: Resource[] | undefined,
  id: number
) => {
  if (!resource) return;
  const filteredArray = resource?.filter((item) => item.id !== id);
  setResourceData([...filteredArray]);
};

// const handleTrashClick = (id: number) => {
//   deleteHandle(id);
// };


  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1">
<AccordionTrigger>
  <div className="w-full">
    <ul className="flex">
      <li className="md:w-48 text-left">
        <ClipboardList />
        {userModule && userModule.title}
      </li>
      {desktopVersion && <li className="w-36 text-left">status</li>}
      {desktopVersion && (
        <li className="w-32 text-left">exercises completed</li>
      )}

{desktopVersion &&
  (session?.user.role === "TEACHER" ? (
    <li className="w-32 ml-auto">
      <div
        className={
          userModule.published
            ? "bg-red-500 text-white py-2 px-6 rounded-sm hover:bg-red-50 hover:text-foreground"
            : "bg-green-500 text-white py-2 px-6 rounded-sm hover:bg-green-50 hover:text-foreground"
        }
        onClick={(e) => publishClickHandler(e, userModule)}
      >
        {userModule.published ? "Nej" : "Ja"}
      </div>
    </li>
  ) : (
          ""
        ))}
    </ul>
  </div>
</AccordionTrigger>


        <AccordionContent>
          <div>
          <div>
          <ul className="mb-4">
  <li className="w-32 flex">
    <span>Startdatum: </span> 
    <span className="ml-1"><strong>{userModule && userModule.startDate}</strong></span>
  </li>

  {desktopVersion && 
    <li className="w-32 flex">
      <span>In.datum: </span>
      <span className="ml-1"><strong>{userModule && userModule.endDate}</strong></span>
    </li>
  }
</ul>

            </div>
              
            {userModule?.content && typeof userModule.content === "string"
              ? parse(userModule.content)
              : "Loading..."}
          </div>
          <Accordion type="single" collapsible>

            <AccordionItem value="item-1">
              <AccordionTrigger>
                <div className="w-full">
                  <ul className="flex justify-between pr-5 text-base">
                    <li className="">Se alla uppgifter för modalen</li>
                    <li className="">3/5</li>
                  </ul>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                {userModule &&
                  userModule.exercises &&
                  userModule &&
                  userModule.exercises.map((exercise, index) => (
                    <div key={index} className="relative">
                    <Link
                      href={`/${router.asPath}/exercise/${exercise.slug}`}
                      key={index}
                      className="flex justify-between w-11/12 bg-accent text-white text-left p-4 hover:bg-blue-400" // set width to 11/12
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
                    <button
                      onClick={() => deleteHandle(exercise.id)}
                      className="absolute right-0 top-3 mt-1 mr-10" // position the trash icon
                    >
                      <Trash2 className="h- w-5 text-black" />
                    </button>

                       </div>
                  ))}
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ModuleAccordion;

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
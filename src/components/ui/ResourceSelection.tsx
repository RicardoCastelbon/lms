import { Course, Exercise, Module } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { trpc } from "@/src/common/trpc";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";
import { Action, CourseAction } from "@/src/lib/enums/actionEnums";
import { useRouter } from "next/router";
import { ExerciseData } from "@/src/pages/dashboard/[course]";
import { ResourceType } from "@/src/lib/enums/resourceTypeEnum";

type Resource = Course | ModuleRenderSchema;
type Props = {
  resource?: Course[] | ModuleRenderSchema[];
  exercises?: ExerciseData[];
  setResourceId: Dispatch<SetStateAction<number>>;
  role: string | undefined | null;
  action: Action | CourseAction;
  // action: Action | ModuleAction;
};

const ResourceSelection = ({
  resource,
  setResourceId,
  role,
  action,
  exercises,
}: // action,
Props) => {
  const [resourceType, setResourceType] = useState<ResourceType | null>(null);
  //cast the resource prop to a state to be able to do realtime updates.
  const [resourceData, setResourceData] = useState<Resource[] | undefined>(
    resource
  );
  const { mutateAsync } = trpc.course.updateCourse.useMutation();
  const { mutateAsync: deleteCourseAsync } =
    trpc.course.deleteCourse.useMutation();
  const { mutateAsync: createExercise } = trpc.exercise.create.useMutation();

  const router = useRouter();

  useEffect(() => {
    if (resource) {
      console.log(resourceData);
    }
  }, [resource, resourceData]);

  useEffect(() => {
    if (!resourceType) {
      if (
        action === Action.CREATEMODULE ||
        action === Action.UPDATEMODULE ||
        action === Action.CREATEEXERCISE
      ) {
        console.log("Iam module action");
        console.log(action);
        setResourceType(ResourceType.MODULE);
      } else if (action === Action.UPDATEEXERCISE) {
        console.log("Iam exercise action");
        console.log(action);
        setResourceType(ResourceType.EXERCISE);
      }

      if (
        action === CourseAction.CREATECOURSE ||
        action === CourseAction.UPDATECOURSE ||
        action === CourseAction.DELETECOURSE
      ) {
        console.log("Iam course action");
        console.log(action);
        setResourceType(ResourceType.COURSE);
      }
    }
  }, [action, resourceType]);

  const publishClickHandler = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    resource: Resource
  ) => {
    e.preventDefault();
    //  console.log(course);
    if (role !== "TEACHER") return;
    const result = await mutateAsync({
      courseId: String(resource.id),
      body: {
        ...resource,
        published: resource.published ? false : true,
      },
    });

    if (result.success) {
      const res = result.course as unknown as Resource[]; //<-- why unknown?!
      setResourceData(res);
    }
  };

  const deleteHandle = async (id: number) => {
    if (role !== "TEACHER") return;
    if (resourceType === ResourceType.COURSE) {
      const result = await deleteCourseAsync({
        courseId: id,
      });

      if (result.success) {
        filterResourceArray(resource, id);
      }
    }
  };

  //Used to visually remove deleted item in ResourceSelection whenever a deletion is successful
  const filterResourceArray = (
    resource: Resource[] | undefined,
    id: number
  ) => {
    if (!resource) return;
    const filteredArray = resource?.filter((item) => item.id !== id);
    setResourceData([...filteredArray]);
  };
  return (
    <section className="w-full h-full flex flex-col gap-2 p-2">
      {/* List header */}
      <div className="w-full px-4 flex justify-between items-center">
        {/* <div className="flex gap-"> */}
        <h3>Kursnamn</h3>
        {action === Action.UPDATEEXERCISE && <h3>Uppgift</h3>}
        {/* </div> */}
        <p>Status</p>
      </div>
      {/* list of courses */}
      {resourceData &&
        resourceData.map((item, index) => (
          <div
            key={index}
            className="w-full p-4 flex justify-between items-center bg-card  hover:bg-background"
          >
            <h3
              className=" hover:cursor-pointer font-semibold"
              onClick={() => setResourceId(item.id)}
            >
              {item.title}
            </h3>
            <div className="flex gap-6 items-center">
              {role && role === "TEACHER"
                ? router.query.course === undefined &&
                  (item.published ? (
                    <>
                      <button
                        className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                        onClick={(e) => publishClickHandler(e, item)}
                      >
                        Avpublicera
                      </button>
                    </>
                  ) : (
                    <>
                      {/* <p className="text-rose-500">Ej publicerad</p> */}
                      <button
                        className="bg-indigo-500 text-white py-2 px-6 rounded-sm hover:bg-indigo-50 hover:text-foreground"
                        onClick={(e) => publishClickHandler(e, item)}
                      >
                        Publicera nu
                      </button>
                    </>
                  ))
                : ""}
              <Trash2
                className="hover:cursor-pointer"
                onClick={() => deleteHandle(item.id)}
              />
            </div>
          </div>
        ))}

      {exercises &&
        exercises.map((exercise, index) => (
          <div
            key={index}
            className="w-full p-4 flex justify-between items-center bg-card  hover:bg-background"
          >
            <h3
              className=" hover:cursor-pointer font-semibold"
              onClick={() => setResourceId(exercise.exercise.id)}
            >
              {exercise.moduleName}
            </h3>
            <h3
              className=" hover:cursor-pointer font-semibold"
              onClick={() => setResourceId(exercise.exercise.id)}
            >
              {exercise.exercise.title}
            </h3>
            <p>
              {exercise.exercise.published ? "Publicerad" : "Ej publicerad"}
            </p>
          </div>
        ))}
    </section>
  );
};
export default ResourceSelection;

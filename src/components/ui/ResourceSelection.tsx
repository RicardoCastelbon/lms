import { Course, Exercise, Module } from "@prisma/client";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Trash2 } from "lucide-react";
import { trpc } from "@/src/common/trpc";
import { ModuleRenderSchema } from "@/src/common/validation/module-end-user";
import { Action, CourseAction } from "@/src/lib/enums/actionEnums";
import { useRouter } from "next/router";
import { ExerciseData } from "@/src/pages/dashboard/[course]";
import { ResourceType } from "@/src/lib/enums/resourceTypeEnum";
import UpdateModuleForm from "./forms/teacher/UpdateModuleForm";
import UpdateExerciseForm from "@/src/components/ui/forms/teacher/UpdateExerciseForm";
import CreateExerciseForm from "./forms/teacher/CreateExerciseForm";

type Resource = Course | ModuleRenderSchema;
type Props = {
  resource?: Course[] | ModuleRenderSchema[];
  exercises?: ExerciseData[];
  // setResourceId: Dispatch<SetStateAction<number>>;
  role: string | undefined | null;
  action: Action | CourseAction;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  showModal: boolean;
};

const ResourceSelection = ({
  resource,
  showModal,
  role,
  action,
  exercises,
  setShowModal,
}: // action,
Props) => {
  const [resourceId, setResourceId] = useState<number>(0);
  const [resourceType, setResourceType] = useState<ResourceType | null>(null);
  //cast the resource prop to a state to be able to do realtime updates.
  const [resourceData, setResourceData] = useState<Resource[] | undefined>(
    resource
  );
  const [exerciseData, setExerciseData] = useState<ExerciseData[] | undefined>(
    exercises
  );

  //To be selected course from when resourceId is set ResourceSelection, always reset this to NULL.
  const [resourceToUpdate, setResourceToUpdate] = useState<Resource | null>(
    null
  );
  const [exerciseToUpdate, setExerciseToUpdate] = useState<ExerciseData | null>(
    null
  );

  const [hasSubmitted, setHasSubmitted] = useState<boolean>(false);

  const { mutateAsync } = trpc.course.updateCourse.useMutation();

  const { mutateAsync: deleteCourseAsync } =
    trpc.course.deleteCourse.useMutation();

  const { mutateAsync: createExercise } = trpc.exercise.create.useMutation();

  const { mutateAsync: deleteExerciseAsync } =
    trpc.exercise.delete.useMutation();

  const { mutateAsync: deleteModuleAsync } = trpc.module.delete.useMutation();

  const router = useRouter();

  useEffect(() => {
    if (!showModal) {
      setResourceToUpdate(null);
      setResourceId(0);
    }
  }, [showModal]);

  useEffect(() => {
    if (exerciseToUpdate) {
      console.log(exerciseToUpdate);
    }
  }, [exerciseToUpdate]);

  useEffect(() => {
    if (!resourceType) {
      if (
        action === Action.CREATEMODULE ||
        action === Action.UPDATEMODULE ||
        action === Action.CREATEEXERCISE ||
        action === Action.DELETEEXERCISE ||
        action === Action.DELETEMODULE
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

  //Selects the module by id with the given resourceId whenever resourceId is updated within ResrouceSelection.
  useEffect(() => {
    if (
      action === Action.CREATEMODULE ||
      action === Action.UPDATEMODULE ||
      action === Action.CREATEEXERCISE
    ) {
      console.log("I will filter modules");

      setResourceToUpdate(getResourceToUpdate(resourceId, resource));
    } else if (action === Action.UPDATEEXERCISE) {
      console.log("I will filter weird exercise array");
      if (exerciseData) {
        setExerciseToUpdate(getExerciseToUpdate(resourceId, exerciseData));
      }
    }
  }, [resourceId, resource, action, exerciseData]);

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
        filterResourceArray(resourceData, id);
      }
    } else if (resourceType === ResourceType.EXERCISE) {
      const result = await deleteExerciseAsync({
        exerciseId: id.toString(),
      });

      if (result.success) {
        filterExercisesArray(exerciseData, id);
      }
    } else if (resourceType === ResourceType.MODULE) {
      const result = await deleteModuleAsync({
        moduleId: id.toString(),
      });

      if (result.success) {
        filterResourceArray(resourceData, id);
      }
    }
  };

  //Used to visually remove deleted item in ResourceSelection whenever a deletion is successful
  const filterResourceArray = (
    resource: Resource[] | undefined,
    id: number
  ) => {
    if (!resource) return;
    if (
      resourceType === ResourceType.MODULE ||
      resourceType === ResourceType.COURSE
    ) {
      const filteredArray = resource?.filter((item) => item.id !== id);
      console.log("filteredArray", filteredArray);
      setResourceData([...filteredArray]);
    }
  };

  const filterExercisesArray = (
    exData: ExerciseData[] | undefined,
    id: number
  ) => {
    if (resourceType === ResourceType.EXERCISE) {
      const filteredArray = exData?.filter((item) => item.exercise.id !== id);
      setExerciseData(filteredArray);
    }
  };

  //Function to run whenever a resource is clicked in the resource list in component ResourceSelection when clicking update course button
  // make util
  const getResourceToUpdate = (
    moduleId: number,
    resource: Resource[] | undefined
  ) => {
    if (resource) {
      if (resource.length <= 0) return null;

      const filteredResource = resource.filter((res) => res.id === moduleId);

      return filteredResource.length <= 0 ? null : filteredResource[0];
    } else {
      return null;
    }
  };
  //Make util
  const getExerciseToUpdate = (
    exerciseId: number,
    exercises: ExerciseData[] | null
  ) => {
    if (!exercises || exercises.length <= 0) return null;

    const filteredExercise = exercises.filter(
      (exercise) => exercise.exercise.id === exerciseId
    );

    return filteredExercise.length <= 0 ? null : filteredExercise[0];
  };

  return (
    <section className="w-full h-full flex flex-col gap-2 p-2">
      {/* List header */}
      <div className="w-full px-4 flex justify-between items-center">
        {/* <div className="flex gap-"> */}
        <h3>Kursnamn</h3>
        {action === Action.UPDATEEXERCISE && <h3>Uppgift</h3>}
        {/* </div> */}
        <p>Radera</p>
      </div>
      {/* list of courses */}
      {!resourceToUpdate && !exerciseToUpdate ? (
        <>
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

          {exerciseData &&
            exerciseData.map((exercise, item) => (
              <div
                key={item}
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
                <Trash2
                  className="hover:cursor-pointer"
                  onClick={() => deleteHandle(exercise.exercise.id)}
                />
              </div>
            ))}
        </>
      ) : (
        <>
          {action === Action.UPDATEMODULE && (
            <div>
              <button
                onClick={() => {
                  setResourceToUpdate(null);
                  setResourceId(0);
                }}
              >
                Tillbaka
              </button>
              <strong>
                {" "}
                <p>Module name: {resourceToUpdate!.title}</p>
              </strong>
              <p>publicerad: {resourceToUpdate!.published ? "ja" : "nej"}</p>
              <UpdateModuleForm
                userModule={resourceToUpdate as ModuleRenderSchema}
                hasSubmitted={hasSubmitted}
                setHasSubmitted={setHasSubmitted}
                setShowModal={setShowModal}
              />
            </div>
          )}

          {action === Action.UPDATEEXERCISE && (
            <UpdateExerciseForm
              exercise={exerciseToUpdate!}
              hasSubmitted={hasSubmitted}
              setHasSubmitted={setHasSubmitted}
              setShowModal={setShowModal}
            />
          )}

          {action === Action.CREATEEXERCISE && (
            <>
              <button
                onClick={() => {
                  setResourceToUpdate(null);
                  setResourceId(0);
                }}
              >
                Tillbaka
              </button>
              <strong>
                {" "}
                <p>Module name: {resourceToUpdate!.title}</p>
              </strong>
              <p>publicerad: {resourceToUpdate!.published ? "ja" : "nej"}</p>
              <CreateExerciseForm
                moduleId={resourceToUpdate!.id}
                setShowModal={setShowModal}
              />
            </>
          )}
        </>
      )}

      {/* {!exerciseToUpdate ? (

      ):()} */}
    </section>
  );
};
export default ResourceSelection;

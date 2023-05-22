import { Resource } from "@/src/components/ui/ResourceSelection";
import { ExerciseData } from "@/src/pages/dashboard/[course]";

export const getResourceToUpdate = (
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
export const getExerciseToUpdate = (
  exerciseId: number,
  exercises: ExerciseData[] | null
) => {
  if (!exercises || exercises.length <= 0) return null;

  const filteredExercise = exercises.filter(
    (exercise) => exercise.exercise.id === exerciseId
  );

  return filteredExercise.length <= 0 ? null : filteredExercise[0];
};

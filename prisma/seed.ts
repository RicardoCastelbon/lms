import { exercises } from "./data/exercises";
import { courses } from "./data/courses";
import { educations } from "./data/educations";
import { PrismaClient } from "@prisma/client";
import { users } from "./data/users";
import { modules } from "./data/modules";
import { courseLibs } from "./data/course-libs";
import { moduleLibs } from "./data/module-lib-";
import { exerciseLibs } from "./data/exercise-lib";
import { courseId } from "@/src/common/validation/course-end-user";

const prisma = new PrismaClient();

async function main() {
  for (let education of educations) {
    await prisma.education.create({
      data: education,
    });
  }

  for (let course of courses) {
    await prisma.course.create({
      data: course,
    });
  }

  for (let exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }
  let num = 1;
  for (let userModule of modules) {
    const courseId = userModule.courseId;
    await prisma.module.create({
      data: {
        title: userModule.title,
        startDate: userModule.startDate,
        endDate: userModule.endDate,
        content: userModule.content,
        exercises: {
          connect: [{ id: num }],
        },
        course: {
          connect: { id: courseId },
        },
      },
    });
    num++;
  }

  for (let user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (let courseLib of courseLibs) {
    await prisma.course_lib.create({
      data: courseLib,
    });
  }

  for (let moduleLib of moduleLibs) {
    await prisma.module_lib.create({
      data: moduleLib,
    });
  }

  for (let exerciseLib of exerciseLibs) {
    await prisma.exercise_lib.create({
      data: exerciseLib,
    });
  }
}
main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });

import { exercises } from "./data/exercises";
import { courses } from "./data/courses";
import { educations } from "./data/educations";
import { PrismaClient } from "@prisma/client";
import { users } from "./data/users";
import { modules } from "./data/modules";
import { courseLibs } from "./data/course-libs";
import { moduleLibs } from "./data/module-lib-";
import { exerciseLibs } from "./data/exercise-lib";

const prisma = new PrismaClient();

async function main() {
  for (let exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }

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
  for (let module of modules) {
    await prisma.module.create({
      data: module,
    });
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

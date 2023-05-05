import { exercises } from "./data/exercises";
import { courses } from "./data/courses";
import { educations } from "./data/educations";
import { PrismaClient } from "@prisma/client";
import { users } from "./data/users";

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
  for (let user of users) {
    await prisma.user.create({
      data: user,
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

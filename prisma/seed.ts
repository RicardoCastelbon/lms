import { exercises } from "./data/exercises";
import { courses } from "./data/courses";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  for (let exercise of exercises) {
    await prisma.exercise.create({
      data: exercise,
    });
  }

  for (let course of courses) {
    await prisma.course.create({
      data: course,
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

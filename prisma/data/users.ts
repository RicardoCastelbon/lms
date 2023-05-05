import { Role } from "@prisma/client";

export const users = [
  {
    userRole: Role.STUDENT,
    educationId: 1,
    email: "nalle@mail.com",
    password:
      "$argon2id$v=19$m=4096,t=3,p=1$gfqzxORI28CCg3zasQw3vQ$lOiagGl80vbDVXf56hoY9+AyZQ4VAu8Dbxjk4XU4hqc",
    firstName: "Naelia",
    lastName: "Den Bäste",
  },
  {
    userRole: Role.STUDENT,
    educationId: 1,
    email: "ricardo@mail.com",
    password:
      "$argon2id$v=19$m=4096,t=3,p=1$gfqzxORI28CCg3zasQw3vQ$lOiagGl80vbDVXf56hoY9+AyZQ4VAu8Dbxjk4XU4hqc",
    firstName: "Ricardo",
    lastName: "Den Bäste",
  },
  {
    // id: 3,
    userRole: Role.STUDENT,
    educationId: 1,
    email: "niclas@mail.com",
    password:
      "$argon2id$v=19$m=4096,t=3,p=1$gfqzxORI28CCg3zasQw3vQ$lOiagGl80vbDVXf56hoY9+AyZQ4VAu8Dbxjk4XU4hqc",
    firstName: "Niclas",
    lastName: "Den Knasige",
  },
  {
    userRole: Role.TEACHER,
    educationId: 1,
    email: "teacher@mail.com",
    password:
      "$argon2id$v=19$m=4096,t=3,p=1$gfqzxORI28CCg3zasQw3vQ$lOiagGl80vbDVXf56hoY9+AyZQ4VAu8Dbxjk4XU4hqc",
    firstName: "Teacher",
    lastName: "Den lärigaste",
  },
  {
    userRole: Role.STUDENT,
    educationId: 1,
    email: "david@mail.com",
    password:
      "$argon2id$v=19$m=4096,t=3,p=1$gfqzxORI28CCg3zasQw3vQ$lOiagGl80vbDVXf56hoY9+AyZQ4VAu8Dbxjk4XU4hqc",
    firstName: "David",
    lastName: "Den Bäste",
  },
];

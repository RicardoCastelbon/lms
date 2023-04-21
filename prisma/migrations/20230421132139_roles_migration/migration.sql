/*
  Warnings:

  - You are about to alter the column `userRole` on the `user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `admin` ADD COLUMN `userRole` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'ADMIN',
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `exercise` MODIFY `moduleId` INTEGER NULL;

-- AlterTable
ALTER TABLE `exercise_lib` MODIFY `moduleId` INTEGER NULL;

-- AlterTable
ALTER TABLE `module` MODIFY `courseId` INTEGER NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `userRole` ENUM('ADMIN', 'TEACHER', 'STUDENT') NOT NULL DEFAULT 'STUDENT';

/*
  Warnings:

  - You are about to drop the column `description` on the `exercise` table. All the data in the column will be lost.
  - You are about to drop the column `courseId` on the `module_lib` table. All the data in the column will be lost.
  - Added the required column `slug` to the `Exercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `exercise_lib` DROP FOREIGN KEY `Exercise_lib_moduleId_fkey`;

-- DropForeignKey
ALTER TABLE `module_lib` DROP FOREIGN KEY `Module_lib_courseId_fkey`;

-- AlterTable
ALTER TABLE `admin` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `course` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `course_lib` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `exercise` DROP COLUMN `description`,
    ADD COLUMN `slug` VARCHAR(191) NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `exercise_lib` MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `module` MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `module_lib` DROP COLUMN `courseId`,
    MODIFY `description` LONGTEXT NOT NULL,
    MODIFY `content` LONGTEXT NOT NULL;

-- AlterTable
ALTER TABLE `user` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL';

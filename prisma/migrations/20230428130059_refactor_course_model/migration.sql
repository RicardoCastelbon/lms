/*
  Warnings:

  - You are about to drop the column `description` on the `Course` table. All the data in the column will be lost.
  - Added the required column `color` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `educationId` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `icon` to the `Course` table without a default value. This is not possible if the table is not empty.
  - Added the required column `points` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Admin` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `Course` DROP COLUMN `description`,
    ADD COLUMN `color` VARCHAR(191) NOT NULL,
    ADD COLUMN `educationId` INTEGER NOT NULL,
    ADD COLUMN `icon` VARCHAR(191) NOT NULL,
    ADD COLUMN `points` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `Education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `User` MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AddForeignKey
ALTER TABLE `Course` ADD CONSTRAINT `Course_educationId_fkey` FOREIGN KEY (`educationId`) REFERENCES `Education`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

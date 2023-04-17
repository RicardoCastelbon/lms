/*
  Warnings:

  - A unique constraint covering the columns `[educationId]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `educationId` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `education` MODIFY `name` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- AlterTable
ALTER TABLE `user` ADD COLUMN `educationId` INTEGER NOT NULL,
    MODIFY `password` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `firstName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `lastName` VARCHAR(191) NOT NULL DEFAULT 'NULL',
    MODIFY `userRole` VARCHAR(191) NOT NULL DEFAULT 'NULL';

-- CreateIndex
CREATE UNIQUE INDEX `User_educationId_key` ON `User`(`educationId`);

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_educationId_fkey` FOREIGN KEY (`educationId`) REFERENCES `Education`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

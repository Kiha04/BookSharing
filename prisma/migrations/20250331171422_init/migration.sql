/*
  Warnings:

  - You are about to drop the column `condition` on the `book` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `condition`,
    ADD COLUMN `bookCondition` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NULL,
    MODIFY `subject` VARCHAR(191) NULL;

/*
  Warnings:

  - Made the column `author` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `book` ADD COLUMN `isbn` VARCHAR(191) NULL,
    MODIFY `author` VARCHAR(191) NOT NULL;

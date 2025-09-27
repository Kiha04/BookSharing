/*
  Warnings:

  - You are about to drop the column `subject` on the `book` table. All the data in the column will be lost.
  - Made the column `bookCondition` on table `book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `isbn` on table `book` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX `Book_isbn_key` ON `book`;

-- AlterTable
ALTER TABLE `book` DROP COLUMN `subject`,
    ADD COLUMN `category` VARCHAR(191) NOT NULL DEFAULT '',
    ADD COLUMN `thumbnail` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `bookCondition` VARCHAR(191) NOT NULL DEFAULT '',
    MODIFY `isbn` VARCHAR(191) NOT NULL,
    ALTER COLUMN `stock` DROP DEFAULT;

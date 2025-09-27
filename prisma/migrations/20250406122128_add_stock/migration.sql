/*
  Warnings:

  - You are about to drop the column `available` on the `book` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[isbn]` on the table `Book` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `book` DROP COLUMN `available`,
    ADD COLUMN `stock` INTEGER NOT NULL DEFAULT 1;

-- CreateIndex
CREATE UNIQUE INDEX `Book_isbn_key` ON `Book`(`isbn`);

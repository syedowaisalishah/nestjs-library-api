/*
  Warnings:

  - You are about to drop the column `createdAt` on the `Author` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `year` on the `Book` table. All the data in the column will be lost.
  - Made the column `bio` on table `Author` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `publicationYear` to the `Book` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Book_isbn_key";

-- AlterTable
ALTER TABLE "Author" DROP COLUMN "createdAt",
ALTER COLUMN "bio" SET NOT NULL;

-- AlterTable
ALTER TABLE "Book" DROP COLUMN "createdAt",
DROP COLUMN "updatedAt",
DROP COLUMN "year",
ADD COLUMN     "publicationYear" INTEGER NOT NULL;

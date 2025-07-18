/*
  Warnings:

  - A unique constraint covering the columns `[email]` on the table `Author` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `email` to the `Author` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" ADD COLUMN     "email" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Author_email_key" ON "Author"("email");

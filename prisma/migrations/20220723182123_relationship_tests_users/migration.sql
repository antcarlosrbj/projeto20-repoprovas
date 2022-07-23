/*
  Warnings:

  - Added the required column `userId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tests" ADD COLUMN     "userId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

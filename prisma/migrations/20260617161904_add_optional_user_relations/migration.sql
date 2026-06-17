/*
  Warnings:

  - A unique constraint covering the columns `[userId,emailId]` on the table `EmailInsight` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "EmailInsight_emailId_key";

-- AlterTable
ALTER TABLE "Activity" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "Email" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "EmailInsight" ADD COLUMN     "userId" TEXT;

-- AlterTable
ALTER TABLE "ExecutiveBrief" ADD COLUMN     "userId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EmailInsight_userId_emailId_key" ON "EmailInsight"("userId", "emailId");

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ExecutiveBrief" ADD CONSTRAINT "ExecutiveBrief_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EmailInsight" ADD CONSTRAINT "EmailInsight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email" ADD CONSTRAINT "Email_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

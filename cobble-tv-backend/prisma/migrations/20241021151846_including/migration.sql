/*
  Warnings:

  - You are about to drop the column `userId` on the `livestreams` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[streamerId]` on the table `livestreams` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `streamerId` to the `livestreams` table without a default value. This is not possible if the table is not empty.
  - Added the required column `senderId` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "livestreams" DROP CONSTRAINT "livestreams_userId_fkey";

-- DropIndex
DROP INDEX "livestreams_userId_key";

-- AlterTable
ALTER TABLE "livestreams" DROP COLUMN "userId",
ADD COLUMN     "streamerId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "senderId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "livestreams_streamerId_key" ON "livestreams"("streamerId");

-- AddForeignKey
ALTER TABLE "livestreams" ADD CONSTRAINT "livestreams_streamerId_fkey" FOREIGN KEY ("streamerId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

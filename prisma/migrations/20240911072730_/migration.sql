/*
  Warnings:

  - You are about to drop the `EventParticipant` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[userId,eventId]` on the table `Participant` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "EventParticipant" DROP CONSTRAINT "EventParticipant_eventId_fkey";

-- DropForeignKey
ALTER TABLE "EventParticipant" DROP CONSTRAINT "EventParticipant_participantId_fkey";

-- DropForeignKey
ALTER TABLE "EventParticipant" DROP CONSTRAINT "EventParticipant_userId_fkey";

-- DropTable
DROP TABLE "EventParticipant";

-- CreateIndex
CREATE UNIQUE INDEX "Participant_userId_eventId_key" ON "Participant"("userId", "eventId");

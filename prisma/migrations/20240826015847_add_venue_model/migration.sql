/*
  Warnings:

  - You are about to drop the column `latitude` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `venueAddress` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `venueName` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `zoomLevel` on the `Event` table. All the data in the column will be lost.
  - Added the required column `venueId` to the `Event` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Event" DROP COLUMN "latitude",
DROP COLUMN "longitude",
DROP COLUMN "venueAddress",
DROP COLUMN "venueName",
DROP COLUMN "zoomLevel",
ADD COLUMN     "venueId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Venue" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "latitude" DOUBLE PRECISION NOT NULL,
    "longitude" DOUBLE PRECISION NOT NULL,
    "zoomLevel" INTEGER NOT NULL,

    CONSTRAINT "Venue_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_venueId_fkey" FOREIGN KEY ("venueId") REFERENCES "Venue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

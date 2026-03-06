/*
  Warnings:

  - A unique constraint covering the columns `[userId,lectureId]` on the table `LectureProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "LectureProgress_userId_lectureId_key" ON "LectureProgress"("userId", "lectureId");

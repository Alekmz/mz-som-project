/*
  Warnings:

  - Added the required column `name` to the `sound_plans` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "sound_plans" ADD COLUMN     "name" TEXT NOT NULL;

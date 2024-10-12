/*
  Warnings:

  - You are about to drop the column `amont` on the `equipments_plan` table. All the data in the column will be lost.
  - Added the required column `amount` to the `equipments_plan` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "equipments_plan" DROP COLUMN "amont",
ADD COLUMN     "amount" INTEGER NOT NULL;

/*
  Warnings:

  - You are about to drop the column `quantidade` on the `equipments_plan` table. All the data in the column will be lost.
  - You are about to drop the column `soundplan_id` on the `equipments_plan` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[sound_plan_id,equipment_id]` on the table `equipments_plan` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `amont` to the `equipments_plan` table without a default value. This is not possible if the table is not empty.
  - Added the required column `sound_plan_id` to the `equipments_plan` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "equipments_plan" DROP CONSTRAINT "equipments_plan_soundplan_id_fkey";

-- DropIndex
DROP INDEX "equipments_plan_soundplan_id_equipment_id_key";

-- AlterTable
ALTER TABLE "equipments_plan" DROP COLUMN "quantidade",
DROP COLUMN "soundplan_id",
ADD COLUMN     "amont" INTEGER NOT NULL,
ADD COLUMN     "sound_plan_id" INTEGER NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "equipments_plan_sound_plan_id_equipment_id_key" ON "equipments_plan"("sound_plan_id", "equipment_id");

-- AddForeignKey
ALTER TABLE "equipments_plan" ADD CONSTRAINT "equipments_plan_sound_plan_id_fkey" FOREIGN KEY ("sound_plan_id") REFERENCES "sound_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

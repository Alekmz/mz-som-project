/*
  Warnings:

  - You are about to drop the column `caminhao` on the `sound_plans` table. All the data in the column will be lost.
  - You are about to drop the column `departamentId` on the `sound_plans` table. All the data in the column will be lost.
  - You are about to drop the `EquipmentsPlan` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EquipmentsPlan" DROP CONSTRAINT "EquipmentsPlan_equipment_id_fkey";

-- DropForeignKey
ALTER TABLE "EquipmentsPlan" DROP CONSTRAINT "EquipmentsPlan_soundplan_id_fkey";

-- DropForeignKey
ALTER TABLE "sound_plans" DROP CONSTRAINT "sound_plans_departamentId_fkey";

-- AlterTable
ALTER TABLE "sound_plans" DROP COLUMN "caminhao",
DROP COLUMN "departamentId";

-- DropTable
DROP TABLE "EquipmentsPlan";

-- CreateTable
CREATE TABLE "equipments_plan" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "soundplan_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,

    CONSTRAINT "equipments_plan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "equipments_plan_soundplan_id_equipment_id_key" ON "equipments_plan"("soundplan_id", "equipment_id");

-- AddForeignKey
ALTER TABLE "equipments_plan" ADD CONSTRAINT "equipments_plan_soundplan_id_fkey" FOREIGN KEY ("soundplan_id") REFERENCES "sound_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "equipments_plan" ADD CONSTRAINT "equipments_plan_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

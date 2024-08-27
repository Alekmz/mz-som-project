/*
  Warnings:

  - You are about to drop the `soundPlans` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "budget" DROP CONSTRAINT "budget_soundPlanId_fkey";

-- DropForeignKey
ALTER TABLE "soundPlans" DROP CONSTRAINT "soundPlans_departamentId_fkey";

-- DropTable
DROP TABLE "soundPlans";

-- CreateTable
CREATE TABLE "sound_plans" (
    "id" SERIAL NOT NULL,
    "caminhao" TEXT NOT NULL,
    "departamentId" INTEGER,
    "valor_plano" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "sound_plans_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sound_plans" ADD CONSTRAINT "sound_plans_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_soundPlanId_fkey" FOREIGN KEY ("soundPlanId") REFERENCES "sound_plans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

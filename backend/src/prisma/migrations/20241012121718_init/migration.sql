-- CreateTable
CREATE TABLE "EquipmentsPlan" (
    "id" SERIAL NOT NULL,
    "quantidade" INTEGER NOT NULL,
    "soundplan_id" INTEGER NOT NULL,
    "equipment_id" INTEGER NOT NULL,

    CONSTRAINT "EquipmentsPlan_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EquipmentsPlan_soundplan_id_equipment_id_key" ON "EquipmentsPlan"("soundplan_id", "equipment_id");

-- AddForeignKey
ALTER TABLE "EquipmentsPlan" ADD CONSTRAINT "EquipmentsPlan_soundplan_id_fkey" FOREIGN KEY ("soundplan_id") REFERENCES "sound_plans"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EquipmentsPlan" ADD CONSTRAINT "EquipmentsPlan_equipment_id_fkey" FOREIGN KEY ("equipment_id") REFERENCES "equipments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

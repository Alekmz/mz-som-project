/* eslint-disable @typescript-eslint/strict-boolean-expressions */

import prisma from "../../server/prisma";

/* eslint-disable @typescript-eslint/explicit-function-return-type */
interface SoundPlan {
  amount: number
  sound_plan_id: number
  equipment_id: number
}

class EquipmentsPlanRepository {
  // eslint-disable-next-line @typescript-eslint/explicit-function-return-type
  async create (data: SoundPlan) {
    const equipmentsPlan = await prisma.equipmentsPlan.create({
      data: {
        amount: data.amount,
        sound_plan_id: data.sound_plan_id,
        equipment_id: data.equipment_id
      }
    });
    return equipmentsPlan;
  }

}

export const equipmentsPlanRepository = new EquipmentsPlanRepository();

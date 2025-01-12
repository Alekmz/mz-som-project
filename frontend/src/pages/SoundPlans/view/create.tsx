

import { useFieldArray, useForm, Controller } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import { CustomSelect } from "../../../components/custom-select";

import { useGetDepartments } from "../../Equipments/data/get-departments";
import { useGetEquipments } from "../../Equipments/data/get-equipments";
import { useMemo } from "react";
import { useCreateSoundPlan } from "../data/create-sound-plan";
import { toast } from "../../../components/ui/use-toast";

const CreateSoundPlan = ({ setHiddenPlains }: any) => {
  const { data: departmentsData } = useGetDepartments();
  const { data: equipmentsData } = useGetEquipments();
  const {
    mutateAsync: createSoundPlan,
    isPending
  } = useCreateSoundPlan();

  type EquipmentLine = {
    department: string;
    equipment: string;
    quantity: number;
  };

  type FormData = {
    name: string;
    plan_value: number;
    equipmentLines: EquipmentLine[];
  };

  const departments = departmentsData?.map((dept) => dept.name) || [];
  const equipmentOptions: { [key: string]: string[] } =
    equipmentsData?.reduce((acc, equipment) => {
      const departmentName = equipment.department.name;
      if (!acc[departmentName]) {
        acc[departmentName] = [];
      }
      acc[departmentName].push(equipment.name);
      return acc;
    }, {} as { [key: string]: string[] }) || {};

  const defaultQuantities =
    equipmentsData?.reduce((acc, equipment) => {
      const departmentName = equipment.department.name;
      if (!acc[departmentName]) {
        acc[departmentName] = {};
      }

      console.log("acc[departmentName]", acc[departmentName]);
      console.log("departmentName", departmentName);
      console.log("equipment", equipment);

      Object.assign(acc[departmentName], {
        [equipment.name]: equipment.amount,
      });
      console.log("acc", acc);
      return acc;
    }, {} as { [key: string]: { [key: string]: number } }) ||
    {} as { [key: string]: { [key: string]: number } };

  console.log("defaultQuantities", defaultQuantities);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      name: "",
      plan_value: 0,
      equipmentLines: [{ department: "", equipment: "", quantity: 1 }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "equipmentLines",
  });
  const watchEquipmentLines = watch("equipmentLines")

  const selectedEquipment = useMemo(() => {
    const selected = new Set<string>()
    watchEquipmentLines.forEach(line => {
      if (line.equipment) {
        selected.add(line.equipment)
      }
    })
    return selected
  }, [watchEquipmentLines])

  const onSubmit =  (data: FormData) => {
    console.log(data);
    const dataPayload = {
      name: data.name,
      valor_plano: data.plan_value,
      equipments: data.equipmentLines.map((line) => ({
        amount: line.quantity,
        equipment_id: equipmentsData ? equipmentsData?.find((equip) => equip.name === line.equipment)?.id || "" : "",
    }))
    } ;
    createSoundPlan(dataPayload).then((() => toast({ title: "Plano de som criado com sucesso!", description: "O plano de som foi criado com sucesso." })));
  };


  return (
    <>
      <div className="w-full flex justify-center items-center flex-col h-full">
        <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 mb-28 overflow-x-clip ">
          <div className="flex w-full px-10 justify-start  pl-[250px]">
            <Button
              variant={"outline"}
              onClick={() => setHiddenPlains(false)}
              className="text-xl font-normal border border-[#2190BF] text-[#2190BF]"
            >
              Voltar
            </Button>
          </div>
          <div className="flex items-center  dark:bg-gray-800">
            <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
              Criar plano de som
            </h2>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <Label htmlFor="soundPlanName">Nome do Plano de Som</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Nome é obrigatório." }}
                render={({ field }) => (
                  <Input
                    id="soundPlanName"
                    placeholder="Insira o Nome do Plano de Som"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <Label htmlFor="planValue">Valor do Plano de Som</Label>
              <Controller
                name="plan_value"
                control={control}
                rules={{ required: "Valor é obrigatório." }}
                render={({ field }) => (
                  <Input
                    id="planValue"
                    placeholder="Insira o Valor do Plano de Som"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <p className="text-sm text-red-600">{errors.name.message}</p>
              )}
            </div>
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex flex-wrap items-end gap-4 p-4 border rounded-md"
              >
                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor={`equipmentLines.${index}.department`}>
                    Departamento
                  </Label>
                  <Controller
                    name={`equipmentLines.${index}.department` as const}
                    control={control}
                    rules={{ required: "Departmento é obrigatório." }}
                    render={({ field }) => (
                      <CustomSelect
                        options={departments.map((dept) => ({
                          value: dept,
                          label: dept,
                        }))}
                        placeholder="Selecione o departmento"
                        {...field}
                      />
                    )}
                  />
                  {errors.equipmentLines?.[index]?.department && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.equipmentLines[index]?.department?.message}
                    </p>
                  )}
                </div>

                <div className="flex-1 min-w-[200px]">
                  <Label htmlFor={`equipmentLines.${index}.equipment`}>
                    Equipamento
                  </Label>
                  <Controller
              name={`equipmentLines.${index}.equipment` as const}
              control={control}
              rules={{ required: "Equipment is required" }}
              render={({ field }) => (
                <CustomSelect
                  options={
                    watchEquipmentLines[index]?.department
                      ? equipmentOptions[watchEquipmentLines[index].department as keyof typeof equipmentOptions]
                          .filter(equip => !selectedEquipment.has(equip) || equip === field.value)
                          .map(equip => ({ value: equip, label: equip }))
                      : []
                  }
                  placeholder="Select equipment"
                  {...field}
                  onChange={(value) => {
                    field.onChange(value);
                    const department = watchEquipmentLines[index].department;
                    if (department && value) {
                      const defaultQuantity =
                              defaultQuantities[
                                department as keyof typeof defaultQuantities
                              ][value.target.value]
                            if (defaultQuantity) {
                              setValue(
                                `equipmentLines.${index}.quantity`,
                                defaultQuantity
                              );
                            }
                    }
                  }}
                />
              )}
            />
                  {errors.equipmentLines?.[index]?.equipment && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.equipmentLines[index]?.equipment?.message}
                    </p>
                  )}
                </div>

                <div className="w-24">
                  <Label htmlFor={`equipmentLines.${index}.quantity`}>
                    Quantidade
                  </Label>
                  <Controller
                    name={`equipmentLines.${index}.quantity` as const}
                    control={control}
                    rules={{
                      required: "Quantidade é obrigatório.",
                      min: { value: 1, message: "Quantity must be at least 1" },
                    }}
                    render={({ field }) => (
                      <Input
                        type="number"
                        {...field}
                        onChange={(e) =>
                          field.onChange(parseInt(e.target.value))
                        }
                        min={1}
                      />
                    )}
                  />
                  {errors.equipmentLines?.[index]?.quantity && (
                    <p className="mt-1 text-sm text-red-600">
                      {errors.equipmentLines[index]?.quantity?.message}
                    </p>
                  )}
                </div>

                {fields.length > 1 && (
                  <Button
                    type="button"
                    variant="destructive"
                    onClick={() => remove(index)}
                  >
                    Remover
                  </Button>
                )}
              </div>
            ))}
            <div className="flex w-full gap-2 mt-4">
              <Button
                type="button"
                onClick={() =>
                  append({ department: "", equipment: "", quantity: 1 })
                }
                className="mt-4"
              >
                Adicionar Equipamento
              </Button>

              <Button type="submit" className="mt-4">
                Criar Plano de Som
              </Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
export default CreateSoundPlan;

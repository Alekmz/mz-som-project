import { useForm } from "react-hook-form";
import { Button } from "../../../components/ui/button";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  Form
} from "../../../components/ui/form";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import MultipleSelector from "../../../components/ui/multi-select";
import { useToast } from "../../../components/ui/use-toast";
import { useGetDepartments } from "../../Equipments/data/get-departments";
import { toSnakeCase } from "../../../utils/formatToSnakeCase";
import { useGetEquipments } from "../../Equipments/data/get-equipments";
import { useState } from "react";

const CreateSoundPlan = ({ setDataForBudget, setHiddenPlains }: any) => {
  const { toast } = useToast();
  const { data: departments} = useGetDepartments();
  const [value, setValue] = useState<any>();
  const { data: equipments } = useGetEquipments();
  const form = useForm();



  const formatCurrency = (value) => {
    // Remove tudo que não é dígito
    const numericValue = value.replace(/\D/g, '');

    // Formata o valor para moeda BRL
    const formattedValue = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(numericValue / 100); // Divide por 100 para lidar com centavos

    return formattedValue;
  };
  const handleChange = (e: any) => {
    const inputValue = e.target.value;
    const formatted = formatCurrency(inputValue);
    setValue(formatted);
  };

  const parseCurrencyToNumber = (value) => {
    const cleanValue = value.replace(/[^\d,-]/g, ''); // Remove R$ e espaços
    const numericValue = cleanValue.replace(',', '.'); // Troca vírgula por ponto para formato numérico
    return parseFloat(numericValue);
  };

  const onSubmit = (data: any) => {
    data.amount = parseCurrencyToNumber(value);
    console.log(data)

  }
  return (
    <>
      <div className="w-full flex justify-center items-center flex-col h-full">
        <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 mb-28 overflow-x-clip ">
          <div className="flex w-full px-10 justify-start  pl-[250px]">
            <Button
              variant={"outline"}
              onClick={() => setHiddenPlains(true)}
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
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="flex flex-col gap-5 justify-center items-center md:justify-star md:items-start"
            >
              {departments && departments.map((department) => (
                 <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
                 <FormField
                   control={form.control}
                   name={toSnakeCase(department?.name)}
                   render={({ field }) => (
                     <FormItem className="w-full">
                       <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                         {department?.name}
                         <span className="text-red-500">*</span>
                       </FormLabel>
                       <FormControl>
                         <MultipleSelector
                           value={field.value}
                           onChange={field.onChange}
                           selectFirstItem={false}
                           defaultOptions={equipments?.filter((equipment) => equipment?.departmentId === department?.id).map((equipment) => ({label: equipment?.name, value: equipment?.id})) as any || []}
                           placeholder="Selecione"
                           emptyIndicator={
                             <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                               Nenhum resultado encontrado.
                             </p>
                           }
                         />
                       </FormControl>
                     </FormItem>
                   )}
                 />
               </div>
              ))}

              <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">

                      <FormItem className="w-full">
                        <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                          Valor total do plano <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text" // Alterado para text para aceitar formatação com símbolos
                            value={value}
                            required
                            onChange={handleChange}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>

                </div>
              <div className="flex w-full justify-center items-center ">
                <Button className=" bg-[#2190BF] text-white font-nunito font-semibold text-lg w-full max-w-[450px] ">
                  Criar
                </Button>
              </div>
            </form>
          </Form>
        </div>
      </div>
    </>
  );
};

export default CreateSoundPlan;

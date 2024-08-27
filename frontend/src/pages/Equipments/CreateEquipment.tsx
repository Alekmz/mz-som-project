import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";

import { Button } from "../../components/ui/button";
import { useGetEquipments } from "./data/get-equipments";
import { useGetDepartments } from "./data/get-departments";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "../../components/ui/input";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { useCreateEquipment } from "./data/create-equipment";
import { toast, useToast } from "../../components/ui/use-toast";

interface Props {
  setIsCreateEquipment: (value: boolean) => void
}
const CreateEquipment = ({setIsCreateEquipment}: Props) => {
  const [hiddenPlains, setHiddenPlains] = useState(false);
  const {  mutateAsync: createEquipment } = useCreateEquipment()
  const { isPending, isError, data, error, refetch  } = useGetEquipments();
  const { data: departments } = useGetDepartments();
  const form = useForm();
  const { toast } = useToast();

  const onSubmit = async (data: any) => {
    console.log(data, departments)
    const dataFormatted: any= {
      name: data.name,
      amount: Number(data.amount),
      departmentId: departments && departments?.find((department) => department.name === data.departmentId)?.id,
    }
    await createEquipment(dataFormatted)
    setIsCreateEquipment(false)
    toast({
      title: 'Equipamento criado',
      description: 'Seu equipamento foi criado com sucesso',
    })
    refetch();
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-full flex justify-center items-center flex-col h-full">
        <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 overflow-x-clip ">
          <div className="flex w-full px-10 justify-between items-center pl-60">
            <Button onClick={() => setIsCreateEquipment(false)} className="text-end">
              Voltar
            </Button>
          </div>
          <div className="flex items-center  dark:bg-gray-800">
            <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
              Criar novo equipamento
            </h2>
          </div>
          <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}

                className="flex flex-col gap-5 justify-center items-center md:justify-star md:items-start"
              >
                <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                          Nome do equipamento <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                          Quantidade <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            required
                            type="number"
                            {...field}
                          />
                        </FormControl>

                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="departmentId"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Departamento
                    </FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="w-full max-w-[500px]">
                          <SelectValue
                            placeholder="Selecione um tipo de evento"
                            {...field}
                          />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {departments?.map((department) => (
                          <SelectItem key={department.id} value={department.name}>{department.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

            </div>
                <div className="flex w-full justify-center items-center md:justify-start md:items-start mb-10">
                  <Button className=" bg-[#2190BF] text-white font-nunito font-semibold text-lg w-full max-w-[450px]" type="submit">
                    Criar
                  </Button>
                </div>
              </form>
            </Form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CreateEquipment;

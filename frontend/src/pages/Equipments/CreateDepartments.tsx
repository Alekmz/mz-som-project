import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";

import { Button } from "../../components/ui/button";
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
import { useCreateDepartment } from "./data/create-department";
import { Department } from "./data/get-departments";
import { toast } from "../../components/ui/use-toast";

interface Props {
  setIsCreateDepartment: (value: boolean) => void
  departments: Department[] | undefined
  refetch: () => void
}
const CreateDepartments = ({setIsCreateDepartment, departments, refetch}:Props) => {
  const { mutateAsync: createDepartment } = useCreateDepartment();
  const form = useForm();

  const onSubmit = async (data: any) => {
    console.log(data, departments)


    await createDepartment(data)
    refetch();
    toast({
      title: 'Departamento criado',
      description: 'Seu departamento foi criado com sucesso',
    })
    setIsCreateDepartment(false)
  }

  return (
    <>
      <Header />
      <Sidebar />
      <div className="w-full flex justify-center items-center flex-col h-full">
        <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 overflow-x-clip ">
          <div className="flex w-full px-10 justify-between items-center pl-60">
            <Button onClick={() => setIsCreateDepartment(false)} className="text-end">
              Voltar
            </Button>
          </div>
          <div className="flex items-center  dark:bg-gray-800">
            <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
              Criar novo departamento
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
                          Nome do departamento <span className="text-red-500">*</span>
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

                <div className="flex w-full justify-center items-center md:justify-start md:items-start mb-10">
                  <Button className=" bg-[#2190BF] text-white font-nunito font-semibold text-lg w-full max-w-[450px]  " type="submit">
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

export default CreateDepartments;

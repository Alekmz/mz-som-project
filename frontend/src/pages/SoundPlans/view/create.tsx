import { Button } from "../../../components/ui/button";
import { Input } from "../../../components/ui/input";
import { Label } from "../../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../components/ui/select";
import { Textarea } from "../../../components/ui/textarea";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../../components/ui/popover";
import { cn } from "../../../lib/utils";
import { Calendar } from "../../../components/ui/calendar";
import { useForm } from "react-hook-form";
import MultipleSelector, { Option } from "../../../components/ui/multi-select";
import { useToast } from "../../../components/ui/use-toast";

import { useLocation } from "react-router-dom";
import Footer from "../../../components/footer/footer";
import Header from "../../../components/header/Header";
import Sidebar from "../../../components/menu/Sidebar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";

const CreateSoundPlan = ({ setDataForBudget }: any) => {
  const { toast } = useToast();

  const form = useForm();

  function formatarTelefone(numero: any) {
    var numeroLimpo = numero.replace(/\D/g, "");
    var numeroFormatado = numeroLimpo.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );

    return numeroFormatado;
  }

  const OPTIONS: Option[] = [
    { label: "Grave", value: "som" },
    { label: "Line1", value: "iluminacao_festa" },
    { label: "Iluminação Cênica", value: "iluminacao_cenica" },
    { label: "Painel de Led", value: "painel_led" },
    { label: "Projetor e Tela", value: "projetor_tela" },
    { label: "Palco", value: "palco" },
    { label: "Cobertura", value: "cobertura" },
    { label: "Grades de Isolamento", value: "grades_isolamento" },
  ];

  const OPTIONS_LIGHTING: Option[] = [
    { label: "Movies", value: "som" },
    { label: "Canhoes", value: "iluminacao_festa" },
    { label: "Iluminação Cênica", value: "iluminacao_cenica" },
    { label: "Painel de Led", value: "painel_led" },
    { label: "Projetor e Tela", value: "projetor_tela" },
    { label: "Palco", value: "palco" },
    { label: "Cobertura", value: "cobertura" },
    { label: "Grades de Isolamento", value: "grades_isolamento" },
  ];

  const onSubmit = (data: any) => {
    if (!data?.data_evento) {
      toast({
        title: "Você precisa inserir uma data",
        description: "Por favor, insira uma data para o evento.",
        variant: "destructive",
      });
    } else {
      const { servicos, ...payload } = data;
      const formattedData = {
        servicos: servicos.map((servico: { value: any }) => servico.value),
        ...payload,
      };
      setDataForBudget(formattedData);
    }
  };

  return (
    <>
      <div className="w-full flex justify-center items-center flex-col h-full">
      <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 mb-28 overflow-x-clip ">
        <div className="flex w-full px-10 justify-start  pl-[250px]">
          <Button variant={"outline"} onClick={() => setHiddenPlains(true)} className="text-xl font-normal border border-[#2190BF] text-[#2190BF]">
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
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="Caminhão"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Caminhão <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required {...field}  />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="servicos"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Equipamentos de som <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        selectFirstItem={false}
                        defaultOptions={OPTIONS}
                        placeholder="Selecione os serviços que deseja"
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
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="lighting"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Equipamentos de luz <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <MultipleSelector
                        value={field.value}
                        onChange={field.onChange}
                        selectFirstItem={false}
                        defaultOptions={OPTIONS_LIGHTING}
                        placeholder="Selecione os serviços que deseja"
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
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="value_to_be_charged"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Valor total do plano
                    </FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
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

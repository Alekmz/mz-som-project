import { useEffect, useState } from "react";
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
import { useGetRequestBudget } from "../data/get-request-budget";

const CreateBudget = ({ setDataForBudget }: any) => {
  const { pathname } = useLocation();

  const { data } = useGetRequestBudget(Number(pathname.split(":")[1]));
  const { toast } = useToast();

  const form = useForm();

  useEffect(() => {
    form.reset({
      data_evento: data?.data_evento,
      email: data?.email,
      telefone: data?.telefone,
      responsavel: data?.responsavel,
      cpf_cnpj: data?.cpf_cnpj,
      local_evento: data?.local_evento,
      tipo_evento: data?.tipo_evento,
      servicos: data?.servicos.map((servico: any) => ({
        label: servico,
        value: servico,
      })),
      descricao: data?.descricao,
    });
  }, [data]);

  function formatarTelefone(numero: any) {
    var numeroLimpo = numero.replace(/\D/g, "");
    var numeroFormatado = numeroLimpo.replace(
      /(\d{2})(\d{5})(\d{4})/,
      "($1) $2-$3"
    );

    return numeroFormatado;
  }

  const OPTIONS: Option[] = [
    { label: "Som", value: "som" },
    { label: "Iluminação Festa", value: "iluminacao_festa" },
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
    <div className="w-full flex justify-center items-center flex-col h-full">
      <div className="flex flex-col w-full items-center gap-5 h-full pt-12 pb-14 px-10 overflow-x-clip ">
        <div className="flex pb-8 justify-center dark:bg-gray-800">
          <p className="text-xl text-[#2B3A41] dark:text-gray-500">
            Criar novo Orçamento
          </p>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-5 justify-center items-center md:justify-star md:items-start"
          >
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="responsavel"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Responsável <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input required {...field} disabled />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="cpf_cnpj"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      CNPJ/CPF
                    </FormLabel>
                    <FormControl>
                      <Input {...field} disabled />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="local_evento"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Local do evento <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        disabled
                        type="text"
                        placeholder="Cidade"
                        required
                        className="w-full"
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
                name="servicos"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Tipo de serviço <span className="text-red-500">*</span>
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
                name="tipo_evento"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Tipo do evento
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
                        <SelectItem value="Casamento">Casamento</SelectItem>
                        <SelectItem value="Formatura">Formatura</SelectItem>
                        <SelectItem value="Festa de aniversário">
                          Festa de aniversário
                        </SelectItem>
                        <SelectItem value="Evento corporativo">
                          Evento corporativo
                        </SelectItem>
                        <SelectItem value="show">Show</SelectItem>
                        <SelectItem value="Festival de música">
                          Festival de música
                        </SelectItem>
                        <SelectItem value="Evento esportivo">
                          Evento esportivo
                        </SelectItem>
                        <SelectItem value="Cerimônia religiosa">
                          Cerimônia religiosa
                        </SelectItem>
                        <SelectItem value="Feira e exposição">
                          Feira e exposição
                        </SelectItem>
                        <SelectItem value="outro">Outro</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.watch("tipo_evento") === "outro" && (
                <>
                  <FormField
                    control={form.control}
                    name="outro_tipo_evento"
                    render={({ field }) => (
                      <FormItem className="w-full mt-5">
                        <FormLabel className="text-start text-[#2190BF] font-nunito font-light text-lg ">
                          Descreva qual o tipo do evento{" "}
                          <span className="text-red-500">*</span>
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            className="w-full border border-[#2190BF]"
                            {...field}
                            required
                            disabled
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </>
              )}
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <Label
                htmlFor="picture"
                className="text-start text-[#2B3940] font-nunito font-light text-lg"
              >
                Data do Evento <span className="text-red-500">*</span>
              </Label>
              <FormField
                control={form.control}
                name="data_evento"
                render={({ field }) => (
                  <FormItem className="flex flex-col w-full">
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            disabled
                            className={cn(
                              "max-w-[500px] w-full pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "dd/MM/yyyy")
                            ) : (
                              <span>Selecione a data do seu evento</span>
                            )}
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-full max-w-[500px] p-0"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          required
                          disabled
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex flex-col items-start justify-start w-full max-w-[800px] text-start">
              <FormField
                control={form.control}
                name="telefone"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Telefone (ex: 49 9988-8888){" "}
                      <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Input
                        className="w-full"
                        disabled
                        {...field}
                        required
                        onChange={(e) => {
                          form.setValue(
                            "telefone",
                            formatarTelefone(e.currentTarget.value)
                          );
                        }}
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
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel className="text-start text-[#2B3940] font-nunito font-light text-lg">
                      Email
                    </FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        className="w-full"
                        {...field}
                        disabled
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
                name="descricao"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel>
                      Descrição <span className="text-red-500">*</span>
                    </FormLabel>
                    <FormControl>
                      <Textarea required {...field} disabled />
                    </FormControl>
                    <FormMessage />
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
                      Valor a ser cobrado
                    </FormLabel>
                    <FormControl>
                      <Input type="number" className="w-full" {...field} />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full justify-center items-center md:justify-start md:items-start">
              <Button className=" bg-[#2190BF] text-white font-nunito font-semibold text-lg w-full max-w-[450px] ">
                Criar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default CreateBudget;
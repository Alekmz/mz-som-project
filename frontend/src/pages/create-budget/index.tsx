import { useState } from "react";
import { Button } from "../../components/ui/button";
import { Input } from "../../components/ui/input";
import { Label } from "../../components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../components/ui/select";
import { Textarea } from "../../components/ui/textarea";
import { format } from "date-fns";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../../components/ui/popover";
import { cn } from "../../lib/utils";
import { Calendar } from "../../components/ui/calendar";
import { useForm } from "react-hook-form";
import MultipleSelector, { Option } from "../../components/ui/multi-select";
import { useToast } from "../../components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "../../components/ui/dialog";
import { FaWhatsapp } from "react-icons/fa";
import { useCreateBudget } from "../BudgetForm/data/create-budget";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";
import Footer from "../../components/footer/footer";
// import { useCreateBudget } from "./data/create-budget";

const BudgetRequest = () => {
  const [openDialog, setOpenDialog] = useState(false);
  const { toast } = useToast();
  const { mutateAsync } = useCreateBudget();

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
      mutateAsync(formattedData)
        .then(() => {
          setOpenDialog(true);
        })
        .catch((error: { message: any }) => {
          toast({
            title: "Erro",
            description: error.message,
            variant: "destructive",
          });
        });
    }
  };

  const sendMensage = () => {
    const mensagemPadrao =
      "Olá, acabei te enviar uma solicitação de orcamento. Qualquer duvida pode falar comigo. Obrigado!";
    const numeroWhatsApp = "+554999919198";
    const url = `https://api.whatsapp.com/send?phone=${numeroWhatsApp}&text=${encodeURIComponent(
      mensagemPadrao
    )}`;
    window.open(url, "_blank");
  };
  return (
    <div className="w-full flex flex-col h-full">
      <Header />
      <Sidebar />
      <div className="w-full flex justify-center items-center flex-col h-full">
        <div className="flex flex-col w-full items-center gap-5 h-full pt-12 pb-14 px-10 overflow-x-clip ">
          {openDialog && (
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogContent className="w-full max-w-[800px] flex flex-col justify-center items-center gap-5">
                <DialogTitle className="font-nunito font-bold text-2xl text-green-600">
                  Orçamento feito com sucesso!
                </DialogTitle>
                <DialogDescription className="text-[#2B3940] text-xl font-nunito text-center flex justify-center items-center w-full">
                  Você deseja fazer o download?
                </DialogDescription>
                <Button
                  className="bg-green-600 w-full max-w-[400px] flex items-center gap-2 hover:bg-green-700"
                  onClick={sendMensage}
                >
                  Entrar em contato via Whatsapp
                  <FaWhatsapp size={25} />
                </Button>
              </DialogContent>
            </Dialog>
          )}
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
                        <Input required {...field} />
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
                        <Input {...field} />
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
                      >
                        <FormControl>
                          <SelectTrigger className="w-full max-w-[500px]">
                            <SelectValue placeholder="Selecione um tipo de evento" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="casamento">Casamento</SelectItem>
                          <SelectItem value="formatura">Formatura</SelectItem>
                          <SelectItem value="festa_aniversario">
                            Festa de aniversário
                          </SelectItem>
                          <SelectItem value="evento_corporativo">
                            Evento corporativos
                          </SelectItem>
                          <SelectItem value="show">Show</SelectItem>
                          <SelectItem value="festival_musica">
                            Festival de música
                          </SelectItem>
                          <SelectItem value="evento_esportivo">
                            Evento esportivo
                          </SelectItem>
                          <SelectItem value="cerimonia_religiosa">
                            Cerimônia religiosa
                          </SelectItem>
                          <SelectItem value="feira_exposicao">
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
                            disabled={(date) => date < new Date("1900-01-01")}
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
                        <Input type="email" className="w-full" {...field} />
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
                        <Textarea required {...field} />
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
      <Footer />
    </div>
  );
};

export default BudgetRequest;

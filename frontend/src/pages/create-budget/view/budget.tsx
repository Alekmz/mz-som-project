import { useContext, useRef, useState } from "react";
import Logo from "../../../assets/logo_mz.png";
import { useReactToPrint } from 'react-to-print';
import { useGetSoundPlansEquipments } from '../../SoundPlans/data/get-sound-plans-equipments';
import { DataBudgetContext } from "../../../context/DataBudgetContext";
import { toast } from "../../../components/ui/use-toast";
import { useExportToPdf } from "../data/pdf-export";
import { sendPdfViaWhatsApp } from "../data/send-whatsapp";
import {format} from 'date-fns';
interface Equipment {
  id: number;
  name: string;
  amount: number;
  departmentId: number;
}

interface Department {
  id: number;
  name: string;
  equipments: Equipment[];
}

interface SoundPlans {
  id: number;
  name: string;
  caminhao: string;
  departmentId: number;
  valor_plano: number;
  department?: Department;
}

const EventDataGrid = ({ data, ref }: { data: any, ref?: any
 }) => {
  const {
    servicos,
    dataEvento,
    email,
    telefone,
    responsavel,
    cpfCnpj,
    localEvento,
    soundPlanId,
    tipoEvento,
    value_to_be_charged,
  } = data;

  const { isLoading, isError, data: soundPlanData, error } = useGetSoundPlansEquipments(soundPlanId);

  const planValue = soundPlanData?.valor  || value_to_be_charged || 0;

  console.log(new Date(dataEvento).toDateString());

  const equipamentos = soundPlanData?.equipamentos;

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados: {error?.message}</p>;

  return (
    <div id="pdf" className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md" ref={ref}>
      {/* Cabeçalho */}
      <div className="text-center mb-2">
        <div className="flex flex-col justify-center items-center mb-4">
          <img src={Logo} alt="Logo da Empresa" className="h-16 w-auto mr-4" loading="lazy" />
          <div>
            <h1 className="text-2xl font-bold">Orçamento de Evento</h1>
            <p className="text-gray-500">Emitido em {new Date().toLocaleDateString()}</p>
          </div>
        </div>
      </div>

      {/* Informações principais */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Informações do Evento</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p><strong>Responsável:</strong> {responsavel}</p>
            <p><strong>Email:</strong> {email || '-'}</p>
            <p><strong>Telefone:</strong> {telefone}</p>
            <p><strong>Tipo de Evento:</strong> {tipoEvento}</p>

          </div>
          <div>
            <p><strong>CPF/CNPJ:</strong> {cpfCnpj || '-'}</p>
            <p><strong>Local do Evento:</strong> {localEvento}</p>
            <p><strong>Data do Evento:</strong> {dataEvento ?  format(new Date(dataEvento).toDateString(), "dd/MM/yy") : "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Serviços */}
      <div className="mb-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Serviços solicitados</h2>
          <div className="flex flex-col">
            {servicos.map((servico: string, index: number) => (
              <p className="pl-2" key={index}>
                {servico.replace("_", " ")}
              </p>
            ))}
          </div>
        </div>
        <div>
        <h2 className="text-lg font-semibold mb-2">Equipamentos</h2>
        <div className="flex flex-col">
          {equipamentos && (
            Object.values(equipamentos).map((equipamento) => (
              equipamento.map((equipamento) => (
              <p className="pl-2" key={equipamento.name}>
                {equipamento.name}
              </p>
            )))
          ))}
        </div>
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <h2 className="text-xl font-bold mb-2">Total</h2>
        <p className="text-xl font-bold text-green-600">
          {planValue
            ? Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(Number(planValue))
            : "N/A"}
        </p>
      </div>

      {/* Espaço para Assinatura */}
      <div className="mt-20">
        <div className="flex justify-center items-center">
          <div className="flex flex-col">
            <div className="border-t border-gray-400 w-72 mb-2"></div>
          </div>
        </div>
      </div>

      {/* Dados principais da empresa */}
      <div className="mt-4 text-center">
        <h2 className="text-xl font-semibold mb-4">MZ Som Produções e Evento</h2>
        <p><strong>CNPJ:</strong> 16.444.136/0001-20</p>
        <p><strong>Endereço:</strong> Rua 1 de Janeiro, 157, Bairro Vila Salete, Fraiburgo - SC</p>
        <p><strong>Telefone:</strong> (49) 9 9991-9198</p>
        <p><strong>Email:</strong> mzsom@hotmail.com</p>
      </div>
    </div>
  );
};


const ExportBudget = ({ dataForBudget }: any) => {
  const dataForBudgetData = useContext(DataBudgetContext);
  const componentRef = useRef<HTMLDivElement>(null);
  const { generatePdf } = useExportToPdf();
  const [isLoading, setIsLoading] = useState(false);

  const dataBudget = dataForBudgetData?.dataForBudget || dataForBudget;

  const handleSendPdf = async () => {
    // setIsLoading(true);
    try {
      console.log('Starting PDF generation...');
      const pdfBlob = await generatePdf(componentRef)
      console.log('PDF generated successfully:', pdfBlob);

      console.log('Sending PDF via WhatsApp...');
      await sendPdfViaWhatsApp(pdfBlob, dataBudget.telefone);
      console.log('PDF sent successfully');

      toast({
        title: "Success",
        description: "PDF sent via WhatsApp successfully!",
      });
    } catch (error) {
      console.error('Error in handleSendPdf:', error);
      toast({
        title: "Error",
        description: `Failed to send PDF: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  return (
    <div id="test" className="w-full flex pt-4 items-center flex-col h-full min-h-screen">

      <div className="w-full flex flex-col h-full p-16" ref={componentRef}>
        <EventDataGrid data={dataBudget} />
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded-md print:hidden mb-5"
      >
        Baixar Orçamento
      </button>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md print:hidden mb-5"
        onClick={handleSendPdf} disabled={isLoading}>
            {isLoading ? 'Enviando...' : 'Enviar PDF via WhatsApp'}
      </button>
    </div>
  );
};

export default ExportBudget;

import { useRef } from "react";
import Logo from "../../../assets/logo_mz.png";
import { useReactToPrint } from 'react-to-print';
import { useGetSoundPlansEquipments } from '../../SoundPlans/data/get-sound-plans-equipments';


// Interface para equipamentos
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
  department?: Department; // Inclui o departamento completo
}

const EventDataGrid = ({ data }: { data: any }) => {
  const {
    servicos,
    dataEvento,
    email,
    telefone,
    responsavel,
    cpfCnpj,
    localEvento,
    soundPlanId,
    value_to_be_charged,
  } = data;

  const { isLoading, isError, data: soundPlanData, error } = useGetSoundPlansEquipments(soundPlanId);

  // Extraindo os equipamentos do departamento, se disponíveis
  const equipamentos = soundPlanData?.department?.equipments;

  if (isLoading) return <p>Carregando...</p>;
  if (isError) return <p>Erro ao carregar dados: {error?.message}</p>;
  // const eventDetails = [
  //   { title: "Serviços", content: servicos?.length ? servicos.join(", ").replace("_",) : "N/A" },
  //   {
  //     title: "Data do Evento",
  //     content: dataEvento ? new Date(dataEvento).toLocaleDateString() : "Data não disponível",
  //   },
  //   { title: "Email", content: email || "N/A" },
  //   { title: "Telefone", content: telefone || "N/A" },
  //   { title: "Responsável", content: responsavel || "N/A" },
  //   { title: "CPF/CNPJ", content: cpfCnpj || "N/A" },
  //   { title: "Local do Evento", content: localEvento || "N/A" },
  //   { title: "Tipo de Evento", content: tipoEvento || "N/A" },
  //   { title: "Descrição", content: descricao || "N/A" },
  //   {
  //     title: "Valor a Ser Cobrado",
  //     content: value_to_be_charged
  //       ? Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value_to_be_charged)
  //       : "N/A",
  //   },
  // ];




  return (
    <div className="max-w-3xl mx-auto bg-white p-6 shadow-md rounded-md">
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
            <p><strong>Email:</strong> {email}</p>
            <p><strong>Telefone:</strong> {telefone}</p>
          </div>
          <div>
            <p><strong>CPF/CNPJ:</strong> {cpfCnpj}</p>
            <p><strong>Local do Evento:</strong> {localEvento}</p>
            <p><strong>Data do Evento:</strong> {dataEvento ? new Date(dataEvento).toLocaleDateString() : "N/A"}</p>
          </div>
        </div>
      </div>

      {/* Serviços */}
      <div className="mb-8 space-y-4">
        <div>
          <h2 className="text-lg font-semibold mb-2">Serviços solicitados</h2>
          <div className="flex flex-wrap">
            {servicos.map((servico: string, index: number) => (
              <p className="pl-2" key={index}>
                {servico.replace("_", " ")},
              </p>
            ))}
          </div>
        </div>
        <div>
        <h2 className="text-lg font-semibold mb-2">Equipamentos</h2>
        <div className="flex flex-wrap">
          {equipamentos && equipamentos.length > 0 ? (
            equipamentos.map((equipamento: Equipment) => (
              <p className="pl-2" key={equipamento.id}>
                {equipamento.name},
              </p>
            ))
          ) : (
            <p>Nenhum equipamento encontrado.</p>
          )}
        </div>
        </div>
      </div>

      {/* Total */}
      <div className="text-right">
        <h2 className="text-xl font-bold mb-2">Total</h2>
        <p className="text-xl font-bold text-green-600">
          {value_to_be_charged
            ? Intl.NumberFormat('pt-br', { style: 'currency', currency: 'BRL' }).format(value_to_be_charged)
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
        <p><strong>Telefone:</strong> (49) 3246-3198 ou 9 9991-9198</p>
        <p><strong>Email:</strong> mzsom@hotmail.com</p>
      </div>
    </div>
  );
};


const ExportBudget = ({ dataForBudget }: any) => {
  const componentRef = useRef<HTMLDivElement | null>(null);


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(dataForBudget);
  return (
    <div className="w-full flex pt-4 items-center flex-col h-full min-h-screen" ref={componentRef}>

      <div className="w-full flex flex-col h-full p-16">
        <EventDataGrid data={dataForBudget} />
      </div>
      <button
        onClick={handlePrint}
        className="bg-blue-500 text-white px-4 py-2 rounded-md print:hidden mb-5"
      >
        Download Orçamento
      </button>
    </div>
  );
};

export default ExportBudget;

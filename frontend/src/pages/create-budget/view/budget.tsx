import { useRef } from "react";
import Logo from "../../../assets/logo_mz.png";
import { useReactToPrint } from 'react-to-print';

const EventDataGrid = ({ data }) => {
  const {
    servicos,
    data_evento,
    email,
    telefone,
    responsavel,
    cpf_cnpj,
    local_evento,
    tipo_evento,
    descricao,
    value_to_be_charged,
  } = data;

  const eventDetails = [
    { title: "Serviços", content: servicos.join(", ") },
    {
      title: "Data do Evento",
      content: new Date(data_evento).toLocaleDateString(),
    },
    { title: "Email", content: email || "N/A" },
    { title: "Telefone", content: telefone },
    { title: "Responsável", content: responsavel },
    { title: "CPF/CNPJ", content: cpf_cnpj || "N/A" },
    { title: "Local do Evento", content: local_evento },
    { title: "Tipo de Evento", content: tipo_evento },
    { title: "Descrição", content: descricao },
    { title: "Valor a Ser Cobrado", content: Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'}).format(value_to_be_charged)  },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {eventDetails.map((detail, index) => (
        <div key={index} className="bg-white shadow-md rounded-md p-4">
          <h3 className="text-lg font-bold mb-2">{detail.title}</h3>
          <p>{detail.content}</p>
        </div>
      ))}
    </div>
  );
};


const ExportBudget = ({ dataForBudget }: any) => {
  const componentRef = useRef();


  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  console.log(dataForBudget);
  return (
    <div className="w-full flex pt-7 items-center flex-col h-full min-h-screen" ref={componentRef}>
      <img src={Logo} alt="" loading="lazy" />

      <div className="w-full flex flex-col h-full p-20">
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

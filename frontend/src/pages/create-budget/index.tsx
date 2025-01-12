import { useContext, useState } from "react";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";
import Footer from "../../components/footer/footer";

import CreateBudget from "./view/createbudget";
import ExportBudget from "./view/budget";
import { DataBudgetContext } from "../../context/DataBudgetContext";

const EventDataGrid = ({ data }: { data: any }) => {
  const { servicos, data_evento, email, telefone, responsavel, cpf_cnpj, local_evento, tipo_evento, descricao, value_to_be_charged } = data;

  const eventDetails = [
    { title: 'Serviços', content: servicos.join(', ') },
    { title: 'Data do Evento', content: new Date(data_evento).toLocaleDateString() },
    { title: 'Email', content: email || 'N/A' },
    { title: 'Telefone', content: telefone },
    { title: 'Responsável', content: responsavel },
    { title: 'CPF/CNPJ', content: cpf_cnpj || 'N/A' },
    { title: 'Local do Evento', content: local_evento },
    { title: 'Tipo de Evento', content: tipo_evento },
    { title: 'Descrição', content: descricao },
    { title: 'Valor a Ser Cobrado', content: value_to_be_charged },
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

const BudgetRequest = () => {
  const [dataForBudget, setDataForBudget] = useState<any>(undefined);
  const dataForBudgetContext = useContext(DataBudgetContext);
  console.log(dataForBudgetContext);
  return (
    <div className="w-full flex flex-col h-full">
      {dataForBudget === undefined && !dataForBudgetContext?.dataForBudget ? (
        <>
          <Header />
          <Sidebar />
          <CreateBudget setDataForBudget={dataForBudgetContext?.setDataForBudget} />
          <Footer />
        </>
      ) : (
        <ExportBudget dataForBudget={dataForBudget} />
      )}
    </div>
  );
};

export default BudgetRequest;
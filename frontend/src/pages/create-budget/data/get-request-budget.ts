import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Budget {
  id: number;
  responsavel: string;
  cpf_cnpj: null;
  local_evento: string;
  servicos: string[];
  data_evento: string;
  telefone: string;
  tipo_evento: string;
  email: string | null;
  descricao: string;
  data_cadastro: string;
}

export const useGetRequestBudget = (idBudget: number) => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["getRequestBudget"],
    queryFn: () =>
      axios
        .get(`http:s//app.mzsom.com.br/api/budget-request/${idBudget}`)
        .then((res) => res.data as Budget),
  });
  return {
    isPending,
    isError,
    data,
    error,
  };
};

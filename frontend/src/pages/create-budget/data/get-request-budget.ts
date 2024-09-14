import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Budget {
  id: number;
  responsavel: string;
  cpf_cnpj: string;
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
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ["getRequestBudget", idBudget], // Inclui o idBudget na queryKey
    queryFn: () =>
      axios
        .get(`http://localhost:3000/budget-request/${idBudget}`)
        .then((res) => res.data as Budget),
    enabled: !!idBudget, // O "enabled" deve estar dentro do objeto de configuração
  });

  return {
    isLoading,  // Substitui isPending por isLoading
    isError,
    data,
    error,
  };
};
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

export const useGetBudgets = () => {
  const { isLoading, isError, data, error } = useQuery<Budget[]>({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get("http:s//app.mzsom.com.br/api/budget-request")
        .then((res) => res.data as Budget[]), // Certifique-se de que res.data é um array de Budgets
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
};

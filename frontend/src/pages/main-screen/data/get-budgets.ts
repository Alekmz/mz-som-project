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
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get("http://localhost:3000/budget")
        .then((res) => res.data as Budget),
  });
  return {
    isPending,
    isError,
    data,
    error,
  };
};

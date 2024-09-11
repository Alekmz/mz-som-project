import { useQuery } from "@tanstack/react-query";
import axios from "axios";

interface Budget {
    id: number;
    responsavel: string;
    cpfCnpj: null;
    localEvento: string;
    servicos: string[];
    dataEvento: string;
    telefone: string;
    tipoEvento: string;
    email: string | null;
    descricao: string;
    data_cadastro: string;
    soundPlans: number;
    observacoes: string;

  }

  export const useGetAllBudgets = () => {
    const { isLoading, isError, data, error } = useQuery<Budget[]>({
      queryKey: ["todos"],
      queryFn: () =>
        axios
          .get("http:s//app.mzsom.com.br/api/budgets")
          .then((res) => res.data as Budget[]), // Certifique-se de que res.data é um array de Budgets
    });

    return {
      isLoading,
      isError,
      data,
      error,
    };
  };

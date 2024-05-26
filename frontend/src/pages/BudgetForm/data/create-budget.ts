import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      return axios.post('https://pedidos-orcamento.mzsom.com.br/api/budget', budget)
    },
  })

  return {
    ...mutation,
  }
}

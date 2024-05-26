import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      return axios.post('https://orcamentos.mzsom.com.br/api/budget', budget)
    },
  })

  return {
    ...mutation,
  }
}

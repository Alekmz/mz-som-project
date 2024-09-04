import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      // return axios.post('https://app.mzsom.com.br/api/budget', budget)
            return axios.post('https://app.mzsom.com.br/budget-request', budget)
    },
  })

  return {
    ...mutation,
  }
}

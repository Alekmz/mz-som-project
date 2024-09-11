import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      // return axios.post('http:s//app.mzsom.com.br/api/api/budget', budget)
            return axios.post('http:s//app.mzsom.com.br/api/budget-request', budget)
    },
  })

  return {
    ...mutation,
  }
}

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const postCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      // return axios.post('http:s//app.mzsom.com.br/api/api/budget', budget)
            return axios.post('https://app.mzsom.com.br/api/create-budget', budget)
    },
  })

  return {
    ...mutation,
  }
}

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      // return axios.post('http://localhost:3000/api/budget', budget)
            return axios.post('http://localhost:3000/budget-request', budget)
    },
  })

  return {
    ...mutation,
  }
}

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      return axios.post('http://54.91.65.78:3000/budget', budget)
    },
  })

  return {
    ...mutation,
  }
}

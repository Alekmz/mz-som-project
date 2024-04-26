import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateBudget = () => {
  const mutation = useMutation({
    mutationFn: (budget) => {
      return axios.post('http://3.139.100.195:3000/budget', budget)
    },
  })

  return {
    ...mutation,
  }
}

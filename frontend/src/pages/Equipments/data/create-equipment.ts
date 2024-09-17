import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateEquipment = () => {
  const mutation = useMutation({
    mutationFn: (equipment) => {
      // return axios.post('http:s//app.mzsom.com.br/api/api/budget', budget)
      return axios.post('http://localhost:3000/equipment', equipment)
    },
  })

  return {
    ...mutation,
  }
}

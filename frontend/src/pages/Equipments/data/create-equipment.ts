import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateEquipment = () => {
  const mutation = useMutation({
    mutationFn: (equipment) => {
      // return axios.post('https://app.mzsom.com.br/api/budget', budget)
      return axios.post('https://app.mzsom.com.br/equipment', equipment)
    },
  })

  return {
    ...mutation,
  }
}

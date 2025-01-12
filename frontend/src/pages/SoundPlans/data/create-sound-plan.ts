import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateSoundPlan = () => {
  const mutation = useMutation({
    mutationFn: (soundPlan:any) => {
        return axios.post('https://app.mzsom.com.br/api/sound-plans', soundPlan)
    },
  })

  return {
    ...mutation,
  }
}

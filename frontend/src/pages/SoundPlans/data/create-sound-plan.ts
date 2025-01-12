import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateSoundPlan = () => {
  const mutation = useMutation({
    mutationFn: (soundPlan:any) => {
        return axios.post('http://localhost:3000/sound-plans', soundPlan)
    },
  })

  return {
    ...mutation,
  }
}

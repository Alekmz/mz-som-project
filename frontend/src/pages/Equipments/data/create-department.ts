import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateDepartment = () => {
  const mutation = useMutation({
    mutationFn: (department) => {
      // return axios.post('http:s//app.mzsom.com.br/api/api/budget', budget)
      return axios.post('http:s//app.mzsom.com.br/api/department', department)
    },
  })

  return {
    ...mutation,
  }
}

import { useMutation } from "@tanstack/react-query"
import axios from "axios"

export const useCreateDepartment = () => {
  const mutation = useMutation({
    mutationFn: (department) => {
      // return axios.post('http:s//app.mzsom.com.br/api/api/budget', budget)
      return axios.post('http://localhost:3000/department', department)
    },
  })

  return {
    ...mutation,
  }
}

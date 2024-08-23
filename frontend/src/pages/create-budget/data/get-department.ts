import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//interface para o departamento
interface Department {
  id: number;
  name: string;
}

export const useGetDepartments = () => {
  const { isLoading, isError, data, error } = useQuery<Department[]>({
    queryKey: ["departments"], 
    queryFn: () =>
      axios
        .get(`http://localhost:3000/department`)
        .then((res) => res.data as Department[]), 
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
}

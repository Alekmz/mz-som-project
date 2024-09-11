import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Department {
  id: number;
  name:string;
}

export const useGetDepartments = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      axios
        .get("http:s//app.mzsom.com.br/api/department")
        .then((res) => res.data as Department[]),
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch
  };
};

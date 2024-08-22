import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Department {
  id: number;
  name:string;
}

export const useGetDepartments = () => {
  const { isPending, isError, data, error } = useQuery({
    queryKey: ["departments"],
    queryFn: () =>
      axios
        .get("http://localhost:3000/department")
        .then((res) => res.data as Department[]),
  });
  return {
    isPending,
    isError,
    data,
    error,
  };
};

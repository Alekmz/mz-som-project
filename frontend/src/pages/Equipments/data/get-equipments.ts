import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export interface Equipment {
  id: number;
  name: string;
  departmentId: number;
  amount: number;
}

export const useGetEquipments = () => {
  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["todos"],
    queryFn: () =>
      axios
        .get(`https://app.mzsom.com.br/equipments/department/${1}`)
        .then((res) => res.data as Equipment[]),
  });
  return {
    isPending,
    isError,
    data,
    error,
    refetch
  };
};

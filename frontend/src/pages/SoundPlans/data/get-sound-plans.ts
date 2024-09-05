import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//interface para o departamento
interface SoundPlans {
  id: number
  name: string
  caminhao: string
  departmentId: number
  valor_plano: number
}
export const useGetSoundPlans = () => {
  const { isLoading, isError, data, error } = useQuery<SoundPlans[]>({
    queryKey: ["soundPlans"],
    queryFn: () =>
      axios
        .get(`http://app.mzsom.com.br/api/sound-plans`)
        .then((res) => res.data as SoundPlans[]),
  });

  return {
    isLoading,
    isError,
    data,
    error,
  };
}

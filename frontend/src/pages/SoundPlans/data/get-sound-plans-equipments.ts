import { useQuery } from "@tanstack/react-query";
import axios from "axios";

//interface para o departamento
interface Equipment {
    id: number;
    name: string;
    amount: number;
    departmentId: number;
}

interface Department {
    id: number;
    name: string;
    equipments: Equipment[];
}

interface SoundPlans {
    id: number;
    name: string;
    caminhao: string;
    departmentId: number;
    valor_plano: number;
    department?: Department; // Inclua o departamento completo aqui
}
export const useGetSoundPlansEquipments = (idSoundPlan: number) => {
    const { isLoading, isError, data, error } = useQuery({
        queryKey: ["IdSoundPlans"],
        queryFn: () =>
            axios
                .get(`http://localhost:3000/sound-plans/${idSoundPlan}`)
                .then((res) => res.data as SoundPlans),
                
    });

    return {
        isLoading,
        isError,
        data,
        error,
    };
}

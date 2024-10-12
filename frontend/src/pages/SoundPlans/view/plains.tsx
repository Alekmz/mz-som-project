import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../components/ui/table";
import { Button } from "../../../components/ui/button";
import { useGetSoundPlans } from "../data/get-sound-plans";
import { useGetSoundPlansEquipments } from "../data/get-sound-plans-equipments";
import { formatCurrency } from "../../../utils/formatCurrency";

interface Props {
  setHiddenPlains: (x: boolean) => void;
}
const Plains = ({ setHiddenPlains }: Props) => {
  const { data } = useGetSoundPlans();

  console.log(data)
  return (
    <div className="w-full flex justify-center items-center flex-col h-full">
      <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 overflow-x-clip ">
        <div className="flex w-full px-10 justify-end items-center">
          <Button onClick={() => setHiddenPlains(true)} className="text-end">
            Criar novo plano
          </Button>
        </div>
        <div className="flex items-center  dark:bg-gray-800">
          <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
            Planos de som
          </h2>
        </div>
        <div className="flex justify-center">
          <Table className="">
            <TableHeader>
              <TableRow>
                <TableHead>Plano</TableHead>
                <TableHead>Valor do Plano</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data?.map((plan) => (
                <TableRow key={plan.id}>
                  <TableCell>{plan.name}</TableCell>
                  <TableCell>{formatCurrency(plan.valor_plano)}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default Plains;

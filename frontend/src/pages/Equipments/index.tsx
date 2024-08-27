import Footer from "../../components/footer/footer";
import Header from "../../components/header/Header";
import Sidebar from "../../components/menu/Sidebar";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../components/ui/accordion";
import { useState } from "react";
import {
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  Table,
} from "../../components/ui/table";
import { Button } from "../../components/ui/button";
import { useGetEquipments } from "./data/get-equipments";
import { useGetDepartments } from "./data/get-departments";
import CreateDepartments from "./CreateDepartments";
import CreateEquipment from "./CreateEquipment";

const Equipments = () => {
  const [hiddenPlains, setHiddenPlains] = useState(false);
  const [isCreateDepartment, setIsCreateDepartment] = useState(false);
  const [isCreateEquipment, setIsCreateEquipment] = useState(false);
  const { isPending, isError, data, error } = useGetEquipments();
  const { data: departments } = useGetDepartments();

  return (
    <>
      <Header />
      <Sidebar />
      {isCreateDepartment && <CreateDepartments setIsCreateDepartment={setIsCreateDepartment} />}
      {isCreateEquipment && <CreateEquipment setIsCreateEquipment={setIsCreateEquipment} />}

      {!isCreateDepartment && !isCreateEquipment && (
        <div className="w-full flex justify-center items-center flex-col h-full">
          <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 overflow-x-clip ">
            <div className="flex w-full px-10 justify-between items-center pl-60">
              <Button
                onClick={() => setIsCreateDepartment(true)}
                className="text-end"
              >
                Criar novo departamento
              </Button>
              <Button
                onClick={() => setIsCreateEquipment(true)}
                className="text-end"
              >
                Criar novo equipamento
              </Button>
            </div>
            <div className="flex items-center  dark:bg-gray-800">
              <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
                Equipamentos em estoque
              </h2>
            </div>
            <Accordion
              type="single"
              collapsible
              className="w-full pl-[250px] px-10"
            >
              {departments?.map((department) => {
                return (
                  <AccordionItem value={String(department.id)}>
                    <AccordionTrigger>{department.name}</AccordionTrigger>

                    <AccordionContent>
                      <div className="flex justify-center">
                        <Table className="">
                          <TableHeader>
                            <TableRow>
                              <TableHead>Nome equipamento</TableHead>
                              <TableHead>Quantidade</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {data?.map((equipment) => {
                              if(equipment.departmentId !== department.id) return
                              return (
                                <TableRow>
                                  <TableCell className="font-medium">
                                    {equipment.name}
                                  </TableCell>
                                  <TableCell>{equipment.amount}</TableCell>
                                </TableRow>
                              );
                            })}
                          </TableBody>
                        </Table>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
            </Accordion>
          </div>
        </div>
      )}
      <Footer />
    </>
  );
};

export default Equipments;

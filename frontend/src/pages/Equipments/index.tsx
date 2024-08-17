// import Footer from "../../components/footer/footer";
// import Header from "../../components/header/Header";
// import Sidebar from "../../components/menu/Sidebar";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "../../components/ui/accordion";
// import { useState } from "react";
// import {
//   TableHeader,
//   TableRow,
//   TableHead,
//   TableBody,
//   TableCell,
//   Table,
// } from "../../components/ui/table";
// import { Button } from "../../components/ui/button";

// const Equipments = () => {
//   const [hiddenPlains, setHiddenPlains] = useState(false);

//   return (
//     <>
//       <Header />
//       <Sidebar />
//       <div className="w-full flex justify-center items-center flex-col h-full">
//         <div className="flex flex-col w-full justify-center items-center gap-5 h-full mt-28 overflow-x-clip ">
//           <div className="flex w-full px-10 justify-end items-center">
//             <Button onClick={() => setHiddenPlains(true)} className="text-end">
//               Criar novo plano
//             </Button>
//           </div>
//           <Accordion type="single" collapsible className="w-full">
//             <AccordionItem value="item-1">
//               <AccordionTrigger>Is it accessible?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It adheres to the WAI-ARIA design pattern.
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-2">
//               <AccordionTrigger>Is it styled?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It comes with default styles that matches the other
//                 components&apos; aesthetic.
//               </AccordionContent>
//             </AccordionItem>
//             <AccordionItem value="item-3">
//               <AccordionTrigger>Is it animated?</AccordionTrigger>
//               <AccordionContent>
//                 Yes. It&apos;s animated by default, but you can disable it if
//                 you prefer.
//               </AccordionContent>
//             </AccordionItem>
//           </Accordion>
//           <div className="flex items-center  dark:bg-gray-800">
//             <h2 className="text-3xl text-[#2B3A41] text-center dark:text-gray-500">
//               Planos de som
//             </h2>
//           </div>
//           <div className="flex justify-center">
//             <Table className="">
//               <TableHeader>
//                 <TableRow>
//                   <TableHead>Nome equipamento</TableHead>
//                   <TableHead>Quantidade</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 <TableRow>
//                   <TableCell className="font-medium">Caixa grave</TableCell>
//                   <TableCell>10</TableCell>
//                 </TableRow>
//               </TableBody>
//             </Table>
//           </div>
//         </div>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default Equipments;

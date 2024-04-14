import prisma from "../server/prisma";
import { Prisma } from '@prisma/client';

export const createCliente = async (data: Prisma.ClienteEventoCreateInput) => {
    const cliente = await prisma.clienteEvento.create({
        data
    });
    return cliente;
}

export const getAll = async () => {
    const clientes = await prisma.clienteEvento.findMany({});
    return clientes;
}







// import ClienteController from "../controllers/cliente.controller";



// async function main() {
//     let dataString = '2024-03-26';
//     let data = new Date(dataString);
//     const prisma = new ClienteController();

//             const cliente = await prisma.create({
//                 Empresa: "Empresa Teste",
//                 Responsavel: "Tadeu da Silva",
//                 CNPJ_CPF: "38753450001",
//                 Endereco: "Rua testando banco",
//                 Numero: 4,
//                 Bairro: "Centro",
//                 Cidade: "Fraiburgo",
//                 Tipo_Evento: "Casamento",
//                 data_evento: data,
//                 contato: "49989767898",
//                 email: "teste@gmail.com",
//                 descricao: "Um casamento com aproximadamente 300 pessoas",
//                 data_cadastro: data
//             });

//             console.log(cliente);
// };
// main();
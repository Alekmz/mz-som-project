// import ClienteController from "../controll/clientes";



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

import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Application } from 'express';
import userRoutes from '../src/router/index.server'; // Importando userRoutes diretamente

dotenv.config();

const app: Application = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

userRoutes(app);

app.listen(PORT, () => {
  console.log(`API iniciada na porta ${PORT}`);
});




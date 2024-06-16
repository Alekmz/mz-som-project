/*
  Warnings:

  - You are about to drop the `Budget` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Budget";

-- CreateTable
CREATE TABLE "budget_request" (
    "id" SERIAL NOT NULL,
    "responsavel" TEXT NOT NULL,
    "cpf_cnpj" TEXT,
    "local_evento" TEXT NOT NULL,
    "servicos" TEXT[],
    "data_evento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "tipo_evento" TEXT,
    "email" TEXT,
    "descricao" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_request_pkey" PRIMARY KEY ("id")
);

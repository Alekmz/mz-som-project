-- CreateTable
CREATE TABLE "Budget" (
    "id" SERIAL NOT NULL,
    "responsavel" TEXT NOT NULL,
    "cnpj_cpf" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "tipo_servico" TEXT[],
    "data_evento" TIMESTAMP(3) NOT NULL,
    "contato" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

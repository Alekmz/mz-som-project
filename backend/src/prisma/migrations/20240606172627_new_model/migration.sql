-- CreateTable
CREATE TABLE "Budget" (
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

    CONSTRAINT "Budget_pkey" PRIMARY KEY ("id")
);

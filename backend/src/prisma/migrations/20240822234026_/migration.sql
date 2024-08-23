-- CreateTable
CREATE TABLE "soundPlans" (
    "id" SERIAL NOT NULL,
    "caminhao" TEXT NOT NULL,
    "departamentId" INTEGER,
    "valor_plano" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "soundPlans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "budget" (
    "id" SERIAL NOT NULL,
    "responsavel" TEXT NOT NULL,
    "cpfCnpj" TEXT,
    "localEvento" TEXT NOT NULL,
    "servicos" TEXT[],
    "dataEvento" TIMESTAMP(3) NOT NULL,
    "telefone" TEXT NOT NULL,
    "tipoEvento" TEXT,
    "email" TEXT,
    "descricao" TEXT NOT NULL,
    "soundPlanId" INTEGER,
    "observacoes" TEXT NOT NULL,
    "data_cadastro" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "budget_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "soundPlans" ADD CONSTRAINT "soundPlans_departamentId_fkey" FOREIGN KEY ("departamentId") REFERENCES "departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_soundPlanId_fkey" FOREIGN KEY ("soundPlanId") REFERENCES "soundPlans"("id") ON DELETE SET NULL ON UPDATE CASCADE;

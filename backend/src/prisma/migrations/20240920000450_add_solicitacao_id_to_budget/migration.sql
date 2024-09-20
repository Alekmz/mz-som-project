-- AlterTable
ALTER TABLE "budget" ADD COLUMN     "solicitacaoId" INTEGER;

-- AddForeignKey
ALTER TABLE "budget" ADD CONSTRAINT "budget_solicitacaoId_fkey" FOREIGN KEY ("solicitacaoId") REFERENCES "budget_request"("id") ON DELETE SET NULL ON UPDATE CASCADE;

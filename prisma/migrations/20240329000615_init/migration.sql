-- CreateTable
CREATE TABLE `ClienteEvento` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `empresa` VARCHAR(191) NOT NULL,
    `responsavel` VARCHAR(191) NOT NULL,
    `cnpj_cpf` VARCHAR(191) NOT NULL,
    `endereco` VARCHAR(191) NOT NULL,
    `numero` INTEGER NOT NULL,
    `bairro` VARCHAR(191) NOT NULL,
    `cidade` VARCHAR(191) NOT NULL,
    `tipo_Evento` VARCHAR(191) NOT NULL,
    `data_evento` DATETIME(3) NOT NULL,
    `contato` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `descricao` VARCHAR(191) NOT NULL,
    `data_cadastro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

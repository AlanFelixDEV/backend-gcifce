/*
  Warnings:

  - You are about to alter the column `data` on the `evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - A unique constraint covering the columns `[email]` on the table `usuario` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `evento` MODIFY `data` DATETIME NOT NULL;

-- AlterTable
ALTER TABLE `usuario` ADD COLUMN `status` ENUM('ativo', 'desativo') NOT NULL DEFAULT 'desativo',
    MODIFY `perfil` ENUM('servidor', 'admin', 'deppi') NOT NULL DEFAULT 'servidor';

-- CreateIndex
CREATE UNIQUE INDEX `usuario_email_key` ON `usuario`(`email`);

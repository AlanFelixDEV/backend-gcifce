/*
  Warnings:

  - You are about to alter the column `data` on the `evento` table. The data in that column could be lost. The data in that column will be cast from `DateTime(0)` to `DateTime`.
  - The values [aprovador] on the enum `evento_status` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `evento` MODIFY `data` DATETIME NOT NULL,
    MODIFY `status` ENUM('aprovado', 'recusado', 'analise', 'finalizado') NOT NULL DEFAULT 'analise';

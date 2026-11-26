/*
  Warnings:

  - Added the required column `cuatrimestre` to the `commissions` table without a default value. This is not possible if the table is not empty.
  - Added the required column `turno` to the `commissions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "commissions" ADD COLUMN     "cuatrimestre" INTEGER NOT NULL,
ADD COLUMN     "turno" TEXT NOT NULL;

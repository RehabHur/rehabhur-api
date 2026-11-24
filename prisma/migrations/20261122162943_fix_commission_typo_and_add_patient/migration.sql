/*
  Warnings:

  - You are about to drop the column `comision` on the `patients` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `patients` table. All the data in the column will be lost.
  - Added the required column `commission` to the `patients` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `patients` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "patients" DROP COLUMN "comision",
DROP COLUMN "lastName",
ADD COLUMN     "commission" INTEGER NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL;

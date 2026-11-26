/*
  Warnings:

  - You are about to drop the column `commission` on the `teachers` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "teachers" DROP COLUMN "commission";

-- CreateTable
CREATE TABLE "commissions" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "year" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "commissions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CommissionToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_CommissionToTeacher_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "commissions_name_key" ON "commissions"("name");

-- CreateIndex
CREATE INDEX "_CommissionToTeacher_B_index" ON "_CommissionToTeacher"("B");

-- AddForeignKey
ALTER TABLE "_CommissionToTeacher" ADD CONSTRAINT "_CommissionToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "commissions"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CommissionToTeacher" ADD CONSTRAINT "_CommissionToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

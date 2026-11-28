-- CreateTable
CREATE TABLE "_PatientToStudent" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_PatientToStudent_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE INDEX "_PatientToStudent_B_index" ON "_PatientToStudent"("B");

-- AddForeignKey
ALTER TABLE "_PatientToStudent" ADD CONSTRAINT "_PatientToStudent_A_fkey" FOREIGN KEY ("A") REFERENCES "patients"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_PatientToStudent" ADD CONSTRAINT "_PatientToStudent_B_fkey" FOREIGN KEY ("B") REFERENCES "students"("id") ON DELETE CASCADE ON UPDATE CASCADE;

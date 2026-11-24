-- CreateTable
CREATE TABLE "persons" (
    "id" SERIAL NOT NULL,
    "firstName" TEXT NOT NULL,
    "last_name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "dni" TEXT NOT NULL,
    "nationality" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "persons_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "persons_email_key" ON "persons"("email");

-- CreateIndex
CREATE UNIQUE INDEX "persons_dni_key" ON "persons"("dni");

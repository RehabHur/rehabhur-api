-- CreateTable
CREATE TABLE "exercises" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "bodyRegion" TEXT NOT NULL,
    "motionType" TEXT NOT NULL,
    "material" TEXT NOT NULL,
    "linkVideo" TEXT NOT NULL,
    "instructions" TEXT NOT NULL,

    CONSTRAINT "exercises_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "exercises_linkVideo_key" ON "exercises"("linkVideo");

-- CreateIndex
CREATE UNIQUE INDEX "exercises_name_bodyRegion_key" ON "exercises"("name", "bodyRegion");

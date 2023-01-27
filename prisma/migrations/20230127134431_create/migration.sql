-- CreateEnum
CREATE TYPE "status_type" AS ENUM ('available', 'unavailable');

-- CreateTable
CREATE TABLE "carmakers" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "carmakers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "colors" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "colors_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "models" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "carmaker_id" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,

    CONSTRAINT "models_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "vehicles" (
    "id" SERIAL NOT NULL,
    "color_id" INTEGER NOT NULL,
    "model_id" INTEGER NOT NULL,
    "license_plate" VARCHAR(7) NOT NULL,
    "price_per_day" INTEGER NOT NULL,
    "status" "status_type" NOT NULL DEFAULT 'available',

    CONSTRAINT "vehicles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "models" ADD CONSTRAINT "models_fk0" FOREIGN KEY ("carmaker_id") REFERENCES "carmakers"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fk0" FOREIGN KEY ("color_id") REFERENCES "colors"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "vehicles" ADD CONSTRAINT "vehicles_fk1" FOREIGN KEY ("model_id") REFERENCES "models"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

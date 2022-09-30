/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Menu";

-- CreateTable
CREATE TABLE "MenuPosition" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "spicy" BOOLEAN NOT NULL DEFAULT false,
    "weight" INTEGER NOT NULL,
    "proteins" INTEGER NOT NULL,
    "fats" INTEGER NOT NULL,
    "carbs" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "MenuPosition_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_CategoryToMenuPosition" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_CategoryToMenuPosition_AB_unique" ON "_CategoryToMenuPosition"("A", "B");

-- CreateIndex
CREATE INDEX "_CategoryToMenuPosition_B_index" ON "_CategoryToMenuPosition"("B");

-- AddForeignKey
ALTER TABLE "_CategoryToMenuPosition" ADD CONSTRAINT "_CategoryToMenuPosition_A_fkey" FOREIGN KEY ("A") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_CategoryToMenuPosition" ADD CONSTRAINT "_CategoryToMenuPosition_B_fkey" FOREIGN KEY ("B") REFERENCES "MenuPosition"("id") ON DELETE CASCADE ON UPDATE CASCADE;

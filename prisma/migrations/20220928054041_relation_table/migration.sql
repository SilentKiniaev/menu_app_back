/*
  Warnings:

  - You are about to drop the `_CategoryToMenuPosition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "_CategoryToMenuPosition" DROP CONSTRAINT "_CategoryToMenuPosition_A_fkey";

-- DropForeignKey
ALTER TABLE "_CategoryToMenuPosition" DROP CONSTRAINT "_CategoryToMenuPosition_B_fkey";

-- DropTable
DROP TABLE "_CategoryToMenuPosition";

-- CreateTable
CREATE TABLE "MenuPositionsOnCategories" (
    "menuPositionId" INTEGER NOT NULL,
    "categoryId" INTEGER NOT NULL,
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "assignedBy" TEXT NOT NULL,

    CONSTRAINT "MenuPositionsOnCategories_pkey" PRIMARY KEY ("menuPositionId","categoryId")
);

-- AddForeignKey
ALTER TABLE "MenuPositionsOnCategories" ADD CONSTRAINT "MenuPositionsOnCategories_menuPositionId_fkey" FOREIGN KEY ("menuPositionId") REFERENCES "MenuPosition"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MenuPositionsOnCategories" ADD CONSTRAINT "MenuPositionsOnCategories_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `MenuPositionsOnCategories` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `categoryId` to the `MenuPosition` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "MenuPositionsOnCategories" DROP CONSTRAINT "MenuPositionsOnCategories_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "MenuPositionsOnCategories" DROP CONSTRAINT "MenuPositionsOnCategories_menuPositionId_fkey";

-- AlterTable
ALTER TABLE "MenuPosition" ADD COLUMN     "categoryId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "MenuPositionsOnCategories";

-- AddForeignKey
ALTER TABLE "MenuPosition" ADD CONSTRAINT "MenuPosition_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

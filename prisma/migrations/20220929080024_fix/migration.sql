/*
  Warnings:

  - You are about to drop the column `proteins` on the `MenuItem` table. All the data in the column will be lost.
  - Added the required column `protein` to the `MenuItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MenuItem" DROP COLUMN "proteins",
ADD COLUMN     "protein" INTEGER NOT NULL;

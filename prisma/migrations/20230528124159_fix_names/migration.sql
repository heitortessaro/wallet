/*
  Warnings:

  - You are about to drop the column `StockCode` on the `stockOperations` table. All the data in the column will be lost.
  - Added the required column `stockCode` to the `stockOperations` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stockOperations" DROP COLUMN "StockCode",
ADD COLUMN     "stockCode" TEXT NOT NULL;

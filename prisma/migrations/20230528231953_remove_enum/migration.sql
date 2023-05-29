/*
  Warnings:

  - Changed the type of `operationType` on the `stockOperations` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "stockOperations" DROP COLUMN "operationType",
ADD COLUMN     "operationType" TEXT NOT NULL;

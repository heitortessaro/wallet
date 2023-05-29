/*
  Warnings:

  - The `operationType` column on the `stockOperations` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "stockOperations" DROP COLUMN "operationType",
ADD COLUMN     "operationType" "OperationType" NOT NULL DEFAULT 'BUY';

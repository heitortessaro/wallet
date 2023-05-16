-- CreateEnum
CREATE TYPE "StockState" AS ENUM ('BUY', 'STUDING', 'SELL', 'QUARENTINE');

-- CreateEnum
CREATE TYPE "OperationType" AS ENUM ('BUY', 'SELL');

-- CreateTable
CREATE TABLE "users" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "email" TEXT NOT NULL,
    "hash" TEXT NOT NULL,
    "firstName" TEXT,
    "lastName" TEXT,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stockOperations" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "StockCode" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "unitValue" DOUBLE PRECISION NOT NULL,
    "operationType" "OperationType" NOT NULL DEFAULT 'BUY',
    "userId" INTEGER NOT NULL,

    CONSTRAINT "stockOperations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stockList" (
    "id" SERIAL NOT NULL,
    "stockCode" TEXT NOT NULL,

    CONSTRAINT "stockList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userStockInfo" (
    "id" SERIAL NOT NULL,
    "state" "StockState" NOT NULL DEFAULT 'STUDING',
    "stockCode" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "userStockInfo_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stockList_stockCode_key" ON "stockList"("stockCode");

-- AddForeignKey
ALTER TABLE "stockOperations" ADD CONSTRAINT "stockOperations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStockInfo" ADD CONSTRAINT "userStockInfo_stockCode_fkey" FOREIGN KEY ("stockCode") REFERENCES "stockList"("stockCode") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userStockInfo" ADD CONSTRAINT "userStockInfo_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

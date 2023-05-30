import {
  IsISO8601,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  IsOptional,
} from 'class-validator';

import { OperationType } from '@prisma/client';

// enum TransactionType {
//   BUY = 'BUY',
//   SELL = 'SELL',
// }

export class CreateStokeOperation {
  @IsString()
  @IsNotEmpty()
  stockCode: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Invalid quantity. It must be equal or bigger than 1.' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Invalid unit value, it must be bigger than 0.' })
  unitValue: number;

  // @IsString()
  @IsNotEmpty()
  @IsEnum(OperationType, {
    message: 'operationType must be "buy" or "sell".',
  })
  operationType: OperationType;

  @IsNotEmpty()
  @IsISO8601()
  operationDate: Date;
}

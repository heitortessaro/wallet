import {
  IsEnum,
  IsInt,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsNotEmpty,
  IsISO8601,
} from 'class-validator';

import { OperationType } from '@prisma/client';

// enum TransactionType {
//   BUY = 'BUY',
//   SELL = 'SELL',
// }

export class EditStokeOperation {
  @IsString()
  @IsOptional()
  stockCode?: string;

  @IsNumber()
  @IsOptional()
  @IsInt()
  @Min(1, { message: 'Invalid quantity. It must be equal or bigger than 1.' })
  quantity?: number;

  @IsNumber()
  @IsOptional()
  @Min(0, { message: 'Invalid unit value, it must be bigger than 0.' })
  unitValue?: number;

  @IsString()
  @IsOptional()
  @IsEnum(OperationType, {
    message: 'operationType must be "buy" or "sell".',
  })
  operationType?: OperationType;

  @IsNotEmpty()
  @IsISO8601()
  operationDate: Date;
}

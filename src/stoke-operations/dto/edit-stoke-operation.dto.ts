import {
  IsEnum,
  IsInt,
  IsOptional,
  IsNumber,
  IsString,
  Min,
  IsDateString,
} from 'class-validator';

enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
}

export class EditStokeOperation {
  @IsString()
  @IsOptional()
  code?: string;

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
  @IsEnum(TransactionType, {
    message: 'operationType must be "buy" or "sell".',
  })
  operationType?: string;

  @IsString()
  @IsOptional()
  @IsDateString()
  operationDate?: string;
}

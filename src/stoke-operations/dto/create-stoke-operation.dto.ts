import {
  IsDate,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Matches,
  Min,
} from 'class-validator';

enum TransactionType {
  Buy = 'buy',
  Sell = 'sell',
}

export class CreateStokeOperation {
  @IsString()
  @IsNotEmpty()
  code: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @Min(1, { message: 'Invalid quantity. It must be equal or bigger than 1.' })
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  @Min(0, { message: 'Invalid unit value, it must be bigger than 0.' })
  @Matches(/^\d+(\.\d{1,2})?$/, {
    message: 'Invalid float number with 2 decimals',
  })
  unitValue: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(TransactionType, {
    message: 'operationType must be "buy" or "sell".',
  })
  operationType: string;

  @IsString()
  @IsNotEmpty()
  @IsDate()
  operationDate: string;
}

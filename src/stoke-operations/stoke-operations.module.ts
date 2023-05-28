import { Module } from '@nestjs/common';
import { StokeOperationsController } from './stoke-operations.controller';
import { StokeOperationsService } from './stoke-operations.service';

@Module({
  controllers: [StokeOperationsController],
  providers: [StokeOperationsService]
})
export class StokeOperationsModule {}

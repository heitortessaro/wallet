import {
  Controller,
  UseGuards,
  Get,
  Param,
  Body,
  Post,
  Patch,
  ParseIntPipe,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { JwtGuard } from '../auth/guard';
import { StokeOperationsService } from './stoke-operations.service';
import { GetUser } from '../auth/decorator';
import { CreateStokeOperation, EditStokeOperation } from './dto';

@UseGuards(JwtGuard)
@Controller('stoke-operations')
export class StokeOperationsController {
  constructor(private stokeOperationsService: StokeOperationsService) { }

  @Get()
  getStokeOperations(@GetUser('id') userId: number) {
    return this.stokeOperationsService.getStokeOperations(userId);
  }

  @Get(':id')
  getStokeOperationById(
    @Param('id', ParseIntPipe) stokeOperationId: number,
    @GetUser('id') userId: number,
  ) {
    return this.stokeOperationsService.getStokeOperationById(
      userId,
      stokeOperationId,
    );
  }

  @Post()
  createStokeOperation(
    @GetUser('id') userId: number,
    @Body() dto: CreateStokeOperation,
  ) {
    return this.stokeOperationsService.createStokeOperation(userId, dto);
  }

  @Patch(':id')
  editStokeOperation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stokeOperationId: number,
    @Body() dto: EditStokeOperation,
  ) {
    return this.stokeOperationsService.editStokeOperation(
      userId,
      stokeOperationId,
      dto,
    );
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteStokeOperation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stokeOperationId: number,
  ) {
    return this.stokeOperationsService.deleteStokeOperationById(
      userId,
      stokeOperationId,
    );
  }
}

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
    return `get all for ${userId}`;
  }

  @Get(':id')
  getStokeOperationById(
    @Param('id') id: string,
    @GetUser('id') userId: number,
  ) {
    return `get ${id} for ${userId}`;
  }

  @Post()
  createStokeOperation(
    @GetUser('id') userId: number,
    @Body() dto: CreateStokeOperation,
  ) {
    return `post ${dto} for ${userId}`;
  }

  @Patch()
  editStokeOperation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stokeOperationId: number,
    @Body() dto: EditStokeOperation,
  ) {
    return `patch param ${stokeOperationId} with dto ${dto} for ${userId}`;
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete('id')
  deleteStokeOperation(
    @GetUser('id') userId: number,
    @Param('id', ParseIntPipe) stokeOperationId: number,
  ) {
    return `delete param ${stokeOperationId} for ${userId}`;
  }
}

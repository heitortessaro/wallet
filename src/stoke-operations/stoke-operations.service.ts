import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStokeOperation } from './dto';

@Injectable()
export class StokeOperationsService {
  constructor(private prisma: PrismaService) { }

  async getStokeOperations(userId: number) {
    return await this.prisma.stockOperation.findMany({
      where: {
        userId,
      },
    });
  }

  async getStokeOperationById(userId: number, stokeOperationId: number) {
    return await this.prisma.stockOperation.findFirst({
      where: {
        userId,
        id: stokeOperationId,
      },
    });
  }

  async createStokeOperation(userId: number, dto: CreateStokeOperation) {
    const operation = await this.prisma.stockOperation.create({
      data: {
        ...dto,
        userId,
      },
    });
    return operation;
  }
}

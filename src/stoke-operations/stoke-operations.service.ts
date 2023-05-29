import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStokeOperation, EditStokeOperation } from './dto';

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
    const stokeOperation = await this.prisma.stockOperation.create({
      data: {
        ...dto,
        userId,
      },
    });
    return stokeOperation;
  }

  async editStokeOperation(
    userId: number,
    stokeOperationId: number,
    dto: EditStokeOperation,
  ) {
    const stokeOperation = await this.prisma.stockOperation.findUnique({
      where: {
        id: stokeOperationId,
      },
    });

    if (!stokeOperation || stokeOperation.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource denided. Operation does not exist, or is related to other user.',
      );
    }

    return await this.prisma.stockOperation.update({
      where: {
        id: stokeOperationId,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteStokeOperationById(userId: number, stokeOperationId: number) {
    const stokeOperation = await this.prisma.stockOperation.findUnique({
      where: {
        id: stokeOperationId,
      },
    });

    if (!stokeOperation || stokeOperation.userId !== userId) {
      throw new ForbiddenException(
        'Access to resource denided. Operation does not exist, or is related to other user.',
      );
    }

    await this.prisma.stockOperation.delete({
      where: {
        id: stokeOperationId,
      },
    });
  }
}

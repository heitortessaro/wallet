import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { EditUserDto } from './dto';
import * as argon from 'argon2';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) { }

  async editUser(userId: number, dto: EditUserDto) {
    let hash: string | undefined;
    if (dto.password) {
      hash = await argon.hash(dto.password);
    }

    const { password, ...dtoLocal } = { ...dto, hash };

    const user = await this.prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        ...dtoLocal,
      },
    });

    delete user.hash;
    return user;
  }
}

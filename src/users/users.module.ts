import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService, MyLogger],
  exports: [UsersService],
})
export class UsersModule {}

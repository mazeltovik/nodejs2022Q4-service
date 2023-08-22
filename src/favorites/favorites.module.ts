import { Module } from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';
import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';

@Module({
  controllers: [FavoritesController],
  providers: [FavoritesService, PrismaService, MyLogger],
})
export class FavoritesModule {}

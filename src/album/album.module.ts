import { Module } from '@nestjs/common';
import { AlbumService } from './album.service';
import { AlbumController } from './album.controller';
import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';

@Module({
  controllers: [AlbumController],
  providers: [AlbumService, PrismaService, MyLogger],
})
export class AlbumModule {}

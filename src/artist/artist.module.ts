import { Module } from '@nestjs/common';
import { ArtistService } from './artist.service';
import { ArtistController } from './artist.controller';
import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';

@Module({
  controllers: [ArtistController],
  providers: [ArtistService, PrismaService, MyLogger],
})
export class ArtistModule {}

import {
  Injectable,
  NotFoundException,
  BadRequestException,
  HttpStatus,
} from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { v4 as uuidv4 } from 'uuid';
import { checkUpdateDto } from './helpers/checkUpdateDto';

import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';
import { routes } from 'src/my-logger/my-logger.constants';

@Injectable()
export class ArtistService {
  constructor(private prisma: PrismaService, private myLogger: MyLogger) {
    this.myLogger.setContext('ArtistService');
  }
  async create(createArtistDto: CreateArtistDto, param) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.myLogger.customLog(
      routes.artist,
      JSON.stringify(param),
      JSON.stringify(createArtistDto),
      HttpStatus.CREATED,
    );
    return this.prisma.artist.create({ data: artist });
  }

  async findAll(param, body) {
    this.myLogger.customLog(
      routes.artist,
      JSON.stringify(param),
      JSON.stringify(body),
      HttpStatus.OK,
    );
    return this.prisma.artist.findMany();
  }

  async findOne(id: string, body) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (artist) {
      this.myLogger.customLog(
        routes.artist,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.OK,
      );
      return artist;
    } else {
      throw new NotFoundException('Artist was not found.');
    }
  }

  async update(id: string, updateArtistDto: UpdateArtistDto) {
    if (checkUpdateDto(updateArtistDto)) {
      const { name, grammy } = updateArtistDto;
      const artist = await this.prisma.artist.findFirst({ where: { id } });
      if (artist) {
        this.myLogger.customLog(
          routes.artist,
          JSON.stringify({ id }),
          JSON.stringify(updateArtistDto),
          HttpStatus.OK,
        );
        artist.name = name ? name : artist.name;
        if (grammy !== undefined) {
          artist.grammy = grammy;
        }
        return this.prisma.artist.update({
          where: { id },
          data: {
            name: artist.name,
            grammy: artist.grammy,
          },
        });
      } else {
        throw new NotFoundException('Artist was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  async remove(id: string, body) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (artist) {
      this.myLogger.customLog(
        routes.artist,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.NO_CONTENT,
      );
      await this.prisma.artist.delete({ where: { id } });
      const { artists } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          artists: true,
        },
      });
      await this.prisma.favorites.update({
        where: {
          id: '0',
        },
        data: {
          artists: {
            set: artists.filter((artistId) => artistId !== id),
          },
        },
      });
    } else {
      throw new NotFoundException('Artist was not found.');
    }
  }
}

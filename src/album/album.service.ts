import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { v4 as uuidv4 } from 'uuid';
import { checkUpdateAlbumDto } from './helpers/checkUpdateAlbumDto';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AlbumService {
  constructor(private prisma: PrismaService) {}
  async create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    return this.prisma.album.create({ data: album });
  }

  async findAll() {
    return this.prisma.album.findMany();
  }

  async findOne(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album was not found.');
    }
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (checkUpdateAlbumDto(updateAlbumDto)) {
      const { name, year, artistId } = updateAlbumDto;
      const album = await this.prisma.album.findFirst({ where: { id } });
      if (album) {
        album.name = name ? name : album.name;
        album.year = year ? year : album.year;
        if (artistId !== undefined) {
          album.artistId = artistId;
        }
        // if (artistId) {
        //   album.artistId = artistId;
        // } else if (artistId == null) {
        //   album.artistId = artistId;
        // } else {
        //   album.artistId = album.artistId;
        // }
        return this.prisma.album.update({
          where: { id },
          data: {
            name: album.name,
            year: album.year,
            artistId: album.artistId,
          },
        });
      } else {
        throw new NotFoundException('Album was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  async remove(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (album) {
      await this.prisma.album.delete({ where: { id } });
      await this.prisma.track.updateMany({
        where: {
          albumId: {
            contains: id,
          },
        },
        data: {
          albumId: null,
        },
      });
      const { albums } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          albums: true,
        },
      });
      await this.prisma.favorites.update({
        where: {
          id: '0',
        },
        data: {
          albums: {
            set: albums.filter((albumId) => albumId !== id),
          },
        },
      });
    } else {
      throw new NotFoundException('Album was not found.');
    }
  }
}

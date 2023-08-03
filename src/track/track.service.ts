import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { v4 as uuidv4 } from 'uuid';
import { checkUpdateTrackDto } from './helpers/checkUpdateTrackDto';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TrackService {
  constructor(private prisma: PrismaService) {}
  async create(createTrackDto: CreateTrackDto) {
    const track = {
      id: uuidv4(),
      ...createTrackDto,
    };
    return this.prisma.track.create({ data: track });
  }

  async findAll() {
    return this.prisma.track.findMany();
  }

  async findOne(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (track) {
      return track;
    } else {
      throw new NotFoundException('Track was not found.');
    }
  }

  async update(id: string, updateTrackDto: UpdateTrackDto) {
    if (checkUpdateTrackDto(updateTrackDto)) {
      const { name, artistId, albumId, duration } = updateTrackDto;
      const track = await this.prisma.track.findFirst({ where: { id } });
      if (track) {
        track.name = name ? name : track.name;
        track.duration = duration ? duration : track.duration;
        track.artistId = artistId ? artistId : track.artistId;
        track.albumId = albumId ? albumId : track.albumId;
        if (artistId !== undefined) {
          track.artistId = artistId;
        }
        if (artistId !== undefined) {
          track.artistId = artistId;
        }
        if (albumId !== undefined) {
          track.albumId = albumId;
        }
        return this.prisma.track.update({
          where: {
            id,
          },
          data: {
            name: track.name,
            artistId: track.artistId,
            albumId: track.albumId,
            duration: track.duration,
          },
        });
      } else {
        throw new NotFoundException('Track was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  async remove(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (track) {
      await this.prisma.track.delete({ where: { id } });
      const { tracks } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          tracks: true,
        },
      });
      await this.prisma.favorites.update({
        where: {
          id: '0',
        },
        data: {
          tracks: {
            set: tracks.filter((trackId) => trackId !== id),
          },
        },
      });
    } else {
      throw new NotFoundException('Track was not found.');
    }
  }
}

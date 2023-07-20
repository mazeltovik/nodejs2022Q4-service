import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { db } from 'src/model/db';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';
import { checkUpdateAlbumDto } from './helpers/checkUpdateAlbumDto';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class AlbumService {
  private trackService: TrackService;
  album: Album[] = db.album;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.trackService = this.moduleRef.get(TrackService);
  }
  create(createAlbumDto: CreateAlbumDto) {
    const album = {
      id: uuidv4(),
      ...createAlbumDto,
    };
    this.album.push(album);
    return album;
  }

  findAll() {
    return this.album;
  }

  findOne(id: string) {
    const album = this.album.find((album) => album.id == id);
    if (album) {
      return album;
    } else {
      throw new NotFoundException('Album was not found.');
    }
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    if (checkUpdateAlbumDto(updateAlbumDto)) {
      const { name, year, artistId } = updateAlbumDto;
      const album = this.album.find((album) => album.id == id);
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
        return album;
      } else {
        throw new NotFoundException('Album was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  remove(id: string) {
    const albumIndex = this.album.findIndex((album) => album.id == id);
    if (!~albumIndex) {
      throw new NotFoundException('Album was not found.');
    } else {
      this.trackService.track.forEach((track) => {
        if (track.albumId == id) {
          track.albumId = null;
        }
      });
      this.album.splice(albumIndex, 1);
    }
  }
}

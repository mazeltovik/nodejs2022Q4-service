import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

import { db } from 'src/model/db';
import { v4 as uuidv4 } from 'uuid';
import { Album } from './entities/album.entity';
import { checkUpdateAlbumDto } from './helpers/checkUpdateAlbumDto';

@Injectable()
export class AlbumService {
  album: Album[] = db.album;
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
        if (artistId) {
          album.artistId = artistId;
        } else if (artistId == null) {
          album.artistId = artistId;
        } else {
          album.artistId = album.artistId;
        }
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
      this.album.splice(albumIndex, 1);
    }
  }
}

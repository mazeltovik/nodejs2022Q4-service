import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { ModuleRef } from '@nestjs/core';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

import { db } from 'src/model/db';
import { v4 as uuidv4 } from 'uuid';
import { Artist } from './entities/artist.entity';
import { checkUpdateDto } from './helpers/checkUpdateDto';
import { AlbumService } from 'src/album/album.service';
import { TrackService } from 'src/track/track.service';

@Injectable()
export class ArtistService {
  private albumService: AlbumService;
  private trackService: TrackService;
  artist: Artist[] = db.artist;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.albumService = this.moduleRef.get(AlbumService);
    this.trackService = this.moduleRef.get(TrackService);
  }
  create(createArtistDto: CreateArtistDto) {
    const artist = {
      id: uuidv4(),
      ...createArtistDto,
    };
    this.artist.push(artist);
    return artist;
  }

  findAll() {
    return this.artist;
  }

  findOne(id: string) {
    const artist = this.artist.find((artist) => artist.id == id);
    if (artist) {
      return artist;
    } else {
      throw new NotFoundException('Artist was not found.');
    }
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    if (checkUpdateDto(updateArtistDto)) {
      const { name, grammy } = updateArtistDto;
      const artist = this.artist.find((artist) => artist.id == id);
      if (artist) {
        artist.name = name ? name : artist.name;
        if (grammy !== undefined) {
          artist.grammy = grammy;
        }
        return artist;
      } else {
        throw new NotFoundException('Artist was not found.');
      }
    } else {
      throw new BadRequestException('Invalid dto');
    }
  }

  remove(id: string) {
    const artistIndex = this.artist.findIndex((artist) => artist.id == id);
    if (!~artistIndex) {
      throw new NotFoundException('Artist was not found.');
    } else {
      this.albumService.album.forEach((album) => {
        if (album.artistId == id) {
          album.artistId = null;
        }
      });
      this.trackService.track.forEach((track) => {
        if (track.artistId == id) {
          track.artistId = null;
        }
      });
      this.artist.splice(artistIndex, 1);
    }
  }
}

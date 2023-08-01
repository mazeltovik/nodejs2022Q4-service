import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { db } from 'src/model/db';
import { Favorite } from './entities/favorite.entity';
import { TrackService } from 'src/track/track.service';
import { ModuleRef } from '@nestjs/core';
import { AlbumService } from 'src/album/album.service';
import { ArtistService } from 'src/artist/artist.service';
import { Track } from 'src/track/entities/track.entity';
import { Album } from 'src/album/entities/album.entity';
import { Artist } from 'src/artist/entities/artist.entity';

@Injectable()
export class FavoritesService {
  private trackService: TrackService;
  private albumService: AlbumService;
  private artistService: ArtistService;
  favs: Favorite = db.favs;
  constructor(private moduleRef: ModuleRef) {}
  onModuleInit() {
    this.trackService = this.moduleRef.get(TrackService);
    this.albumService = this.moduleRef.get(AlbumService);
    this.artistService = this.moduleRef.get(ArtistService);
  }
  findAll() {
    const tracks: Track[] = [];
    this.favs.tracks.forEach((favTrack) => {
      this.trackService.track.forEach((track) => {
        if (track.id == favTrack) {
          tracks.push(track);
        }
      });
    });
    const albums: Album[] = [];
    this.favs.albums.forEach((favAlbum) => {
      this.albumService.album.forEach((album) => {
        if (album.id == favAlbum) {
          albums.push(album);
        }
      });
    });
    const artists: Artist[] = [];
    this.favs.artists.forEach((favArtist) => {
      this.artistService.artist.forEach((artist) => {
        if (artist.id == favArtist) {
          artists.push(artist);
        }
      });
    });
    return {
      artists,
      albums,
      tracks,
    };
  }
  createTrackFav(id: string) {
    const track = this.trackService.track.find((track) => track.id == id);
    if (track) {
      if (!this.favs.tracks.includes(track.id)) {
        this.favs.tracks.push(track.id);
      }
      // this.favs.tracks.push(track.id);
      // if (!this.trackService.track.includes(track)) {
      //   this.favs.tracks.push(track.id);
      // }
      return [];
    } else {
      throw new UnprocessableEntityException("Track with id doesn't exist.");
    }
  }

  createAlbumFav(id: string) {
    const album = this.albumService.album.find((album) => album.id == id);
    if (album) {
      if (!this.favs.albums.includes(album.id)) {
        this.favs.albums.push(album.id);
      }
      // this.favs.albums.push(album.id);

      // if (!this.albumService.album.includes(album)) {
      //   this.favs.tracks.push(album.id);
      // }
      return [];
    } else {
      throw new UnprocessableEntityException("Album with id doesn't exist.");
    }
  }

  createArtistFav(id: string) {
    const artist = this.artistService.artist.find((artist) => artist.id == id);
    if (artist) {
      if (!this.favs.artists.includes(artist.id)) {
        this.favs.artists.push(artist.id);
      }
      // this.favs.artists.push(artist.id);
      // if (!this.artistService.artist.includes(artist)) {
      //   this.favs.tracks.push(artist.id);
      // }
      return [];
    } else {
      throw new UnprocessableEntityException("Artist with id doesn't exist.");
    }
  }

  removeTrackFav(id: string) {
    const trackIndex = this.favs.tracks.findIndex((track) => track == id);
    if (!~trackIndex) {
      throw new NotFoundException('Track was not found.');
    } else {
      this.favs.tracks.splice(trackIndex, 1);
    }
  }

  removeAlbumFav(id: string) {
    const albumIndex = this.favs.albums.findIndex((album) => album == id);
    if (!~albumIndex) {
      throw new NotFoundException('Album was not found.');
    } else {
      this.favs.albums.splice(albumIndex, 1);
    }
  }

  removeArtistFav(id: string) {
    const artistIndex = this.favs.artists.findIndex((artist) => artist == id);
    if (!~artistIndex) {
      throw new NotFoundException('Artist was not found.');
    } else {
      this.favs.artists.splice(artistIndex, 1);
    }
  }
}

import {
  HttpStatus,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';
import { MyLogger } from 'src/my-logger/my-logger.service';
import { routes } from 'src/my-logger/my-logger.constants';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService, private myLogger: MyLogger) {
    this.initStorage();
    this.myLogger.setContext('FavoritesService');
  }
  async initStorage() {
    const favs = await this.prisma.favorites.findFirst({ where: { id: '0' } });
    if (!favs) {
      await this.prisma.favorites.create({ data: { id: '0' } });
    }
  }
  async findAll(param, body) {
    this.myLogger.customLog(
      routes.favs.all,
      JSON.stringify(param),
      JSON.stringify(body),
      HttpStatus.OK,
    );
    const {
      albums: favAlbums,
      artists: favArtists,
      tracks: favTracks,
    } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
    });
    const albumsDB = await this.prisma.album.findMany();
    const tracksDB = await this.prisma.track.findMany();
    const artistDB = await this.prisma.artist.findMany();
    const albums = [];
    const tracks = [];
    const artists = [];
    favAlbums.forEach((favAlbum) => {
      albumsDB.forEach((album) => {
        if (album.id == favAlbum) {
          albums.push(album);
        }
      });
    });
    favTracks.forEach((favTrack) => {
      tracksDB.forEach((track) => {
        if (track.id == favTrack) {
          tracks.push(track);
        }
      });
    });
    favArtists.forEach((favArtist) => {
      artistDB.forEach((artist) => {
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
  async createTrackFav(id: string, body) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (track) {
      this.myLogger.customLog(
        routes.favs.track,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.CREATED,
      );
      const { tracks } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          tracks: true,
        },
      });
      if (!tracks.includes(track.id)) {
        await this.prisma.favorites.update({
          where: { id: '0' },
          data: {
            tracks: {
              push: track.id,
            },
          },
        });
      }
      return [];
    } else {
      throw new UnprocessableEntityException("Track with id doesn't exist.");
    }
  }

  async createAlbumFav(id: string, body) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (album) {
      this.myLogger.customLog(
        routes.favs.album,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.CREATED,
      );
      const { albums } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          albums: true,
        },
      });
      if (!albums.includes(album.id)) {
        await this.prisma.favorites.update({
          where: { id: '0' },
          data: {
            albums: {
              push: album.id,
            },
          },
        });
      }
      return [];
    } else {
      throw new UnprocessableEntityException("Album with id doesn't exist.");
    }
  }

  async createArtistFav(id: string, body) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (artist) {
      this.myLogger.customLog(
        routes.favs.artist,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.CREATED,
      );
      const { artists } = await this.prisma.favorites.findFirst({
        where: { id: '0' },
        select: {
          artists: true,
        },
      });
      if (!artists.includes(artist.id)) {
        await this.prisma.favorites.update({
          where: { id: '0' },
          data: {
            artists: {
              push: artist.id,
            },
          },
        });
      }
      return [];
    } else {
      throw new UnprocessableEntityException("Artist with id doesn't exist.");
    }
  }

  async removeTrackFav(id: string, body) {
    const { tracks } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        tracks: true,
      },
    });
    if (tracks.includes(id)) {
      this.myLogger.customLog(
        routes.favs.track,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.NO_CONTENT,
      );
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

  async removeAlbumFav(id: string, body) {
    const { albums } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        albums: true,
      },
    });
    if (albums.includes(id)) {
      this.myLogger.customLog(
        routes.favs.album,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.NO_CONTENT,
      );
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

  async removeArtistFav(id: string, body) {
    const { artists } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        artists: true,
      },
    });
    if (artists.includes(id)) {
      this.myLogger.customLog(
        routes.favs.artist,
        JSON.stringify({ id }),
        JSON.stringify(body),
        HttpStatus.NO_CONTENT,
      );
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

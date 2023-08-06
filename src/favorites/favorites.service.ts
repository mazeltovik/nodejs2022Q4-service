import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {
    this.initStorage();
  }
  async initStorage() {
    const favs = await this.prisma.favorites.findFirst({ where: { id: '0' } });
    if (!favs) {
      await this.prisma.favorites.create({ data: { id: '0' } });
    }
  }
  async findAll() {
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
  async createTrackFav(id: string) {
    const track = await this.prisma.track.findFirst({ where: { id } });
    if (track) {
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

  async createAlbumFav(id: string) {
    const album = await this.prisma.album.findFirst({ where: { id } });
    if (album) {
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

  async createArtistFav(id: string) {
    const artist = await this.prisma.artist.findFirst({ where: { id } });
    if (artist) {
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

  async removeTrackFav(id: string) {
    const { tracks } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        tracks: true,
      },
    });
    if (tracks.includes(id)) {
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

  async removeAlbumFav(id: string) {
    const { albums } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        albums: true,
      },
    });
    if (albums.includes(id)) {
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

  async removeArtistFav(id: string) {
    const { artists } = await this.prisma.favorites.findFirst({
      where: { id: '0' },
      select: {
        artists: true,
      },
    });
    if (artists.includes(id)) {
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

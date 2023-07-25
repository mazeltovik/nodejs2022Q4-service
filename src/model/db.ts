import { User, Artist, Album, Track, Favorites } from './modelTypes';

class DB {
  users: User[];
  artist: Artist[];
  album: Album[];
  track: Track[];
  favs: Favorites;
  constructor() {
    this.users = [];
    this.artist = [];
    this.album = [];
    this.track = [];
    this.favs = {
      artists: [],
      tracks: [],
      albums: [],
    };
  }
}

export const db = new DB();

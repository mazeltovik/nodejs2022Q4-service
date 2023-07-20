import { User, Artist, Album, Track } from './modelTypes';

class DB {
  users: User[];
  artist: Artist[];
  album: Album[];
  track: Track[];
  constructor() {
    this.users = [];
    this.artist = [];
    this.album = [];
    this.track = [];
  }
}

export const db = new DB();

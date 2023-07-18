import { User, Artist, Album } from './modelTypes';

class DB {
  users: User[];
  artist: Artist[];
  album: Album[];
  constructor() {
    this.users = [];
    this.artist = [];
    this.album = [];
  }
}

export const db = new DB();

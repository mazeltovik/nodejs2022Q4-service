export type User = {
  id: string; // uuid v4
  login: string;
  password: string;
  version: number; // integer number, increments on update
  createdAt: number; // timestamp of creation
  updatedAt: number;
};

export type Artist = {
  id: string; // uuid v4
  name: string;
  grammy: boolean;
};

export type Album = {
  id: string; // uuid v4
  name: string;
  year: number;
  artistId: string | null;
};

export type Track = {
  id: string; // uuid v4
  name: string;
  artistId: string | null; // refers to Artist
  albumId: string | null; // refers to Album
  duration: number; // integer number
};

import { UpdateAlbumDto } from '../dto/update-album.dto';

export function checkUpdateAlbumDto(updateAlbumDto: UpdateAlbumDto) {
  const keys = Object.keys(updateAlbumDto);
  if (
    keys.length == 1 &&
    (keys.includes('name') ||
      keys.includes('year') ||
      keys.includes('artistId'))
  ) {
    return true;
  } else if (
    keys.length == 2 &&
    (keys.includes('name') ||
      keys.includes('year') ||
      keys.includes('artistId'))
  ) {
    return true;
  } else if (
    keys.length == 3 &&
    keys.includes('name') &&
    keys.includes('year') &&
    keys.includes('artistId')
  ) {
    return true;
  } else {
    return false;
  }
}

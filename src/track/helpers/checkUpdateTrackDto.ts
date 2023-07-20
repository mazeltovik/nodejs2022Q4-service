import { UpdateTrackDto } from '../dto/update-track.dto';

export function checkUpdateTrackDto(updateTrackDto: UpdateTrackDto) {
  const keys = Object.keys(updateTrackDto);
  if (
    keys.length == 1 &&
    (keys.includes('name') ||
      keys.includes('albumId') ||
      keys.includes('artistId') ||
      keys.includes('duration'))
  ) {
    return true;
  } else if (
    keys.length == 2 &&
    (keys.includes('name') ||
      keys.includes('albumId') ||
      keys.includes('artistId') ||
      keys.includes('duration'))
  ) {
    return true;
  } else if (
    keys.length == 3 &&
    (keys.includes('name') ||
      keys.includes('albumId') ||
      keys.includes('artistId') ||
      keys.includes('duration'))
  ) {
    return true;
  } else if (
    keys.length == 4 &&
    keys.includes('name') &&
    keys.includes('albumId') &&
    keys.includes('artistId') &&
    keys.includes('duration')
  ) {
    return true;
  } else {
    return false;
  }
}

import { UpdateArtistDto } from '../dto/update-artist.dto';

export function checkUpdateDto(updateArtistDto: UpdateArtistDto) {
  const keys = Object.keys(updateArtistDto);
  if (keys.length == 1 && (keys.includes('name') || keys.includes('grammy'))) {
    return true;
  } else if (
    keys.length == 2 &&
    keys.includes('name') &&
    keys.includes('grammy')
  ) {
    return true;
  } else {
    return false;
  }
}

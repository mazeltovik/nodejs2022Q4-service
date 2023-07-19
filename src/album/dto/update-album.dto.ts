import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  name: string;

  @IsNumber()
  year: number;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}

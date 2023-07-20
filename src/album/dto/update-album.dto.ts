import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import {
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  @IsOptional()
  artistId: string | null;
}

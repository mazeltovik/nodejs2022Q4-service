import { PartialType } from '@nestjs/mapped-types';
import { CreateAlbumDto } from './create-album.dto';
import {
  IsString,
  IsNumber,
  ValidateIf,
  IsUUID,
  IsOptional,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateAlbumDto extends PartialType(CreateAlbumDto) {
  @ApiProperty()
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  @ApiProperty()
  year: number;

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  @IsOptional()
  @ApiProperty()
  artistId: string | null;
}

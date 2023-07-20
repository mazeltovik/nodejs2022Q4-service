import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import {
  IsString,
  IsNumber,
  ValidateIf,
  IsOptional,
  IsUUID,
} from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsString()
  @IsOptional()
  name: string;

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  @IsOptional()
  artistId: string | null;

  @ValidateIf((object, value) => value !== null)
  @IsUUID()
  @IsOptional()
  albumId: string | null;

  @IsNumber()
  @IsOptional()
  duration: number;
}

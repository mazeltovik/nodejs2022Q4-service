import { IsString, IsNumber, ValidateIf } from 'class-validator';

export class CreateTrackDto {
  @IsString()
  name: string;

  @ValidateIf((object, value) => value !== null)
  artistId: string | null;

  @ValidateIf((object, value) => value !== null)
  albumId: string | null;

  @IsNumber()
  duration: number;
}

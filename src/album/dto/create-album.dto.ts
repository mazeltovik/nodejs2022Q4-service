import { IsString, IsNumber, ValidateIf } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @ValidateIf((object, value) => value !== null)
  artistId: string | null;
}

import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Post()
  create(
    @Body() createArtistDto: CreateArtistDto,
    @Param() param: Record<string, unknown>,
  ) {
    try {
      return this.artistService.create(createArtistDto, param);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll(
    @Param() param: Record<string, unknown>,
    @Body() body: Record<string, unknown>,
  ) {
    return this.artistService.findAll(param, body);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.artistService.findOne(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateArtistDto: UpdateArtistDto,
  ) {
    try {
      return this.artistService.update(id, updateArtistDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.artistService.remove(id, body);
    } catch (err) {
      throw err;
    }
  }
}

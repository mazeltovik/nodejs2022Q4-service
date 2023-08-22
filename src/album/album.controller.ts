import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Post()
  create(
    @Body() createAlbumDto: CreateAlbumDto,
    @Param() param: Record<string, unknown>,
  ) {
    try {
      return this.albumService.create(createAlbumDto, param);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll(
    @Param() param: Record<string, unknown>,
    @Body() body: Record<string, unknown>,
  ) {
    return this.albumService.findAll(body, param);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.albumService.findOne(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto,
  ) {
    return this.albumService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.albumService.remove(id, body);
    } catch (err) {
      throw err;
    }
  }
}

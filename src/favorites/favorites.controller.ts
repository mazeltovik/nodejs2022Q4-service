import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
  Body,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  findAllFavs(
    @Param() param: Record<string, unknown>,
    @Body() body: Record<string, unknown>,
  ) {
    return this.favoritesService.findAll(param, body);
  }
  @Post('track/:id')
  createTrackFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.createTrackFav(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Post('album/:id')
  createAlbumFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.createAlbumFav(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Post('artist/:id')
  createArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.createArtistFav(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.removeTrackFav(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.removeAlbumFav(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.favoritesService.removeArtistFav(id, body);
    } catch (err) {
      throw err;
    }
  }
}

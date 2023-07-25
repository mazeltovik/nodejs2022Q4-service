import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpCode,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}
  @Get()
  findAllFavs() {
    return this.favoritesService.findAll();
  }
  @Post('track/:id')
  createTrackFav(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.createTrackFav(id);
    } catch (err) {
      throw err;
    }
  }

  @Post('album/:id')
  createAlbumFav(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.createAlbumFav(id);
    } catch (err) {
      throw err;
    }
  }

  @Post('artist/:id')
  createArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      return this.favoritesService.createArtistFav(id);
    } catch (err) {
      throw err;
    }
  }

  @Delete('track/:id')
  @HttpCode(204)
  removeTrackFav(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.removeTrackFav(id);
    } catch (err) {
      throw err;
    }
  }

  @Delete('album/:id')
  @HttpCode(204)
  removeAlbumFav(@Param('id', new ParseUUIDPipe({ version: '4' })) id: string) {
    try {
      return this.favoritesService.removeAlbumFav(id);
    } catch (err) {
      throw err;
    }
  }

  @Delete('artist/:id')
  @HttpCode(204)
  removeArtistFav(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
  ) {
    try {
      return this.favoritesService.removeArtistFav(id);
    } catch (err) {
      throw err;
    }
  }
}

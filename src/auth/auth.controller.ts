import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicPath';
import { RefreshTokenGuard } from './refreshToken.guard';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @HttpCode(200)
  @Post('signup')
  signUp(@Body() signUpDto: CreateUserDto) {
    try {
      return this.authService.signUp(signUpDto);
    } catch (err) {
      throw err;
    }
  }

  @Public()
  @HttpCode(200)
  @Post('login')
  login(@Body() signInDto: CreateUserDto) {
    try {
      return this.authService.login(signInDto);
    } catch (err) {
      throw err;
    }
  }

  @UseGuards(RefreshTokenGuard)
  @Get('refresh')
  refreshTokens(@Req() req: Request) {
    const userId = req.user['sub'];
    try {
      const [type, refreshToken] = req.headers.authorization?.split(' ') ?? [];
      return type === 'Bearer'
        ? this.authService.refreshTokens(userId, refreshToken)
        : this.authService.refreshTokens(userId, undefined);
    } catch (err) {
      throw err;
    }
  }
}

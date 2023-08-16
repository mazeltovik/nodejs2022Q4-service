import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/publicPath';

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
}

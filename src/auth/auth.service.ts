import {
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { userWithoutPassword } from 'src/users/helpers/userWithoutPassword';
import { jwtConstants } from './constants';

const saltOrRounds = parseInt(process.env.CRYPT_SALT);

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async signUp(signUpDto: CreateUserDto) {
    const { login, password } = signUpDto;
    const isLoginExist = await this.prisma.user.findFirst({ where: { login } });
    if (isLoginExist) {
      throw new ConflictException('Conflict. Login already exists');
    } else {
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = {
        id: uuidv4(),
        version: 1,
        login,
        password: hash,
      };
      const createdUser = await this.prisma.user.create({ data: user });
      return userWithoutPassword(createdUser);
    }
  }
  async login(signInDto: CreateUserDto) {
    const { login, password } = signInDto;
    const isLoginExist = await this.prisma.user.findFirst({ where: { login } });
    if (
      isLoginExist &&
      (await this.checkPassword(password, isLoginExist.password))
    ) {
      const tokens = await this.getTokens(isLoginExist.id, isLoginExist.login);
      return tokens;
    } else {
      throw new ForbiddenException('Incorrect login or password');
    }
  }
  async checkPassword(password: string, hash: string) {
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch;
  }
  async getTokens(userId: string, username: string) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expireTokenTime,
        },
      ),
      this.jwtService.signAsync(
        {
          sub: userId,
          username,
        },
        {
          secret: jwtConstants.refreshSecret,
          expiresIn: jwtConstants.expireRefreshTokenTime,
        },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
  async refreshTokens(userId: string, refreshToken: string | undefined) {
    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token is missing or invalid');
    }
    const isLoginExist = await this.prisma.user.findFirst({
      where: { id: userId },
    });
    if (isLoginExist) {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: jwtConstants.refreshSecret,
      });
      if (!payload) {
        throw new UnauthorizedException('Refresh token is missing or invalid');
      }
      const tokens = await this.getTokens(isLoginExist.id, isLoginExist.login);
      return tokens;
    }
  }
}

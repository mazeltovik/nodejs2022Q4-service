import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from 'src/users/users.module';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenStrategy } from './strategies/accessToken.strategy';
import { RefreshTokenStrategy } from './strategies/refreshToken.strategy';
import { AccessTokenGuard } from './accessToken.guard';

@Module({
  controllers: [AuthController],
  providers: [
    AuthService,
    PrismaService,
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  imports: [UsersModule, JwtModule.register({})],
  exports: [AuthService],
})
export class AuthModule {}

import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from 'src/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/auth/constants';

@Module({
  controllers: [UsersController],
  providers: [UsersService, PrismaService],
  exports:[UsersService],
  // imports: [
  //   JwtModule.register({
  //     secret: jwtConstants.secret,
  //     signOptions: { expiresIn: '120s' },
  //   }),
  // ],
})
export class UsersModule {}

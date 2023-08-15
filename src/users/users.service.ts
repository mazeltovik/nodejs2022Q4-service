import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

import { v4 as uuidv4 } from 'uuid';
import { userWithoutPassword } from './helpers/userWithoutPassword';

import { PrismaService } from 'src/prisma.service';
import * as bcrypt from 'bcrypt';
// import { User, Prisma } from '@prisma/client';

const saltOrRounds = parseInt(process.env.CRYPT_SALT)

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const isUserExist = await this.prisma.user.findFirst({ where: { login } });
    if (isUserExist) {
      throw new ConflictException('User already exist');
    } else {
      const hash = await bcrypt.hash(password, saltOrRounds);
      const user = {
        id: uuidv4(),
        version: 1,
        login,
        password:hash
      };
      const createdUser = await this.prisma.user.create({ data: user });
      return userWithoutPassword(createdUser);
    }
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map((user) => userWithoutPassword(user));
  }

  async findOne(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      return userWithoutPassword(user);
    } else {
      throw new NotFoundException("User with this id is doesn't exist");
    }
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      const { password, version } = user;
      if (await this.checkPassword(updateUserDto.oldPassword,password)) {
        const hash = await bcrypt.hash(updateUserDto.newPassword, saltOrRounds);
        const updatedUser = await this.prisma.user.update({
          where: { id },
          data: {
            password: hash,
            version: version + 1,
            updatedAt: new Date(),
          },
        });
        return userWithoutPassword(updatedUser);
      } else {
        throw new ForbiddenException('OldPassowrd is wrong');
      }
    } else {
      throw new NotFoundException("User with this id is doesn't exist");
    }
  }

  async remove(id: string) {
    const user = await this.prisma.user.findFirst({ where: { id } });
    if (user) {
      await this.prisma.user.delete({ where: { id } });
    } else {
      throw new NotFoundException("User with this id is doesn't exist");
    }
  }
  async checkPassword(password:string,hash:string){
    const isMatch = await bcrypt.compare(password, hash);
    return isMatch
  }
}

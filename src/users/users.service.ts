import {
  Injectable,
  ConflictException,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

import { v4 as uuidv4 } from 'uuid';
import { userWithoutPassword } from './helpers/userWithoutPassword';
import { db } from '../model/db';

@Injectable()
export class UsersService {
  users: User[] = db.users;
  create(createUserDto: CreateUserDto) {
    const { login, password } = createUserDto;
    const isUserExist = this.users.find((user) => user.login == login);
    if (isUserExist) {
      throw new ConflictException('User already exist');
    } else {
      const user = {
        id: uuidv4(),
        version: 1,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        login,
        password,
      };
      this.users.push(user);
      return userWithoutPassword(user);
    }
  }

  findAll() {
    return this.users.map((user) => userWithoutPassword(user));
  }

  findOne(id: string) {
    const user = this.users.find((user) => user.id == id);
    if (user) {
      return userWithoutPassword(user);
    } else {
      throw new NotFoundException("User with this id is doesn't exist");
    }
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    const user = this.users.find((user) => user.id == id);
    if (user) {
      const { password } = user;
      if (password == updateUserDto.oldPassword) {
        user.password = updateUserDto.newPassword;
        user.updatedAt = Date.now();
        user.version += 1;
        return userWithoutPassword(user);
      } else {
        throw new ForbiddenException('OldPassowrd is wrong');
      }
    } else {
      throw new NotFoundException("User with this id is doesn't exist");
    }
  }

  remove(id: string) {
    const userIndex = this.users.findIndex((user) => user.id == id);
    if (!~userIndex) {
      throw new NotFoundException("User with this id is doesn't exist");
    } else {
      this.users.splice(userIndex, 1);
    }
  }
}

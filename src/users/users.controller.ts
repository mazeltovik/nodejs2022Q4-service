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
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(
    @Param() param: Record<string, unknown>,
    @Body() createUserDto: CreateUserDto,
  ) {
    try {
      return this.usersService.create(createUserDto, param);
    } catch (err) {
      throw err;
    }
  }

  @Get()
  findAll(
    @Param() param: Record<string, unknown>,
    @Body() body: Record<string, unknown>,
  ) {
    return this.usersService.findAll(param, body);
  }

  @Get(':id')
  findOne(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.usersService.findOne(id, body);
    } catch (err) {
      throw err;
    }
  }

  @Put(':id')
  update(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    try {
      return this.usersService.update(id, updateUserDto);
    } catch (err) {
      throw err;
    }
  }

  @Delete(':id')
  @HttpCode(204)
  remove(
    @Param('id', new ParseUUIDPipe({ version: '4' })) id: string,
    @Body() body: Record<string, unknown>,
  ) {
    try {
      return this.usersService.remove(id, body);
    } catch (err) {
      throw err;
    }
  }
}

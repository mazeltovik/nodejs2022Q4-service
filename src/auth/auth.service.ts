import { ConflictException, ForbiddenException, Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { userWithoutPassword } from 'src/users/helpers/userWithoutPassword';

const saltOrRounds = parseInt(process.env.CRYPT_SALT)

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService,private jwtService: JwtService, private usersService: UsersService) {}

    async signUp(signUpDto:CreateUserDto){
        const {login,password} = signUpDto;
        const isLoginExist = await this.prisma.user.findFirst({ where: { login } });
        if(isLoginExist){
            throw new ConflictException('Conflict. Login already exists');
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
    async login(signInDto:CreateUserDto){
        const {login,password} = signInDto;
        const isLoginExist = await this.prisma.user.findFirst({ where: { login } });
        if(isLoginExist && await this.checkPassword(password,isLoginExist.password)){
            const payload = { sub: isLoginExist.id, username: isLoginExist.login };
            return {
                accessToken: await this.jwtService.signAsync(payload),
            };
        } else {
            throw new ForbiddenException('Incorrect login or password');
        }
    }
    async checkPassword(password:string,hash:string){
        const isMatch = await bcrypt.compare(password, hash);
        return isMatch
    }
}


import { ConflictException, Inject, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from "bcryptjs";
import { Repository } from 'typeorm';

import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserSerializer } from './user.model';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDTO: CreateUserDTO): Promise<UserSerializer> {
        const { name, password } = createUserDTO;

        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        try {
            const user = await this.userRepository.save({
                name: name,
                password: hashedPassword,
                salt: salt
            });
            return { name: user.name };
        } catch (e) {
            if(e.sqlState === '23000') {
                throw new ConflictException('Existing name');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }

    async signIn(createUserDTO: CreateUserDTO): Promise<UserSerializer> {
        const { name, password } = createUserDTO;
        const user = await this.userRepository.findOne({ where: { name: name } });

        if( user && ( await bcrypt.compare(password, user.password) ) ) {
            const payload = { name: user.name };
            const accessToken = await this.jwtService.sign(payload);

            return { name: user.name, accessToken: accessToken };
        } else {
            throw new UnauthorizedException('login failed');
        }
    }
}
import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async signUp(createUserDTO: CreateUserDTO ): Promise<User> {
        const { name, password } = createUserDTO
        const user = await this.userRepository.save({
            name: name, password: password
        });
        return user;
    }
}

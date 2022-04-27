import { ConflictException, Inject, Injectable, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { CreateUserDTO } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {}

    async signUp(createUserDTO: CreateUserDTO): Promise<User> {
        const { name, password } = createUserDTO;
        try {
            const user = await this.userRepository.save({
                name: name,
                password: password,
            });
            return user;
        } catch (e) {
            if(e.sqlState === '23000') {
                throw new ConflictException('Existing name');
            } else {
                throw new InternalServerErrorException();
            }
        }
    }
}

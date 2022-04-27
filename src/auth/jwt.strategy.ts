import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';
import { secretCode } from './auth.config';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @Inject('USER_REPOSITORY')
        private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey: secretCode,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload) {
        const { name } = payload;
        const user: User = await this.userRepository.findOne({
            where: { name: name },
        });
        if (!user) {
            throw new UnauthorizedException();
        }
        return user;
    }
}

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { DatabaseModule } from 'src/database/database.module';
import { secretCode } from './auth.config';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProviders } from './user.providers';

@Module({
    imports: [
        DatabaseModule,
        PassportModule.register({ 
            defaultStrategy: 'jwt' 
        }),
        JwtModule.register({
            secret: secretCode,
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    controllers: [AuthController],
    providers: [...userProviders, AuthService],
})
export class AuthModule {}

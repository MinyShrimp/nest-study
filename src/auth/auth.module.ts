import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { userProviders } from './user.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [AuthController],
    providers: [...userProviders, AuthService],
})
export class AuthModule {}

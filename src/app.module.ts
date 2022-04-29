import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from './logger/logger.module';

@Module({
    imports: [BoardsModule, AuthModule, LoggerModule],
    providers: [],
})
export class AppModule {}

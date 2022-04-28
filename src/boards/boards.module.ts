import { Module } from '@nestjs/common';
import { AuthModule } from 'src/auth/auth.module';
import { DatabaseModule } from 'src/database/database.module';
import { BoardsController } from './boards.controller';
import { boardsProviders } from './boards.providers';
import { BoardsService } from './boards.service';

@Module({
    imports: [DatabaseModule, AuthModule],
    controllers: [BoardsController],
    providers: [...boardsProviders, BoardsService],
})
export class BoardsModule {}

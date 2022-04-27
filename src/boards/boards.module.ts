import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { BoardsController } from './boards.controller';
import { boardsProviders } from './boards.providers';
import { BoardsService } from './boards.service';

@Module({
    imports: [DatabaseModule],
    controllers: [BoardsController],
    providers: [
        ...boardsProviders,
        BoardsService
    ],
})
export class BoardsModule {}

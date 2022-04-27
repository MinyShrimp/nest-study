import { Module } from '@nestjs/common';
import { BoardsModule } from './boards/boards.module';
import { DatabaseModule } from './database/database.module';

@Module({
    imports: [BoardsModule, DatabaseModule],
    providers: [],
})
export class AppModule {}

import { Controller, Get } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(
        private readonly boardsService: BoardsService
    ) {}

    @Get('/')
    getAllBoard(): Array<Board> {
        return this.boardsService.getAllBoards();
    }
}

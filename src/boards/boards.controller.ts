import { Controller, Get } from '@nestjs/common';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(
        private readonly boardsService: BoardsService
    ) {}

    @Get()
    getAllBoard() {
        return this.boardsService.getAllBoards();
    }
}

import { Body, Controller, Get, Post } from '@nestjs/common';
import { Board } from './boards.model';
import { BoardsService } from './boards.service';

@Controller('boards')
export class BoardsController {
    constructor(private readonly boardsService: BoardsService) {}

    @Get('/')
    getAllBoard(): Array<Board> {
        return this.boardsService.getAllBoards();
    }

    @Post('/')
    createBoard(
        @Body('title') title: string,
        @Body('description') description: string,
    ): Board {
        return this.boardsService.createBoard(title, description);
    }
}

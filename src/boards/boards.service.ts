import { Injectable } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';

@Injectable()
export class BoardsService {
    private boards: Array<Board> = [];

    getAllBoards(): Array<Board> {
        return this.boards;
    }

    createBoard(
        title: string,
        description: string,
        status: BoardStatus = BoardStatus.PUBLIC,
    ) {
        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: status,
        };
        this.boards.push(board);
        
        return board;
    }
}

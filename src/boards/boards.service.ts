import { Injectable, NotFoundException } from '@nestjs/common';
import { Board, BoardStatus } from './boards.model';
import { v1 as uuid } from 'uuid';
import { CreateBoardDTO } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
    private boards: Array<Board> = [];

    getAllBoards(): Array<Board> {
        return this.boards;
    }

    createBoard(createBoardDTO: CreateBoardDTO) {
        const { title, description, status } = createBoardDTO;

        const board: Board = {
            id: uuid(),
            title: title,
            description: description,
            status: status ?? BoardStatus.PUBLIC,
        };
        this.boards.push(board);

        return board;
    }

    getBoardById(id: string): Board {
        const found = this.boards.find((board) => board.id === id);
        if (!found) {
            throw new NotFoundException(`Can't find board by id ${id}`);
        }
        return found;
    }

    deleteBoard(id: string): void {
        const found = this.getBoardById(id);
        this.boards = this.boards.filter((board) => board.id !== found.id);
    }

    updateBoardStatus(id: string, status: BoardStatus): Board {
        const board = this.getBoardById(id);
        board.status = status;
        return board;
    }
}

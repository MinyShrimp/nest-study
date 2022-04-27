import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { Repository } from 'typeorm';
import { Board } from './boards.entity';

@Injectable()
export class BoardsService {
    constructor(
        @Inject('BOARD_REPOSITORY')
        private boardRepository: Repository<Board>,
    ) {}

    async getAllBoards(): Promise<Board[]> {
        return await this.boardRepository.find();
    }

    async createBoard(createBoardDTO: CreateBoardDTO): Promise<Board> {
        const { title, description, status } = createBoardDTO;

        const board = await this.boardRepository.save({
            title: title,
            description: description,
            status: status ?? BoardStatus.PUBLIC,
        });

        return board;
    }

    // getBoardById(id: string): Board {
    //     // this.boardRepository.findOne()
    //     const found = this.boards.find((board) => board.id === id);
    //     if (!found) {
    //         throw new NotFoundException(`Can't find board by id ${id}`);
    //     }
    //     return found;
    // }

    // deleteBoard(id: string): void {
    //     const found = this.getBoardById(id);
    //     this.boards = this.boards.filter((board) => board.id !== found.id);
    // }

    // updateBoardStatus(id: string, status: BoardStatus): Board {
    //     const board = this.getBoardById(id);
    //     board.status = status;
    //     return board;
    // }
}

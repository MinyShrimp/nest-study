import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { DeleteResult, Repository } from 'typeorm';
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

    async getBoardById(id: number): Promise<Board> {
        const found = await this.boardRepository.findOne({ where: { id: id } });
        if (!found) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return found;
    }

    async deleteBoard(id: number): Promise<DeleteResult> {
        const result = await this.boardRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return result;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);
        found.status = status;
        await this.boardRepository.save(found);
        return found;
    }
}

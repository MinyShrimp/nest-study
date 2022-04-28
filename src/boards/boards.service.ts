import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { BoardStatus } from './boards-status.enum';
import { CreateBoardDTO } from './dto/create-board.dto';
import { DeleteResult, Repository } from 'typeorm';
import { Board } from './boards.entity';
import { User } from 'src/auth/user.entity';

@Injectable()
export class BoardsService {
    constructor(
        @Inject('BOARD_REPOSITORY')
        private boardRepository: Repository<Board>,
    ) {}

    async getAllBoards(user: User): Promise<Board[]> {
        const query = this.boardRepository.createQueryBuilder('board');

        query.where('board.userId = :userId', { userId: user.id });

        const boards = await query.getMany();

        return boards;
        // return await this.boardRepository.find({ where: { user: user } });
    }

    async createBoard(
        createBoardDTO: CreateBoardDTO,
        user: User
    ): Promise<Board> {
        const { title, description, status } = createBoardDTO;

        const board = await this.boardRepository.save({
            title: title,
            description: description,
            status: status ?? BoardStatus.PUBLIC,
            user: user
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

    async deleteBoard(id: number, user: User): Promise<DeleteResult> {
        const query = await this.boardRepository.createQueryBuilder('board')
            .leftJoinAndSelect('board.user', 'user')
            .where('board.id = :id and board.userId = :userId', { id: id, userId: user.id })
            .delete()
            .execute();

        if (query.affected === 0) {
            throw new NotFoundException(`Can't find Board with id ${id}`);
        }
        return query;
    }

    async updateBoardStatus(id: number, status: BoardStatus): Promise<Board> {
        const found = await this.getBoardById(id);
        found.status = status;
        await this.boardRepository.save(found);
        return found;
    }
}
import { Injectable } from '@nestjs/common';
import { Board } from "./boards.model";

@Injectable()
export class BoardsService {
    private boards: Array<Board> = [];

    getAllBoards(): Array<Board> {
        return this.boards;
    }
}

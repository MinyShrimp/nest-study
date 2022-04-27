import { Injectable } from '@nestjs/common';

@Injectable()
export class BoardsService {
    private boards = [ "안녕" ];

    getAllBoards() {
        return this.boards;
    }
}

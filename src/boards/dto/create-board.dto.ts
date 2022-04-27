import { BoardStatus } from "../boards.model";

export class CreateBoardDTO {
    title: string;
    description: string;
    status: BoardStatus;
}
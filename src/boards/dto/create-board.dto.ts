import { IsNotEmpty } from "class-validator";
import { BoardStatus } from "../boards-status.enum";

export class CreateBoardDTO {
    @IsNotEmpty()
    title: string;

    @IsNotEmpty()
    description: string;

    status: BoardStatus;
}
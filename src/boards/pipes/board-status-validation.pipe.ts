import { BadRequestException, PipeTransform } from '@nestjs/common';
import { BoardStatus } from '../boards-status.enum';

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = Object.values(BoardStatus);

    transform(value: any) {
        //, metadata: ArgumentMetadata) {
        value = value.toUpperCase();
        if (!this.isStatusValid(value)) {
            throw new BadRequestException(`${value} isn't in the status`);
        }
        return value;
    }

    private isStatusValid(status: any): boolean {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1;
    }
}

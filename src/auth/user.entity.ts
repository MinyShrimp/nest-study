import { Board } from "src/boards/boards.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from "bcryptjs";

@Entity()
@Unique(['name'])
export class User extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    password: string;

    @Column()
    salt: string;

    @OneToMany(type => Board, board => board.user, { eager: true })
    boards: Board[];

    async validatePassword(password: string) {
        const isValid = await bcrypt.compare(password, this.password);
        return isValid;
    }
}
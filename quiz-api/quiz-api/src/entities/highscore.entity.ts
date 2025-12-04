import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity()
export class Highscore {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => User, (user) => user.highscores) // Povezivanje sa User-om
    user: User;

    @Column()
    gameType: string;

    @Column()
    score: number;
}
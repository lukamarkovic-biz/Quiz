import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { AsColumn } from "./column.entity";

@Entity() export class Term {
    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    text: string;

    @Column()
    isRevealed: boolean;

    @ManyToOne(() => AsColumn, (column) => column.terms)
    column: AsColumn;
}
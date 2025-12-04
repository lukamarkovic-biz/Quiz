import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { AsColumn } from "./column.entity";

@Entity()
export class Association {
    @PrimaryGeneratedColumn()
    id: number;

    @OneToMany(() => AsColumn, (column) => column.association, { cascade: true })
    columns: AsColumn[];

    @Column()
    finalSolution: string; // Final solution for the whole game

    @Column()
    enableInput: boolean;

    @Column()
    isRevealed: boolean;
  }
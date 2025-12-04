import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm";
import { Term } from "./term.entity";
import { Association } from "./association.entity";

@Entity()
export class AsColumn {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    columnId: string; 

    @OneToMany(() => Term, (term) => term.column, { cascade: true })
    terms: Term[];

    @Column()
    solution: string;

    @Column()
    isRevealed: boolean;

    @Column()
    revealAllTerms: boolean;

    @Column()
    enableInput: boolean;

    @ManyToOne(() => Association, (association) => association.columns)
    association: Association;
}

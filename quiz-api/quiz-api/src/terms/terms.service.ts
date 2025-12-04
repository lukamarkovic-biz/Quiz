import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Term } from 'src/entities/term.entity';
import { Repository } from 'typeorm';

@Injectable()
export class TermsService {
    constructor(
        @InjectRepository(Term) private termRepository: Repository<Term>
    ) {}

    public getAll() {
        return this.termRepository.find();
    }

    public getById(id: number){
        return this.termRepository.findOne({where: {id}});
    }

    public create(term: Term){
        this.termRepository.save(term);
    }
}

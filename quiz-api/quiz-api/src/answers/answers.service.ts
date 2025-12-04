import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AnswersService {
    constructor(
        @InjectRepository(Answer) private answerRepository: Repository<Answer>
    ) {}

    public getAll() {
        return this.answerRepository.find();
    }

    public getById(id: number){
        return this.answerRepository.findOne({where: {id}});
    }

    public create(answer: Answer){
        this.answerRepository.save(answer);
    }
}

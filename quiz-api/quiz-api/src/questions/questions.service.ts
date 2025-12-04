import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Question } from 'src/entities/question.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class QuestionsService {
    constructor(
        @InjectRepository(Question) private questionsRepository: Repository<Question>
    ) {}

    public getAll() {
        return this.questionsRepository.find({relations: ['answers']});
    }

    public getById(id: number){
        return this.questionsRepository.findOne({where: {id} ,relations: ['answers']});
    }

    public async get10() {
        const randomIds = await this.questionsRepository
        .createQueryBuilder()
        .select('id')
        .orderBy('RANDOM()') // PostgreSQL, za MySQL koristi RAND()
        .limit(10)
        .getRawMany();

        return await this.questionsRepository.find({
            where: { id: In(randomIds.map(q => q.id)) },
            relations: ['answers'],
          });
    }

    public create(question: Question){
        this.questionsRepository.save(question);
    }
}

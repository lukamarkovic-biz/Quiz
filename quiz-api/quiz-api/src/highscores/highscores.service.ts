import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Highscore } from 'src/entities/highscore.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HighscoresService {
    constructor(
        @InjectRepository(Highscore) private highscoreRepository: Repository<Highscore>
    ) {}

    public async getAll() {
        const highscores = await this.highscoreRepository.find({relations: ['user']});
        return highscores.sort((a, b) => b.score - a.score);
    }

    public getById(id: number){
        return this.highscoreRepository.findOne({where: {id} ,relations: ['user']});
    }

    public async create(highscore: Highscore){
        const allScores = await this.highscoreRepository.find({ relations: ['user'] });

        allScores.push(highscore);
    
        const topScores = allScores.sort((a, b) => b.score - a.score).slice(0, 20);

        await this.highscoreRepository.clear();
        await this.highscoreRepository.save(topScores);
        return highscore
    }
}

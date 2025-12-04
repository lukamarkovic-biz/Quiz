import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Highscore } from 'src/entities/highscore.entity';
import { HighscoresController } from './highscores.controller';
import { HighscoresService } from './highscores.service';

@Module({
    imports: [TypeOrmModule.forFeature([Highscore])],
    controllers: [HighscoresController],
    providers: [HighscoresService],
})
export class HighscoresModule {}

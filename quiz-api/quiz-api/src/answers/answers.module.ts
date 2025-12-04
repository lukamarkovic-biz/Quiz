import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Answer } from 'src/entities/answer.entity';

import { AnswersService } from './answers.service';
import { AnswersController } from './answers.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Answer])],
    controllers: [AnswersController],
    providers: [AnswersService],
  })
  export class AnswersModule {}

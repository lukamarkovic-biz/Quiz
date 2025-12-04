import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { Association } from 'src/entities/association.entity';
import { Answer } from 'src/entities/answer.entity';

@Controller('answers')
export class AnswersController {
    constructor (private anwsersService: AnswersService) {}

    @Get()
    public getAnswers() {
        return this.anwsersService.getAll();
    }

    @Get(':id')
    public getAnswer(@Param('id', ParseIntPipe) id: number) {
        return this.anwsersService.getById(id);
    }
    
    @Post()
    public addAnswer(@Body() answer: Answer){
        return this.anwsersService.create(answer);
    }
}


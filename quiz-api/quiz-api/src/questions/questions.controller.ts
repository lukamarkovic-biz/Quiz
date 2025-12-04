import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { Question } from 'src/entities/question.entity';
import { QuestionsService } from './questions.service';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role';

@Controller('questions')
@UseGuards(JwtAuthGuard)
export class QuestionsController {
    constructor (private questionsService: QuestionsService) {}

    @Get()
    public getQuestions() {
        return this.questionsService.getAll();
    }

    @Get('/find10')
    @Roles(Role.User)
    public get10Questions(){
        return this.questionsService.get10();
    }

    @Get(':id')
    public getQuestion(@Param('id', ParseIntPipe) id: number) {
        return this.questionsService.getById(id);
    }

    @Post()
    public addQuestion(@Body() question: Question){
        return this.questionsService.create(question);
    }
}

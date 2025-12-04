import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { TermsService } from './terms.service';
import { Term } from 'src/entities/term.entity';

@Controller('terms')
export class TermsController {

    constructor (private termsService: TermsService) {}

    @Get()
    public getTerms() {
        return this.termsService.getAll();
    }

    @Get(':id')
    public getTerm(@Param('id', ParseIntPipe) id: number) {
        return this.termsService.getById(id);
    }
    
    @Post()
    public addTerm(@Body() term: Term){
        return this.termsService.create(term);
    }
}

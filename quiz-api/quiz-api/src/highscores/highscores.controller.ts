import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { HighscoresService } from './highscores.service';
import { Highscore } from 'src/entities/highscore.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Role } from 'src/auth/role';
import { Roles } from 'src/auth/roles.decorator';

@Controller('highscores')
@UseGuards(JwtAuthGuard)
export class HighscoresController {
    constructor (private highscoresService: HighscoresService) {}

    @Get()
    @Roles(Role.User)
    public getHighscore() {
        return this.highscoresService.getAll();
    }

    @Get(':id')
    public getHighscores(@Param('id', ParseIntPipe) id: number) {
        return this.highscoresService.getById(id);
    }
    
    @Post()
    @Roles(Role.User)
    public addHighscore(@Body() highscore: Highscore){
        return this.highscoresService.create(highscore);
    }
}

import { Body, Controller, Get, Param, ParseIntPipe, Post, UseGuards } from '@nestjs/common';
import { AssociationsService } from './associations.service';
import { Association } from 'src/entities/association.entity';
import { Roles } from 'src/auth/roles.decorator';
import { Role } from 'src/auth/role';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('associations')
export class AssociationsController {
    constructor (private associationsService: AssociationsService) {}

    @Get()
    public getAssociations() {
        return this.associationsService.getAll();
    }
    
    @Get('random')
    @Roles(Role.User)
    async getRandomAsocijacija(): Promise<Association> {
      const randomId = await this.associationsService.getRandomAsocijacijaId();
      return this.associationsService.getById(randomId);
    }

    @Get(':id')
    public getAssociation(@Param('id', ParseIntPipe) id: number) {
        return this.associationsService.getById(id);
    }
    
    @Post()
    public addAssociation(@Body() association: Association){
        return this.associationsService.create(association);
    }
}

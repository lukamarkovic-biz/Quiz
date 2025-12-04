import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Association } from 'src/entities/association.entity';
import { Repository } from 'typeorm';

@Injectable()
export class AssociationsService {
    constructor(
        @InjectRepository(Association) private associationRepository: Repository<Association>
    ) {}

    public getAll() {
        return this.associationRepository.find({relations: ['columns', 'columns.terms']});
    }

    public getById(id: number){
        return this.associationRepository.findOne({where: {id} , relations: ['columns', 'columns.terms']});
    }

    public create(association: Association){
        this.associationRepository.save(association);
    }

    async getRandomAsocijacijaId(): Promise<number> {
        const randomEntry = await this.associationRepository
          .createQueryBuilder()
          .select('id')
          .orderBy('RANDOM()') // Za PostgreSQL ili SQLite koristi RANDOM(); za MySQL koristi RAND()
          .limit(1)
          .getRawOne();
    
        // Proveri strukturu randomEntry
        console.log(randomEntry); // Dodaćeš ovo radi debagovanja
    
        return randomEntry.id; // Možda treba da bude randomEntry.game_id
    }
}


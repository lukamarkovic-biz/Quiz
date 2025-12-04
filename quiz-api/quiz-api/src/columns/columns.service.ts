import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AsColumn } from 'src/entities/column.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ColumnsService {
    constructor(
        @InjectRepository(AsColumn) private asColumnRepository: Repository<AsColumn>
    ) {}

    public getAll() {
        return this.asColumnRepository.find({relations: ['terms']});
    }

    public getById(id: number){
        return this.asColumnRepository.findOne({where: {id} ,relations: ['terms']});
    }

    public create(column: AsColumn){
        this.asColumnRepository.save(column);
    }
}

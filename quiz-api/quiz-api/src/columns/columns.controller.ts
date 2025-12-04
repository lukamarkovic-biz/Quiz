import { Body, Controller, Get, Param, ParseIntPipe, Post } from '@nestjs/common';
import { ColumnsService } from './columns.service';
import { AsColumn } from 'src/entities/column.entity';

@Controller('columns')
export class ColumnsController {
    constructor (private columnsService: ColumnsService) {}

    @Get()
    public getColumns() {
        return this.columnsService.getAll();
    }

    @Get(':id')
    public getColumn(@Param('id', ParseIntPipe) id: number) {
        return this.columnsService.getById(id);
    }
    
    @Post()
    public addColumn(@Body() column: AsColumn){
        return this.columnsService.create(column);
    }
}

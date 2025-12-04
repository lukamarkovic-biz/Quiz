import { Module } from '@nestjs/common';
import { ColumnsController } from './columns.controller';
import { ColumnsService } from './columns.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AsColumn } from 'src/entities/column.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AsColumn])],
  controllers: [ColumnsController],
  providers: [ColumnsService],
})
export class ColumnsModule {}

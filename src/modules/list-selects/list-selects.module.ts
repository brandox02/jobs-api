import { Module } from '@nestjs/common';
import { ListSelectsResolver } from './list-selects.resolver';
import { ListSelectsService } from './list-selects.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Education } from 'src/entities/Education.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Education])],
  providers: [ListSelectsService, ListSelectsResolver],
})
export class ListSelectsModule { }

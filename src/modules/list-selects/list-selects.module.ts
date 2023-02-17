import { Module } from '@nestjs/common';
import { ListSelectsResolver } from './list-selects.resolver';
import { ListSelectsService } from './list-selects.service';

@Module({
  imports: [],
  providers: [ListSelectsService, ListSelectsResolver],
})
export class ListSelectsModule {}

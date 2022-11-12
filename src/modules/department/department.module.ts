import { Module } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { DepartmentResolver } from './department.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Department } from './entities/department.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Department])],
  providers: [DepartmentResolver, DepartmentService, UtilsProvider],
})
export class DepartmentModule {}

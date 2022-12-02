import { Resolver, Query, Args } from '@nestjs/graphql';
import { isPublicResolver } from '../auth/jwtStratedy.guard';
import { DepartmentService } from './department.service';
import { DepartmentWhereInput } from './dto/department-where.input';
import { Department } from './entities/department.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}
  @isPublicResolver()
  @Query(() => [Department], { name: 'departmentList' })
  findAll(
    @Args('where', { nullable: true }) where: DepartmentWhereInput,
  ): Promise<Department[]> {
    return this.departmentService.findAll(where);
  }
}

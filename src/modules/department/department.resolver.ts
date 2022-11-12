import { Resolver, Query, Args } from '@nestjs/graphql';
import { DepartmentService } from './department.service';
import { DepartmentWhereInput } from './dto/index.input';
import { Department } from './entities/department.entity';

@Resolver(() => Department)
export class DepartmentResolver {
  constructor(private readonly departmentService: DepartmentService) {}

  // @Mutation(() => Department)
  // createDepartment(
  //   @Args('createDepartmentInput') createDepartmentInput: CreateDepartmentInput,
  // ) {
  //   return this.departmentService.create(createDepartmentInput);
  // }

  @Query(() => [Department], { name: 'departmentsAll' })
  findAll(
    @Args('where', { nullable: true }) where: DepartmentWhereInput,
  ): Promise<Department[]> {
    return this.departmentService.findAll(where);
  }

  // @Query(() => Department, { name: 'department' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.departmentService.findOne(id);
  // }

  // @Mutation(() => Department)
  // updateDepartment(
  //   @Args('updateDepartmentInput') updateDepartmentInput: UpdateDepartmentInput,
  // ) {
  //   return this.departmentService.update(
  //     updateDepartmentInput.id,
  //     updateDepartmentInput,
  //   );
  // }

  // @Mutation(() => Department)
  // removeDepartment(@Args('id', { type: () => Int }) id: number) {
  //   return this.departmentService.remove(id);
  // }
}

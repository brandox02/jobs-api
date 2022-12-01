import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { DepartmentWhereInput } from './dto/department-where.input';
import { Department } from './entities/department.entity';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectRepository(Department) private readonly repo: Repository<Department>,
    private readonly utils: UtilsProvider,
  ) {}

  // create(createDepartmentInput: CreateDepartmentInput) {
  //   return 'This action adds a new department';
  // }

  async findAll(
    where: FindOptionsWhere<DepartmentWhereInput> = {},
  ): Promise<Department[]> {
    return await this.repo.find({ where });
  }

  // async find({
  //   skip,
  //   take,
  //   where,
  // }: FindAllInput<DepartmentWhereInput>): Promise<Department[]> {
  //   return await this.repo.find({
  //     where: this.utils.removeNullFields(where),
  //     skip,
  //     take,
  //   });
  // }

  // findOne(id: number) {
  //   return `This action returns a #${id} department`;
  // }

  // update(id: number, updateDepartmentInput: UpdateDepartmentInput) {
  //   return `This action updates a #${id} department`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} department`;
  // }
}

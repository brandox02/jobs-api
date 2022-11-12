import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/common/FindAllInput';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly repo: Repository<Company>,
    private readonly utils: UtilsProvider,
  ) {}
  // create(createCompanyInput: CreateCompanyInput) {
  //   return 'This action adds a new company';
  // }

  // async findAll(
  //   where: FindOptionsWhere<Department> = {},
  // ): Promise<Department[]> {
  //   return await this.repo.find({ where });
  // }

  async find({ skip, take, where }: FindAllInput<Company>): Promise<Company[]> {
    return await this.repo.find({
      where: this.utils.removeNullFields(where),
      skip,
      take,
    });
  }

  async findAll(where: FindOptionsWhere<Company> = {}): Promise<Company[]> {
    return await this.repo.find({ where });
  }

  // findOne(id: number) {
  //   return `This action returns a #${id} company`;
  // }

  // update(id: number, updateCompanyInput: UpdateCompanyInput) {
  //   return `This action updates a #${id} company`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} company`;
  // }
}

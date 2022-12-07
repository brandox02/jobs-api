import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
// import { UtilsProvider } from 'src/common/UtilsProvider';
import { FindOptionsWhere, Repository } from 'typeorm';
import { CreateCompanyInput, UpdateCompanyInput } from './dto/index.input';
import { Company } from './entities/company.entity';

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(Company) private readonly repo: Repository<Company>, // private readonly utils: UtilsProvider,
  ) {}

  async findAll(where: FindOptionsWhere<Company> = {}): Promise<Company[]> {
    return await this.repo.find({ where, relations: ['departments'] });
  }

  async create(company: CreateCompanyInput): Promise<Company> {
    const companySaved = await this.repo.save(this.repo.create(company));

    return this.repo.findOne({ where: { id: companySaved.id } });
  }

  async update(company: UpdateCompanyInput): Promise<Company> {
    const companySaved = await this.repo.save(this.repo.create(company));

    return this.repo.findOne({ where: { id: companySaved.id } });
  }
}

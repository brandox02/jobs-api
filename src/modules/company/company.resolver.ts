import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { isPublicResolver } from '../auth/jwtStratedy.guard';
import {
  CompanyWhereInput,
  CreateCompanyInput,
  UpdateCompanyInput,
} from './dto/index.input';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  @isPublicResolver()
  @Query(() => [Company], { name: 'companyList' })
  findAll(
    @Args('where', { nullable: true }) where: CompanyWhereInput,
  ): Promise<Company[]> {
    return this.companyService.findAll(where);
  }

  @Mutation(() => Company)
  async updateCompany(
    @Args('input') input: UpdateCompanyInput,
  ): Promise<Company> {
    return this.companyService.update(input);
  }

  @Mutation(() => Company)
  async createCompany(
    @Args('input') input: CreateCompanyInput,
  ): Promise<Company> {
    return this.companyService.create(input);
  }
}

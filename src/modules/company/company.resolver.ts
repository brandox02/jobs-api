import { Resolver, Query, Args } from '@nestjs/graphql';
import { CompanyService } from './company.service';
import { Company } from './entities/company.entity';
import { isPublicResolver } from '../auth/jwtStratedy.guard';
import { CompanyWhereInput } from './dto/index.input';

@Resolver(() => Company)
export class CompanyResolver {
  constructor(private readonly companyService: CompanyService) {}

  // @Mutation(() => Company)
  // createCompany(
  //   @Args('createCompanyInput') createCompanyInput: CreateCompanyInput,
  // ) {
  //   return this.companyService.create(createCompanyInput);
  // }
  @isPublicResolver()
  @Query(() => [Company], { name: 'companyList' })
  findAll(
    @Args('where', { nullable: true }) where: CompanyWhereInput,
  ): Promise<Company[]> {
    return this.companyService.findAll(where);
  }

  // @Query(() => Company, { name: 'company' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.companyService.findOne(id);
  // }

  // @Mutation(() => Company)
  // updateCompany(
  //   @Args('updateCompanyInput') updateCompanyInput: UpdateCompanyInput,
  // ) {
  //   return this.companyService.update(
  //     updateCompanyInput.id,
  //     updateCompanyInput,
  //   );
  // }

  // @Mutation(() => Company)
  // removeCompany(@Args('id', { type: () => Int }) id: number) {
  //   return this.companyService.remove(id);
  // }
}

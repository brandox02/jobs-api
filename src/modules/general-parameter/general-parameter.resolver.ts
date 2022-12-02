import { Resolver, Query, Args, Mutation } from '@nestjs/graphql';
import { GeneralParameterService } from './general-parameter.service';
import { GeneralParameter } from './entities/general-parameter.entity';
import { GeneralParameterWhereInput } from './dto/general-paremeter-where.input';
import { UpdateGeneralParameterInput } from './dto/update-general-parameter.input';

@Resolver(() => GeneralParameter)
export class GeneralParameterResolver {
  constructor(
    private readonly generalParameterService: GeneralParameterService,
  ) {}

  @Query(() => GeneralParameter)
  async generalParameter(
    @Args('where') where: GeneralParameterWhereInput,
  ): Promise<GeneralParameter> {
    return this.generalParameterService.findOne(where);
  }

  @Query(() => [GeneralParameter])
  async generalParameterList(
    @Args('where', { defaultValue: {} }) where: GeneralParameterWhereInput,
  ): Promise<GeneralParameter[]> {
    return this.generalParameterService.findAll(where);
  }

  @Mutation(() => GeneralParameter)
  async updateGeneralParameter(
    @Args('input') input: UpdateGeneralParameterInput,
  ): Promise<GeneralParameter> {
    return this.generalParameterService.update(input);
  }
}

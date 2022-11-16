import { Resolver, Query, Args } from '@nestjs/graphql';
import { GeneralParameterService } from './general-parameter.service';
import { GeneralParameter } from './entities/general-parameter.entity';
import { GeneralParameterWhereInput } from './dto/general-paremeter-where.input';

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
  // @Mutation(() => GeneralParameter)
  // createGeneralParameter(@Args('createGeneralParameterInput') createGeneralParameterInput: CreateGeneralParameterInput) {
  //   return this.generalParameterService.create(createGeneralParameterInput);
  // }

  // @Query(() => [GeneralParameter], { name: 'generalParameter' })
  // findAll() {
  //   return this.generalParameterService.findAll();
  // }

  // @Query(() => GeneralParameter, { name: 'generalParameter' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.generalParameterService.findOne(id);
  // }

  // @Mutation(() => GeneralParameter)
  // updateGeneralParameter(@Args('updateGeneralParameterInput') updateGeneralParameterInput: UpdateGeneralParameterInput) {
  //   return this.generalParameterService.update(updateGeneralParameterInput.id, updateGeneralParameterInput);
  // }

  // @Mutation(() => GeneralParameter)
  // removeGeneralParameter(@Args('id', { type: () => Int }) id: number) {
  //   return this.generalParameterService.remove(id);
  // }
}

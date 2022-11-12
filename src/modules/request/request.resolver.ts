import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { RequestService } from './request.service';
import {  Request } from './entities/request.entity';
import { CreateRequestInput } from './dto/create-request.input';
import { UpdateRequestInput } from './dto/update-request.input';

@Resolver(() => Request)
export class RequestResolver {
  constructor(private readonly requestService: RequestService) {}

  @Mutation(() => Request)
  createRequest(
    @Args('createRequestInput') createRequestInput: CreateRequestInput,
  ) {
    return this.requestService.create(createRequestInput);
  }

  @Query(() => [Request], { name: 'request' })
  findAll() {
    return this.requestService.findAll();
  }

  @Query(() => Request, { name: 'request' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.requestService.findOne(id);
  }

  @Mutation(() => Request)
  updateRequest(
    @Args('updateRequestInput') updateRequestInput: UpdateRequestInput,
  ) {
    return this.requestService.update(
      updateRequestInput.id,
      updateRequestInput,
    );
  }

  @Mutation(() => Request)
  removeRequest(@Args('id', { type: () => Int }) id: number) {
    return this.requestService.remove(id);
  }
}

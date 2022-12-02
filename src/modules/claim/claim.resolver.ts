import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { PaginatedOrder } from '../order/dto/paginated-order.output';
import { Paginate } from '../order/order.service';
import { ClaimService } from './claim.service';
import { CreateClaimInput } from './dto/create-claim.input';
import { PaginatedClaim } from './dto/paginated-claim.input';
import { UpdateClaimInput } from './dto/update-claim.input';
import { WhereClaimInput } from './dto/where-claim.input';
import { Claim } from './entities/claim.entity';

@Resolver(() => Claim)
export class ClaimResolver {
  constructor(private readonly service: ClaimService) {}

  @Mutation(() => Claim)
  async createClaim(@Args('input') input: CreateClaimInput): Promise<Claim> {
    return this.service.create(input);
  }

  @Query(() => [Claim])
  async claimList(
    @Args('where', { defaultValue: {} }) where: WhereClaimInput,
    @Context() context: any,
  ): Promise<Claim[]> {
    return this.service.findAll(where, context);
  }

  @Query(() => Claim)
  async claim(
    @Args('where') where: WhereClaimInput,
    @Context() context: any,
  ): Promise<Claim> {
    return this.service.findOne(where, context);
  }

  @Query(() => PaginatedClaim)
  async claims(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: WhereClaimInput,
    @Context() context: any,
  ): Promise<Paginate<Claim>> {
    return this.service.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Claim)
  async updateClaim(
    @Args('input') input: UpdateClaimInput,
    @Context() context: any,
  ): Promise<Claim> {
    return this.service.update(input, context);
  }
}

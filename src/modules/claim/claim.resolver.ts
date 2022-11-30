import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
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
  constructor(private readonly orderService: ClaimService) {}

  @Mutation(() => Claim)
  async createClaim(@Args('input') input: CreateClaimInput): Promise<Claim> {
    return this.orderService.create(input);
  }

  @Query(() => [Claim])
  async claimList(
    @Args('where', { defaultValue: {} }) where: WhereClaimInput,
  ): Promise<Claim[]> {
    return this.orderService.findAll(where);
  }

  @Query(() => Claim)
  async claim(@Args('where') where: WhereClaimInput): Promise<Claim> {
    return this.orderService.findOne(where);
  }

  @Query(() => PaginatedClaim)
  async claims(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: WhereClaimInput,
  ): Promise<Paginate<Claim>> {
    return this.orderService.find({
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Claim)
  async updateClaim(@Args('input') input: UpdateClaimInput): Promise<Claim> {
    return this.orderService.update(input);
  }
}

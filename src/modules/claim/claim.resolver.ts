import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ClaimService } from './claim.service';
import { Claim } from './entities/claim.entity';
import { CreateClaimInput } from './dto/create-claim.input';
import { UpdateClaimInput } from './dto/update-claim.input';

@Resolver(() => Claim)
export class ClaimResolver {
  constructor(private readonly claimService: ClaimService) {}

  @Mutation(() => Claim)
  createClaim(@Args('createClaimInput') createClaimInput: CreateClaimInput) {
    return this.claimService.create(createClaimInput);
  }

  @Query(() => [Claim], { name: 'claim' })
  findAll() {
    return this.claimService.findAll();
  }

  @Query(() => Claim, { name: 'claim' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.claimService.findOne(id);
  }

  @Mutation(() => Claim)
  updateClaim(@Args('updateClaimInput') updateClaimInput: UpdateClaimInput) {
    return this.claimService.update(updateClaimInput.id, updateClaimInput);
  }

  @Mutation(() => Claim)
  removeClaim(@Args('id', { type: () => Int }) id: number) {
    return this.claimService.remove(id);
  }
}

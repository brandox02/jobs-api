import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimResolver } from './claim.resolver';

@Module({
  providers: [ClaimResolver, ClaimService]
})
export class ClaimModule {}

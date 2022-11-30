import { Module } from '@nestjs/common';
import { ClaimService } from './claim.service';
import { ClaimResolver } from './claim.resolver';
import { Claim } from './entities/claim.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UtilsProvider } from 'src/common/UtilsProvider';

@Module({
  imports: [TypeOrmModule.forFeature([Claim])],
  providers: [ClaimResolver, ClaimService, UtilsProvider],
})
export class ClaimModule {}

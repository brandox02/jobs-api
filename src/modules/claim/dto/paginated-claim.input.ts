import { ObjectType } from '@nestjs/graphql';
import { PaginatedMetadata } from 'src/modules/order/dto/paginated-order.output';
import { Paginate } from 'src/modules/order/order.service';
import { Claim } from '../entities/claim.entity';

@ObjectType()
export class PaginatedClaim implements Paginate<Claim> {
  items: Claim[];
  metadata: PaginatedMetadata;
}

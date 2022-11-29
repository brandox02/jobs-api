import { ObjectType } from '@nestjs/graphql';
import { Order } from '../entities/order.entity';
import { Paginate } from '../order.service';

@ObjectType()
export class PaginatedMetadata {
  totalItems: number;
  perPage: number;
  totalPages: number;
}

@ObjectType()
export class PaginatedOrder implements Paginate<Order> {
  items: Order[];
  metadata: PaginatedMetadata;
}

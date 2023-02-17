import { ObjectType } from '@nestjs/graphql';

@ObjectType()
export class PaginatedMetadata {
  totalItems: number;
  perPage: number;
  totalPages: number;
}

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

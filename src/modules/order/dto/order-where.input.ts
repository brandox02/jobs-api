import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderWhereInput {
  id?: number;
  userId?: number;
  noOrder?: string;
  // deliverDate?: Date;
  // createdAt?: Date;
  typeId?: number;
  statusId?: number;
  fromDate?: Date;
  toDate?: Date;
  filterDateByDelivered?: boolean;
  fullname?: string;
  statusIds?: number[];
}

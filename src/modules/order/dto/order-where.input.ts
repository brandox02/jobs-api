import { InputType } from '@nestjs/graphql';

@InputType()
export class OrderWhereInput {
  id?: number;
  userId?: number;
  // deliverDate?: Date;
  // createdAt?: Date;
  typeId?: number;
  statusId?: number;
  fromDate?: Date;
  toDate?: Date;
  filterDateByDelivered?: boolean;
}

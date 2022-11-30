import { InputType } from '@nestjs/graphql';

@InputType()
export class WhereClaimInput {
  id?: number;
  description?: string;
  name?: string;
  orderId?: number;
  filterDateByClaimDate?: boolean;
  fromDate?: Date;
  toDate?: Date;
  noOrder?: string;
}

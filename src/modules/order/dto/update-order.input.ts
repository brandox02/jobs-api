import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateOrderDetailInput {
  id: number;
  name?: string;
  comment?: string;
  quantity?: number;
  price?: number;
  total?: number;
}

@InputType()
export class UpdateOrderInput {
  id: number;
  details?: UpdateOrderDetailInput[];
  statusId?: number;
  total?: number;
}

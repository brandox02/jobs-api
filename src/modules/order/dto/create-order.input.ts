import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateOrderDetailInput {
  name: string;
  quantity: number;
  price: number;
  total: number;
  isDailyDish: boolean;
  comment: string;
}

@InputType()
export class CreateOrderInput {
  deliverDate: Date;
  userId: number;
  details: CreateOrderDetailInput[];
  total: number;
  statusId: number;
  typeId: number;
  dailyDishPrice: number;
}

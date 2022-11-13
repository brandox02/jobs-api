import { InputType } from '@nestjs/graphql';

@InputType()
export class MenuWhereInput {
  id: number;
  name: string;
  dayDishPrice: number;
}

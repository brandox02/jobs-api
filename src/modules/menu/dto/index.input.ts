import { Field, InputType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';

@InputType()
export class MenuWhereInput {
  id?: number;
  name?: string;
  dayDishPrice?: number;
}

@InputType()
export class UpdateMenuInput {
  id: number;
  name?: string;
  @Field(() => GraphQLJSON)
  json?: typeof GraphQLJSON;
}

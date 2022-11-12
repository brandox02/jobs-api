import { UserInput } from './index.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(UserInput) {
  @Field(() => Int)
  id: number;
}

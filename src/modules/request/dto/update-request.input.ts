import { CreateRequestInput } from './create-request.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateRequestInput extends PartialType(CreateRequestInput) {
  @Field(() => Int)
  id: number;
}

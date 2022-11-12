import { InputType, Int, Field } from '@nestjs/graphql';

@InputType()
export class CreateDepartmentInput {
  @Field(() => Int, { description: 'Example field (placeholder)' })
  exampleField: number;
}

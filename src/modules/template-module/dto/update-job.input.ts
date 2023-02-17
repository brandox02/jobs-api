import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateJobInput {
  id: number;
}

import { InputType } from '@nestjs/graphql';

@InputType()
export class RequirementInput {
  id: string;
  name: string;
}

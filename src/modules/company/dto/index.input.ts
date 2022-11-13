import { InputType } from '@nestjs/graphql';

@InputType()
export class CompanytWhereInput {
  name?: string;
  id?: number;
  sede?: string;
  location?: string;
}
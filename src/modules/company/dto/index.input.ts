import { InputType } from '@nestjs/graphql';

@InputType()
export class CompanyWhereInput {
  name?: string;
  id?: number;
  sede?: string;
  location?: string;
}

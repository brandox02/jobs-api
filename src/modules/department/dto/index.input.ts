import { InputType } from '@nestjs/graphql';

@InputType()
export class DepartmentWhereInput {
  name?: string;

  id?: number;
}

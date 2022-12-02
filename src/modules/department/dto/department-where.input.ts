import { InputType } from '@nestjs/graphql';

@InputType()
export class DepartmentWhereInput {
  companyId?: number;
}

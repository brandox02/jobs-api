import { InputType } from '@nestjs/graphql';

@InputType()
export class UserWhereInput {
  id?: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  departmentId?: number;
  companyId?: number;
  cedula?: string;
  roleId?: number;
  fromDate?: Date;
  toDate?: Date;
  filterByEnableDate?: boolean;
  enabled?: boolean;
  name?: string;
}

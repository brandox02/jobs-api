import { InputType } from '@nestjs/graphql';

@InputType()
export class UserInput {
  id?: number;
  email?: string;
  password?: string;
  firstname: string;
  lastname?: string;
  departmentId?: number;
  companyId?: number;
  cedula: string;
}

@InputType()
export class UserWhere {
  id?: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  departmentId?: number;
  companyId?: number;
  cedula?: string;
}

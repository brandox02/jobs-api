import { InputType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  email: string;
  password: string;
  firstname: string;
  lastname: string;
  departmentId: number;
  companyId: number;
  cedula: string;
  roleId: number;
}

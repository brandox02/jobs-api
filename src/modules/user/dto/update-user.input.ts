import { InputType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput {
  id: number;
  email?: string;
  password?: string;
  firstname?: string;
  lastname?: string;
  departmentId?: number;
  companyId?: number;
  cedula?: string;
  roleId?: number;
  enabled?: boolean;
  enableDate?: Date;
}

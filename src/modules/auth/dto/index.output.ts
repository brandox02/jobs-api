import { ObjectType } from '@nestjs/graphql';
import { Company } from 'src/modules/company/entities/company.entity';
import { Department } from 'src/modules/department/entities/department.entity';

@ObjectType()
export class LoginOutput {
  accessToken: string;
}

@ObjectType()
export class GetUserInfo {
  id?: number;

  firstname: string;

  lastname: string;

  enabled: boolean;

  cedula: string;

  email: string;

  companyId: number;

  departmentId: number;
}

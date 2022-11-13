import { ObjectType } from '@nestjs/graphql';
import { Company } from 'src/modules/company/entities/company.entity';
import { Department } from 'src/modules/department/entities/department.entity';

@ObjectType()
export class GetUserInfo {
  firstname: string;

  lastname: string;

  enabled: boolean;

  cedula: string;

  email: string;

  companyId: number;
  departmentId: number;

  department: Department;

  company: Company;
}
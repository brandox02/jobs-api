import { ObjectType } from '@nestjs/graphql';
import { Company } from 'src/modules/company/entities/company.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { PaginatedMetadata } from 'src/modules/order/dto/paginated-order.output';
import { Paginate } from 'src/modules/order/order.service';
import { User } from '../entities/user.entity';

@ObjectType()
export class GetUserInfo {
  id: number;
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

@ObjectType()
export class PaginatedUser implements Paginate<User> {
  items: User[];
  metadata: PaginatedMetadata;
}

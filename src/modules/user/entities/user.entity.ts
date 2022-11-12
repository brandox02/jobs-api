import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: true })
  enabled: boolean;

  @Column()
  cedula: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ name: 'company_id' })
  companyId: number;

  @ManyToOne((_) => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'department_id' })
  departmentId: number;

  @ManyToOne((_) => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}

import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Role } from 'src/modules/role/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('users')
@ObjectType()
export class User extends BaseEntity {
  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column({ default: false })
  enabled: boolean;

  @Column({ unique: true })
  cedula: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ name: 'enable_date', nullable: true })
  @Field({ nullable: true })
  enableDate: Date;

  @Column({ name: 'company_id' })
  companyId: number;

  @ManyToOne(() => Company)
  @JoinColumn({ name: 'company_id' })
  company: Company;

  @Column({ name: 'role_id', nullable: true })
  roleId: number;

  @ManyToOne(() => Role)
  @JoinColumn({ name: 'role_id' })
  role: Company;

  @Column({ name: 'department_id' })
  departmentId: number;

  @ManyToOne(() => Department)
  @JoinColumn({ name: 'department_id' })
  department: Department;
}

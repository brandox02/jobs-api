import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Company } from 'src/modules/company/entities/company.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('departments')
@ObjectType()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'company_id', nullable: true })
  companyId?: number;

  @ManyToOne(() => Company, (c) => c.departments)
  @JoinColumn({ name: 'company_id' })
  company?: Company;
}

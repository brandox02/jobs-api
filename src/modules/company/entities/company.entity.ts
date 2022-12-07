import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Department } from 'src/modules/department/entities/department.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  sede: string;

  @Column()
  location: string;

  @Column()
  acronym: string;

  @OneToMany(() => Department, (d) => d.company, { cascade: true })
  departments?: Department[];
}

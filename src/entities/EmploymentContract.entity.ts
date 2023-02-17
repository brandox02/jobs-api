import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('employment_contracts')
@ObjectType()
export class EmploymentContract extends BaseEntity {
  @Column()
  name: string;
}

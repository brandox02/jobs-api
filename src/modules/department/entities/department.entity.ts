import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('departments')
@ObjectType()
export class Department extends BaseEntity {
  @Column()
  name: string;

  @Column()
  sede: string;

  @Column()
  location: string;
}

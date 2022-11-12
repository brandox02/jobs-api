import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('companies')
@ObjectType()
export class Company extends BaseEntity {
  @Column()
  name: string;

  @Column()
  sede: string;

  @Column()
  location: string;
}

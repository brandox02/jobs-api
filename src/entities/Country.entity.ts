import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('countries')
@ObjectType()
export class Country extends BaseEntity {
  @Column()
  name: string;
}

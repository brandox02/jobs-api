import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('genders')
@ObjectType()
export class Gender extends BaseEntity {
  @Column()
  name: string;
}

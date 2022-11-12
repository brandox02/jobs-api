import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('roles')
@ObjectType()
export class Role extends BaseEntity {
  @Column()
  @Field()
  name: string;
}

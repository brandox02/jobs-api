import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'order_types' })
@ObjectType()
export class OrderType extends BaseEntity {
  @Column()
  name: string;
}

import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity({ name: 'order_status' })
@ObjectType()
export class OrderStatus extends BaseEntity {
  @Column()
  name: string;
}

import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_details' })
@ObjectType()
export class OrderDetail extends BaseEntity {
  @Column({ name: 'order_id' })
  orderId: number;

  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ precision: 10, scale: 2, type: 'decimal' })
  total: number;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

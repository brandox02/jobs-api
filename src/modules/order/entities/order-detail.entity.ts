import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Order } from './order.entity';

@Entity({ name: 'order_details' })
@ObjectType()
export class OrderDetail extends BaseEntity {
  @Column()
  name: string;

  @Column()
  quantity: number;

  @Column({ precision: 10, scale: 2, type: 'decimal' })
  price: number;

  @Column({ name: 'is_daily_dish' })
  isDailyDish: boolean;

  @Column({
    precision: 10,
    scale: 2,
    type: 'decimal',
  })
  total: number;

  @Column()
  comment: string;

  @Column({ name: 'order_id' })
  orderId: number;

  @ManyToOne(() => Order, (o) => o.details)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

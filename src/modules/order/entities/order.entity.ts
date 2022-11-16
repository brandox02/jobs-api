import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { OrderStatus } from './order-status.entity';
import { OrderType } from './order-type.entity';

@Entity({ name: 'orders' })
@ObjectType()
export class Order extends BaseEntity {
  @Column({ name: 'no_order' })
  noOrder: string;

  @Column({ name: 'deliver_date' })
  deliverDate: Date;

  @Column({
    precision: 10,
    scale: 2,
    type: 'decimal',
  })
  total: number;

  @Column()
  seq: number;

  @Column({
    precision: 10,
    scale: 2,
    type: 'decimal',
    name: 'daily_dish_price',
  })
  dailyDishPrice: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user?: User;

  @Column({ name: 'status_id', default: 1 })
  statusId: number;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  status?: OrderStatus;

  @Column({ name: 'type_id' })
  typeId: number;

  @ManyToOne(() => OrderStatus)
  @JoinColumn({ name: 'status_id' })
  type?: OrderType;

  @OneToMany(() => OrderDetail, (d) => d.order, {
    cascade: true,
  })
  details?: OrderDetail[];
}

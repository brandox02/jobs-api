import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Claim } from 'src/modules/claim/entities/claim.entity';
import { Menu } from 'src/modules/menu/entities/menu.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { OrderDetail } from './order-detail.entity';
import { OrderStatus } from './order-status.entity';

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

  @ManyToOne(() => Menu)
  @JoinColumn({ name: 'type_id' })
  type?: Menu;

  @OneToMany(() => OrderDetail, (d) => d.order, {
    cascade: true,
  })
  details?: OrderDetail[];

  @OneToMany(() => Claim, (c) => c.order)
  claims?: Claim[];
}

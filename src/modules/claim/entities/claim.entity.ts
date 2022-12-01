import { Field, ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Order } from 'src/modules/order/entities/order.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('claims')
@ObjectType()
export class Claim extends BaseEntity {
  @Column()
  description: string;

  @Column()
  name: string;

  @Column({ name: 'order_id' })
  orderId: number;

  @Column({ nullable: true, default: false })
  @Field({ nullable: true })
  done: boolean;

  @ManyToOne(() => Order)
  @JoinColumn({ name: 'order_id' })
  order: Order;
}

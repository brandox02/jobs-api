import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity({ name: 'orders' })
@ObjectType()
export class Order extends BaseEntity {
  @Column({ name: 'no_orden' })
  noOrden: number;

  @Column({ name: 'deliver_date' })
  deliverDate: Date;

  @Column({ precision: 10, scale: 2, type: 'decimal' })
  total: number;

  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;
}

import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('daily_work_times')
@ObjectType()
export class DailyWorkTime extends BaseEntity {
  @Column()
  name: string;
}

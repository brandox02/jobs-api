import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('experience_times')
@ObjectType()
export class ExperienceTime extends BaseEntity {
  @Column()
  name: string;
}

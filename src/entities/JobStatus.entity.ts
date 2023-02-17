import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Column, Entity } from 'typeorm';

@Entity('job_status')
@ObjectType()
export class JobStatus extends BaseEntity {
  @Column()
  name: string;
}

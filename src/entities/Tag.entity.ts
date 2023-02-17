import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Job } from 'src/modules/job/entities/job.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('tags')
@ObjectType()
export class Tag extends BaseEntity {
  @Column()
  name: string;

  @Column({ name: 'job_id' })
  jobId: number;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;
}

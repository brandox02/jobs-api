import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { ApplicationStatus } from 'src/entities/AplicationStatus.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { Job } from 'src/modules/job/entities/job.entity';

@Entity({ name: 'applications' })
@ObjectType()
export class Application extends BaseEntity {
  @Column({ name: 'user_id' })
  userId: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'job_id' })
  jobId: number;

  @ManyToOne(() => Job)
  @JoinColumn({ name: 'job_id' })
  job: Job;

  @Column({ name: 'status_id' })
  statusId: number;

  @ManyToOne(() => ApplicationStatus)
  @JoinColumn({ name: 'status_id' })
  status: ApplicationStatus;
}

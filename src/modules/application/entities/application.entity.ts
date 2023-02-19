import { ObjectType } from '@nestjs/graphql';
import { BaseEntity } from 'src/common/BaseEntity';
import { Category } from 'src/entities/Category.entity';
import { City } from 'src/entities/City.entity';
import { Country } from 'src/entities/Country.entity';
import { DailyWorkTime } from 'src/entities/DailyWorkTime.entity';
import { EmploymentContract } from 'src/entities/EmploymentContract.entity';
import { ExperienceTime } from 'src/entities/ExperienceTime.entity';
import { ApplicationStatus } from 'src/entities/AplicationStatus.entity';
import { Tag } from 'src/entities/Tag.entity';
import { WorkingModality } from 'src/entities/WorkingModality.entity';
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

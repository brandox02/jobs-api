import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { User } from '../user/entities/user.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { Application } from '../application/entities/application.entity';
import { DailyWorkTime } from 'src/entities/DailyWorkTime.entity';
import { WorkingModality } from 'src/entities/WorkingModality.entity';
import { EmploymentContract } from 'src/entities/EmploymentContract.entity';
import { ExperienceTime } from 'src/entities/ExperienceTime.entity';
import { Category } from 'src/entities/Category.entity';
import { Country } from 'src/entities/Country.entity';
import { City } from 'src/entities/City.entity';
import { JobStatus } from 'src/entities/JobStatus.entity';
import { Tag } from 'src/entities/Tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User,
    Application, DailyWorkTime, WorkingModality, EmploymentContract,
    ExperienceTime, Category, Country, City, JobStatus, Tag])],
  providers: [JobResolver, JobService, UtilsProvider],
})
export class JobModule { }

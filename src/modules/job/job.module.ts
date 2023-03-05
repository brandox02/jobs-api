import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { User } from '../user/entities/user.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';
import { Application } from '../application/entities/application.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User, Application])],
  providers: [JobResolver, JobService, UtilsProvider],
})
export class JobModule {}

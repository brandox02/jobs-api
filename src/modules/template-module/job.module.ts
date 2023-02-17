import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Job } from './entities/job.entity';
import { User } from '../user/entities/user.entity';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { JobService } from './job.service';
import { JobResolver } from './job.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([Job, User])],
  providers: [JobResolver, JobService, UtilsProvider],
})
export class OrderModule {}

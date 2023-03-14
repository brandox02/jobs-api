import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { JobService } from './job.service';
import { PaginatedJob } from './dto/paginated-job.output';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { ApplyJobInput, UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';
import { Paginate } from 'src/common/paginate-types';
import { PaginatedApplication } from '../application/dto/paginated-application.output';
import { ApplicationWhereInput } from '../application/dto/application-where.input';
import { isPublicResolver } from '../auth/jwtStratedy.guard';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly jobService: JobService) {}

  @Mutation(() => Job)
  async createJob(
    @Args('input') createJobInput: CreateJobInput,
    @Context() context: any,
  ): Promise<Job> {
    return this.jobService.create(createJobInput, context);
  }
  @isPublicResolver()
  @Query(() => Job)
  async job(@Args('where') where: JobWhereInput): Promise<Job> {
    return this.jobService.findOne(where);
  }
  @isPublicResolver()
  @Query(() => PaginatedJob)
  async jobs(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: JobWhereInput,
    @Context() context: any,
  ): Promise<Paginate<Job>> {
    return this.jobService.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Job)
  async updateJob(@Args('input') updateJobInput: UpdateJobInput): Promise<Job> {
    return this.jobService.update(updateJobInput);
  }

  @Mutation(() => Boolean)
  async applyJob(@Args('input') input: ApplyJobInput): Promise<boolean> {
    return this.jobService.applyJob(input);
  }
}

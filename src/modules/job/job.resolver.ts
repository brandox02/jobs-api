import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { JobService } from './job.service';
import { PaginatedJob } from './dto/paginated-job.output';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';
import { Paginate } from 'src/common/paginate-types';

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

  @Query(() => Job)
  async job(@Args('where') where: JobWhereInput): Promise<Job> {
    return this.jobService.findOne(where);
  }

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
}

import {
  Resolver,
  Mutation,
  Args,
  Query,
  Context,
  Float,
} from '@nestjs/graphql';
import { JobService, Paginate } from './job.service';
import { PaginatedJob } from './dto/paginated-job.output';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';

@Resolver(() => Job)
export class JobResolver {
  constructor(private readonly orderService: JobService) {}

  @Mutation(() => Job)
  async createOrder(
    @Args('input') createOrderInput: CreateJobInput,
  ): Promise<Job> {
    return this.orderService.create(createOrderInput);
  }

  @Query(() => Job)
  async job(@Args('where') where: JobWhereInput): Promise<Job> {
    return this.orderService.findOne(where);
  }

  @Query(() => PaginatedJob)
  async orders(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: JobWhereInput,
    @Context() context: any,
  ): Promise<Paginate<Job>> {
    return this.orderService.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Job)
  async updateOrder(
    @Args('input') updateOrderInput: UpdateJobInput,
  ): Promise<Job> {
    return this.orderService.update(updateOrderInput);
  }
}

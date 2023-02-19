import { Resolver, Mutation, Args, Query, Context } from '@nestjs/graphql';
import { ApplicationService } from './application.service';
import { PaginatedApplication } from './dto/paginated-application.output';
import { CreateApplicationInput } from './dto/create-application.input';
import { ApplicationWhereInput } from './dto/application-where.input';
import { UpdateApplicationInput } from './dto/update-application.input';
import { Application } from './entities/application.entity';
import { Paginate } from 'src/common/paginate-types';

@Resolver(() => Application)
export class ApplicationResolver {
  constructor(private readonly applicationService: ApplicationService) {}

  @Mutation(() => Application)
  async createApplication(
    @Args('input') createApplicationInput: CreateApplicationInput,
    @Context() context: any,
  ): Promise<Application> {
    return this.applicationService.create(createApplicationInput, context);
  }

  @Query(() => Application)
  async application(
    @Args('where') where: ApplicationWhereInput,
  ): Promise<Application> {
    return this.applicationService.findOne(where);
  }

  @Query(() => PaginatedApplication)
  async applications(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: ApplicationWhereInput,
    @Context() context: any,
  ): Promise<Paginate<Application>> {
    return this.applicationService.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
  }

  @Mutation(() => Application)
  async updateApplication(
    @Args('input') updateApplicationInput: UpdateApplicationInput,
  ): Promise<Application> {
    return this.applicationService.update(updateApplicationInput);
  }
}

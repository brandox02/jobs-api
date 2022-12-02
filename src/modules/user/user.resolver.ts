import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetUserInfo, PaginatedUser, UpdateUser } from './dto/index.output';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserWhereInput } from './dto/user-where.input';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver()
export class UserResolver {
  constructor(
    private readonly service: UserService,
    // private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  @Query(() => GetUserInfo)
  async getUserInfo(@Context() context: any): Promise<GetUserInfo> {
    // await this.dataSource
    //   .getRepository(Order)
    //   .update({ id: 84 }, { createdAt: dayjs().add(2, 'minutes').toDate() });
    // return context.req.user;
    const d: any = await this.service.findOne({ id: context.req.user.id });
    return d;
  }
  @Query(() => PaginatedUser)
  async users(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: UserWhereInput,
    @Context() context: any,
  ): Promise<PaginatedUser> {
    const response = await this.service.find({
      context,
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
    return response;
  }

  @Query(() => [User])
  async usersList(
    @Args('where', { defaultValue: {} }) where: UserWhereInput,
    @Context() context: any,
  ) {
    return this.service.findAll(where, { id: 'DESC' }, context);
  }

  @Mutation(() => UpdateUser)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<UpdateUser> {
    return this.service.update(input);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.service.create(input);
  }

  @Mutation(() => String)
  async updatePassword(
    @Args('userId') userId: number,
    @Args('currentPassword') currentPassword: string,
    @Args('newPassword') newPassword: string,
  ): Promise<string> {
    return this.service.updatePassword({
      userId,
      currentPassword,
      newPassword,
    });
  }
}

import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetUserInfo, PaginatedUser } from './dto/index.output';
import { Order } from '../order/entities/order.entity';
import * as dayjs from 'dayjs';
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
    await this.dataSource
      .getRepository(Order)
      .update({ id: 84 }, { createdAt: dayjs().add(2, 'minutes').toDate() });
    return context.req.user;
  }
  @Query(() => PaginatedUser)
  async users(
    @Args('page', { defaultValue: 1 }) page: number,
    @Args('perPage', { defaultValue: 12 }) perPage: number,
    @Args('where', { defaultValue: {} }) where: UserWhereInput,
  ): Promise<PaginatedUser> {
    const response = await this.service.find({
      page,
      perPage,
      where,
      order: { id: 'DESC' },
    });
    return response;
  }

  @Query(() => [User])
  async usersList(@Args('where', { defaultValue: {} }) where: UserWhereInput) {
    return this.service.findAll(where, { id: 'DESC' });
  }

  @Mutation(() => User)
  async updateUser(@Args('input') input: UpdateUserInput): Promise<User> {
    return this.service.update(input);
  }

  @Mutation(() => User)
  async createUser(@Args('input') input: CreateUserInput): Promise<User> {
    return this.service.create(input);
  }

  // @Query(() => User, { nullable: true })
  // async user(@Args('where') where: UserInput) {
  //   return this.service.findOne(where);
  // }

  // @Mutation(() => LoginOutput, {
  //   description:
  //     'create or update depending if send id or not, if is create you need to send all entity fields without a id, if is update just is obligatory send the _id field',
  // })
  // async saveUser(@Args('user') user: UserInput): Promise<LoginOutput> {
  //   return this.service.save(user);
  // }
}

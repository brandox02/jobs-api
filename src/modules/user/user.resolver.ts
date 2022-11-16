import { Context, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetUserInfo } from './dto/index.output';
import { Order } from '../order/entities/order.entity';
import * as dayjs from 'dayjs';

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
  // @Query(() => [User])
  // async users(@Args('user', { nullable: true }) user: UserInput) {
  //   return this.service.findAll(user);
  // }

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

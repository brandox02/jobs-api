import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { Args } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserInput } from './dto/index.input';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { LoginOutput } from '../auth/dto/index.output';

@Resolver()
export class UserResolver {
  constructor(
    private readonly service: UserService,
    // private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}
  @Query(() => [User])
  async users(@Args('user', { nullable: true }) user: UserInput) {
    return this.service.findAll(user);
  }

  @Query(() => User, { nullable: true })
  async user(@Args('where') where: UserInput) {
    return this.service.findOne(where);
  }

  @Mutation(() => LoginOutput, {
    description:
      'create or update depending if send id or not, if is create you need to send all entity fields without a id, if is update just is obligatory send the _id field',
  })
  async saveUser(@Args('user') user: UserInput): Promise<LoginOutput> {
    return this.service.save(user);
  }
}

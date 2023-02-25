import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { GetUserInfo, PaginatedUser, UpdateUser } from './dto/index.output';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UserWhereInput } from './dto/user-where.input';
import { UpdateUserInput } from './dto/update-user.input';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { Resume } from './dto/resume.output';

@Resolver()
export class UserResolver {
  constructor(
    private readonly service: UserService,
    // private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
    private readonly cloudinary: CloudinaryService,
  ) {}

  @Query(() => GetUserInfo)
  async getUserInfo(@Context() context: any): Promise<GetUserInfo> {
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
    const itemCopy: any = { ...input };
    if (itemCopy?.resume) {
      if (itemCopy.resume?.image) {
        const { public_id, url } = await this.cloudinary.uploadImage(
          itemCopy?.resume.image,
          itemCopy?.resume?.imageId,
        );
        itemCopy.resume.imageUrl = url;
        itemCopy.resume.imageId = public_id;
        delete itemCopy?.resume?.image;
      } else {
        const user = await this.service.findOne({ id: input.id });
        itemCopy.resume.imageUrl = user.resume.imageUrl;
        itemCopy.resume.imageId = user.resume.imageId;
      }
    }

    if (itemCopy.image) {
      const { public_id, url } = await this.cloudinary.uploadImage(
        itemCopy?.image,
        itemCopy?.imageId,
      );
      itemCopy.imageUrl = url;
      itemCopy.imageId = public_id;
      console.log('response cloudinary: ', { public_id, url });
      delete itemCopy?.image;
    } else {
      const user = await this.service.findOne({ id: input.id });
      itemCopy.imageUrl = user.imageUrl;
      itemCopy.imageId = user.imageId;
    }
    return this.service.update(itemCopy);
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

  @Query(() => Resume, { nullable: true })
  async getResume(@Args('userId') userId: number) {
    const user = await this.service.findOne({ id: userId });
    if (!user) {
      throw NotFoundException('user');
    }
    return user.resume;
  }
}

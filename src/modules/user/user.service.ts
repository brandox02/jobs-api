import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqueConstraint } from 'src/common/uniqueContraint';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Between, FindOptionsOrder, ILike, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
import * as bcrypt from 'bcrypt';
import { User } from './entities/user.entity';
import * as dayjs from 'dayjs';
import { UserWhereInput } from './dto/user-where.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { Paginate } from '../order/order.service';
import { omit } from 'lodash';
import { CloudinaryService } from '../cloudinary/cloudinary.service';
import { UpdateUser } from './dto/index.output';

@Injectable()
export class UserService {
  private relations: string[] = ['company', 'department', 'role'];
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    //private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
    private readonly cloudinary: CloudinaryService,
  ) {}

  async findAll(
    where: UserWhereInput,
    order: FindOptionsOrder<User> = { createdAt: 'ASC' },
    context: any,
  ): Promise<User[]> {
    const filteredWhere = this.utils.removeNullFields(where);

    if (context.req.user.role.id !== 3) {
      filteredWhere.companyId = filteredWhere.req.user.company.id;
    }

    const users = await this.repo.find({
      where: filteredWhere,
      order,
    });
    return users;
  }

  async find({
    page,
    perPage,
    where,
    order,
    context,
  }: FindAllInput<UserWhereInput>): Promise<Paginate<User>> {
    let copyWhere: any = { ...where };
    const serverMinutesDiff = new Date().getTimezoneOffset();

    if (
      copyWhere?.fromDate &&
      copyWhere?.toDate &&
      copyWhere?.filterByEnableDate !== null
    ) {
      copyWhere.fromDate = dayjs(copyWhere.fromDate)
        .subtract(serverMinutesDiff, 'minutes')
        .toDate();

      copyWhere.toDate = dayjs(copyWhere.toDate)
        .add(serverMinutesDiff, 'minutes')
        .add(1, 'day')
        .toDate();

      copyWhere[copyWhere?.filterByEnableDate ? 'enableDate' : 'createdAt'] =
        Between(copyWhere.fromDate, copyWhere.toDate);

      copyWhere = omit(copyWhere, ['fromDate', 'toDate', 'filterByEnableDate']);
    }

    if (copyWhere.name) {
      copyWhere.firstname = ILike(`%${copyWhere.name}%`);
      delete copyWhere.name;
    }

    if (context.req.user.role.id !== 3) {
      copyWhere.companyId = context.req.user.company.id;
    }

    const totalItems = await this.repo.count({
      where: this.utils.removeNullFields(copyWhere),
    });

    return {
      items: await this.repo.find({
        where: this.utils.removeNullFields(copyWhere),
        skip: perPage * page,
        take: perPage,
        relations: this.relations,
        order,
      }),
      metadata: {
        perPage,
        totalItems,
        totalPages: Math.ceil(totalItems / perPage),
      },
    };
  }

  async findOne(where: UserWhereInput): Promise<User | null> {
    const filteredWhere = this.utils.removeNullFields(where);
    if (Object.keys(filteredWhere).length > 0) {
      const user = await this.repo.findOne({
        where: filteredWhere,
        order: {
          createdAt: 'ASC',
        },
        relations: this.relations,
      });

      if (!user) {
        throw NotFoundException();
      }
      return user;
    }
    return null;
  }

  async create(user: CreateUserInput): Promise<User> {
    await uniqueConstraint(this.repo, user, ['cedula', 'email']);

    const userSaved = await this.repo.save(this.repo.create(user));
    // if (!userSaved) throw new Error('User could not saved correctly');
    return this.repo.findOne({ where: { id: userSaved.id } });
    // return this.authService.getToken(userSaved);
  }

  async update(user: UpdateUserInput): Promise<UpdateUser> {
    const userInput = { ...user };
    if (user?.image) {
      const userFound = await this.findOne({ id: user.id });
      const { url } = await this.cloudinary.uploadImage(
        user.image,
        userFound.imageId,
      );
      userInput.imageUrl = url;
    }

    if (userInput?.enabled) {
      userInput.enableDate = dayjs().toDate();
    }

    const userSaved = await this.repo.save(this.repo.create(userInput));
    const userFinded = await this.findOne({ id: userSaved.id });
    const { accessToken } = await this.authService.getToken(userFinded);

    return { accessToken, user: userFinded };
  }

  async updatePassword({
    userId,
    currentPassword,
    newPassword,
  }: {
    userId: number;
    currentPassword: string;
    newPassword: string;
  }): Promise<string> {
    const user = await this.findOne({ id: userId });
    const isEqual = await bcrypt.compare(currentPassword, user.password);

    if (!isEqual) {
      return 'UMMATCH_PASS_CURR';
    }
    if (currentPassword === newPassword) {
      return 'MATCH_NEW_PASS_AND_OLD';
    }

    const salt = await bcrypt.genSalt();

    await this.repo.save(
      this.repo.create({
        id: userId,
        password: await bcrypt.hash(newPassword, salt),
      }),
    );
    return '';
  }
}

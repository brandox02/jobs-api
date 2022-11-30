import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { uniqueConstraint } from 'src/common/uniqueContraint';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Between, FindOptionsOrder, ILike, Repository } from 'typeorm';
import { AuthService } from '../auth/auth.service';
// import { FileUploadService } from "../file-upload/file-upload.provider";
import { User } from './entities/user.entity';
import * as dayjs from 'dayjs';
import { UserWhereInput } from './dto/user-where.input';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { Paginate } from '../order/order.service';
import { omit } from 'lodash';

@Injectable()
export class UserService {
  private relations: string[] = ['company', 'department'];
  constructor(
    @InjectRepository(User) private readonly repo: Repository<User>,
    //private readonly fileUploadService: FileUploadService,
    private readonly utils: UtilsProvider,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async findAll(
    where: UserWhereInput,
    order: FindOptionsOrder<User> = { createdAt: 'ASC' },
  ): Promise<User[]> {
    const filteredWhere = this.utils.removeNullFields(where);

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
      // copyWhere.lastname = ILike(`%${copyWhere.name}%`);
      delete copyWhere.name;
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
        relations: {
          department: true,
          company: true,
        },
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

  async update(user: UpdateUserInput): Promise<User> {
    const userInput = { ...user };
    if (userInput?.enabled) {
      userInput.enableDate = dayjs().toDate();
    }

    const userSaved = await this.repo.save(this.repo.create(userInput));

    return this.repo.findOne({ where: { id: userSaved.id } });
  }
}

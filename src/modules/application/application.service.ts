import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { Paginate } from 'src/common/paginate-types';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateApplicationInput } from './dto/create-application.input';
import { ApplicationWhereInput } from './dto/application-where.input';
import { UpdateApplicationInput } from './dto/update-application.input';
import { Application } from './entities/application.entity';

// export interface Paginate<T> {
//   items: T[];
//   metadata: {
//     totalItems: number;
//     perPage: number;
//     totalPages: number;
//   };
// }

@Injectable()
export class ApplicationService {
  private readonly relations = [];
  constructor(
    @InjectRepository(Application)
    private readonly repo: Repository<Application>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(
    applicationInput: CreateApplicationInput,
    context: any,
  ): Promise<Application> {
    const user: User = context.req.user;
    const copyApplicationInput = {
      ...applicationInput,
      createdUserId: user.id,
    };

    const application = await this.repo.save(
      this.repo.create(copyApplicationInput),
    );
    return this.findOne({ id: application.id });
  }

  async find({
    context,
    page,
    perPage,
    where,
    order,
  }: FindAllInput<ApplicationWhereInput>): Promise<Paginate<Application>> {
    const copyWhere: any = { ...where };

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

  async findOne(where: FindOptionsWhere<Application>): Promise<Application> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Application');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Application');
    }
    return item;
  }

  async update(input: UpdateApplicationInput): Promise<Application> {
    await this.repo.save(this.repo.create(input));
    return this.findOne({ id: input.id });
  }
}

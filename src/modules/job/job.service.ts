import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import * as dayjs from 'dayjs';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { UtilsProvider } from 'src/common/UtilsProvider';
import {
  Between,
  DataSource,
  EntityManager,
  FindOptionsWhere,
  ILike,
  In,
  Repository,
} from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';

export interface Paginate<T> {
  items: T[];
  metadata: {
    totalItems: number;
    perPage: number;
    totalPages: number;
  };
}

@Injectable()
export class JobService {
  private readonly relations = [];
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(orderInput: CreateJobInput): Promise<Job> {
    const order = await this.repo.save(this.repo.create(orderInput));
    return order;
  }

  async find({
    context,
    page,
    perPage,
    where,
    order,
  }: FindAllInput<JobWhereInput>): Promise<Paginate<Job>> {
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

  async findOne(where: FindOptionsWhere<Job>): Promise<Job> {
    const withoutNull = this.utils.removeNullFields(where);
    if (!where || Object.keys(withoutNull).length == 0) {
      throw NotFoundException('Job');
    }

    const item = await this.repo.findOne({
      where: withoutNull,
      relations: this.relations,
    });

    if (!item) {
      throw NotFoundException('Job');
    }
    return item;
  }

  async update(input: UpdateJobInput): Promise<Job> {
    await this.repo.save(this.repo.create(input));
    return this.findOne({ id: input.id });
  }
}

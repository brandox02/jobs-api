import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { Paginate } from 'src/common/paginate-types';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Tag } from 'src/entities/Tag.entity';
import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../user/entities/user.entity';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { UpdateJobInput } from './dto/update-job.input';
import { Job } from './entities/job.entity';

// export interface Paginate<T> {
//   items: T[];
//   metadata: {
//     totalItems: number;
//     perPage: number;
//     totalPages: number;
//   };
// }

@Injectable()
export class JobService {
  private readonly relations = [
    'dailyWorkTime',
    'workingModality',
    'employmentContract',
    'experienceTime',
    'category',
    'country',
    'city',
    'city.country',
    'status',
    'tags',
    'createdUser',
    'applications',
    'applications.status',
    'applications.status',
  ];
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(jobInput: CreateJobInput, context: any): Promise<Job> {
    const user: User = context.req.user;
    const copyJobInput = { ...jobInput, createdUserId: user.id };

    const job = await this.repo.save(this.repo.create(copyJobInput));
    return this.findOne({ id: job.id });
  }

  async find({
    context,
    page,
    perPage,
    where,
    order,
  }: FindAllInput<JobWhereInput>): Promise<Paginate<Job>> {
    const copyWhere: any = { ...where };

    copyWhere.enabled = true;

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

    withoutNull.enabled = true;

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
    const response = await this.dataSource.transaction(async (manager) => {
      const repo = manager.getRepository(Job);
      const copyInput = { ...input };

      await repo.save(this.repo.create(copyInput));
      if (input.tags) {
        const tagRepo = manager.getRepository(Tag);
        const tags = [...copyInput.tags];
        delete copyInput.tags;
        await tagRepo.delete({ jobId: copyInput.id });
        await tagRepo.save(tagRepo.create(tags));
      }
      return this.findOne({ id: input.id });
    });

    return response;
  }
}

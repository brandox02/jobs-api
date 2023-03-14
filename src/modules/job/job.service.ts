import { Injectable } from '@nestjs/common';
import { InjectDataSource, InjectRepository } from '@nestjs/typeorm';
import { FindAllInput } from 'src/common/FindAllInput.input';
import { NotFoundException } from 'src/common/GqlExeptions/NotFoundExeption';
import { Paginate } from 'src/common/paginate-types';
import { UtilsProvider } from 'src/common/UtilsProvider';
import { Tag } from 'src/entities/Tag.entity';
import {
  DataSource,
  FindOptionsWhere,
  ILike,
  LessThan,
  LessThanOrEqual,
  MoreThan,
  MoreThanOrEqual,
  Repository,
} from 'typeorm';
import { Application } from '../application/entities/application.entity';
import { User } from '../user/entities/user.entity';
import { CreateJobInput } from './dto/create-job.input';
import { JobWhereInput } from './dto/job-where.input';
import { ApplyJobInput, UpdateJobInput } from './dto/update-job.input';
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
    'applications.user',
    'createdUser.companyProfile',
  ];
  constructor(
    @InjectRepository(Job) private readonly repo: Repository<Job>,
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    @InjectRepository(Application)
    private readonly applicationRepo: Repository<Application>,
    private readonly utils: UtilsProvider,
    @InjectDataSource() private readonly dataSource: DataSource,
  ) {}

  async create(jobInput: CreateJobInput, context: any): Promise<Job> {
    const response = await this.dataSource.transaction(async (manager) => {
      const jobRepo = manager.getRepository(Job);
      const user: User = context.req.user;
      const copyJobInput = { ...jobInput, createdUserId: user.id };
      const tags = [...copyJobInput.tags];
      delete copyJobInput.tags;
      const job = await jobRepo.save(this.repo.create(copyJobInput));

      if (jobInput.tags) {
        const tagRepo = manager.getRepository(Tag);
        await tagRepo.save(
          tagRepo.create(
            tags.map(({ name }) => ({
              name,
              jobId: job.id,
            })),
          ),
        );
      }

      return jobRepo.findOne({
        where: { id: job.id },
        relations: this.relations,
      });
    });

    return response;
  }

  async find({
    context,
    page,
    perPage,
    where,
    order,
  }: FindAllInput<JobWhereInput>): Promise<Paginate<Job>> {
    const copyWhere: any = { ...where };

    if (where.minSalary) {
      copyWhere.minSalary = MoreThanOrEqual(where.minSalary);
    }
    if (where.maxSalary) {
      copyWhere.maxSalary = LessThanOrEqual(where.maxSalary);
    }
    if (where.name) {
      copyWhere.name = ILike(`%${copyWhere.name}%`);
    }

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
      if (input.tags) {
        const tagRepo = manager.getRepository(Tag);
        const tags = [...copyInput.tags];
        delete copyInput.tags;
        await tagRepo.delete({ jobId: copyInput.id });
        await tagRepo.save(tagRepo.create(tags));
        delete copyInput.tags;
      }
      await repo.save(this.repo.create(copyInput));
      return this.findOne({ id: input.id });
    });

    return response;
  }

  async applyJob(input: ApplyJobInput) {
    await this.applicationRepo.save(
      this.applicationRepo.create({ ...input, statusId: 1 }),
    );

    return true;
  }
}
